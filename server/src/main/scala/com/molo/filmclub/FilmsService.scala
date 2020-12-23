package com.molo.filmclub

import cats.effect.Sync
import cats.implicits._
import com.molo.filmclub.client.FilmDataClient
import org.http4s.circe._
import org.http4s.dsl.Http4sDsl
import org.http4s.server.Router
import org.http4s.{EntityEncoder, HttpRoutes}

final class FilmsService[F[_]: Sync](client: FilmDataClient[F]) extends Http4sDsl[F] {
  import com.molo.filmclub.client.FilmDataClient._

  private object PageQueryParam extends OptionalQueryParamDecoderMatcher[Int]("page")

  private implicit val discoveredFilmEntityEncoder: EntityEncoder[F, UpcomingFilmsResponse] = jsonEncoderOf[F, UpcomingFilmsResponse]

  private val http: HttpRoutes[F] = HttpRoutes.of[F] {
    case GET -> Root / "upcoming" :? PageQueryParam(page) =>
      client.getUpcomingFilms(page).flatMap(Ok(_))
  }

  val routes: HttpRoutes[F] = Router("films" -> http)

}