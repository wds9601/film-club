package com.molo.filmclub.client

import com.molo.filmclub.client.FilmDataClient.UpcomingFilmsResponse
import io.circe.generic.JsonCodec

import fs2.Stream

trait FilmDataClient[F[_]] {

  def getUpcomingFilms(page: Option[Int]): F[UpcomingFilmsResponse]

  def getImage(path: String): Stream[F, Byte]

}

object FilmDataClient {

  type FilmId = Int
  type GenreId = Int

  @JsonCodec(encodeOnly = true)
  final case class UpcomingFilmsResponse(
    films: List[Film],
    page: Int,
    totalPages: Int,
    totalResults: Int
  )

  @JsonCodec(encodeOnly = true)
  final case class Film(
    backdropPath: Option[String],
    genres: List[Genre],
    id: FilmId,
    originalLanguage: String,
    originalTitle: String,
    overview: String,
    popularity: Double,
    posterPath: Option[String],
    releaseDate: String,
    title: String,
    voteAverage: Double,
    voteCount: Double
  )

  @JsonCodec(encodeOnly = true)
  final case class Genre(id: GenreId, name: String)

  object Genre {
    private val idToName: Map[GenreId, String] = Map(
      28 -> "Action",
      12 -> "Adventure",
      16 -> "Animation",
      35 -> "Comedy",
      80 -> "Crime",
      99 -> "Documentary",
      18 -> "Drama",
      10751 -> "Family",
      14 -> "Fantasy",
      36 -> "History",
      27 -> "Horror",
      10402 -> "Music",
      9648 -> "Mystery",
      10749 -> "Romance",
      878 -> "Science Fiction",
      10770 -> "TV Movie",
      53 -> "Thriller",
      10752 -> "War",
      37 -> "Western"
      )
    private val nameToId: Map[String, GenreId] = idToName.map(_.swap)

    def fromId(id: GenreId): Option[Genre] =
      idToName.get(id).map(Genre(id, _))

    def fromName(name: String): Option[Genre] =
      nameToId.get(name).map(Genre(_, name))
  }

}
