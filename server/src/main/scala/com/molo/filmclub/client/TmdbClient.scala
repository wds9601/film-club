package com.molo.filmclub.client

import cats.effect._
import cats.implicits._
import com.molo.filmclub.client.FilmDataClient.LatestFilmsResponse

import org.http4s.circe.jsonOf
import org.http4s.client.Client
import org.http4s.client.dsl.Http4sClientDsl
import org.http4s.{EntityDecoder, Request, Uri}

final case class TmdbConfig(baseUri: Uri, apiKey: String) {
  def defaultParams(): Map[String, String] =
    Map("api_key" -> apiKey, "language" -> "en-US")
}

final class TmdbClient[F[_] : Sync](client: Client[F], config: TmdbConfig) extends FilmDataClient[F] with Http4sClientDsl[F] {

  import TmdbClient._

  private implicit val discoverFilmsResponseEntityDecoder: EntityDecoder[F, DiscoverFilmsResponse] = jsonOf[F, DiscoverFilmsResponse]

  override def getLatestFilms(page: Option[Int]): F[LatestFilmsResponse] = {
    val uri = config.baseUri / "discover" / "movie"
    val params = config.defaultParams() + ("page" -> page.getOrElse(1).toString)
    val req = Request[F](uri = uri.withQueryParams(params))
    client.fetchAs[DiscoverFilmsResponse](req).map(_.toLatestFilmsResponse())
  }
}

object TmdbClient {

  import FilmDataClient._
  import io.circe.generic.extras._

  implicit val customJsonConfig: Configuration = Configuration.default.withSnakeCaseMemberNames

  @ConfiguredJsonCodec(decodeOnly = true)
  final case class DiscoveredFilm(
    backdropPath: Option[String],
    genreIds: List[Int],
    id: Int,
    originalLanguage: String,
    originalTitle: String,
    overview: String,
    popularity: Double,
    posterPath: Option[String],
    releaseDate: String,
    title: String,
    voteAverage: Double,
    voteCount: Double
  ) {
    def toFilm(): Film = Film(
      backdropPath = backdropPath,
      genres = genreIds.flatMap(Genre.fromId),
      id = id,
      originalLanguage = originalLanguage,
      originalTitle = originalTitle,
      overview = overview,
      popularity = popularity,
      posterPath = posterPath,
      releaseDate = releaseDate,
      title = title,
      voteAverage = voteAverage,
      voteCount = voteCount
      )
  }

  @ConfiguredJsonCodec(decodeOnly = true)
  final case class DiscoverFilmsResponse(
    page: Int,
    results: List[DiscoveredFilm],
    totalPages: Int,
    totalResults: Int
  ) {
    def toLatestFilmsResponse(): LatestFilmsResponse = LatestFilmsResponse(
      films = results.map(_.toFilm()),
      page = page,
      totalPages = totalPages,
      totalResults = totalResults
      )
  }

}