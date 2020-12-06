package com.molo.filmclub

import cats.effect.Sync
import cats.implicits._
import doobie.implicits._
import doobie.util.transactor.Transactor
import eu.timepit.refined.api.Refined
import eu.timepit.refined.numeric.Positive
import io.circe.generic.auto._
import io.circe.refined._
import org.http4s.circe._
import org.http4s.dsl.Http4sDsl
import org.http4s.{EntityDecoder, EntityEncoder, HttpRoutes, Response}

class EchoService[F[_]: Sync](dao: EchoDao[F]) extends Http4sDsl[F] {
  import com.molo.filmclub.EchoService._

  private implicit val selectedIntEncoder: EntityEncoder[F, SelectedInt] = jsonEncoderOf[F, SelectedInt]
  private implicit val personEncoder: EntityEncoder[F, Person]           = jsonEncoderOf[F, Person]
  private implicit val personDecoder: EntityDecoder[F, Person]           = jsonOf[F, Person]

  val routes: HttpRoutes[F] = HttpRoutes.of[F] {
    case GET -> Root / "echo-int" / IntVar(n) =>
      dao.getInt(n).map(SelectedInt).flatMap(Ok(_))

    case req @ POST -> Root / "person" =>
      req.attemptAs[Person].foldF(_ => AppError.InvalidBody.raiseError[F, Response[F]], Ok(_)) // test error handler
  }

}

object EchoService {
  final case class SelectedInt(selected: Int)
  final case class Person(name: String, age: Int Refined Positive)
}

class EchoDao[F[_]: Sync](xa: Transactor[F]) {

  def getInt(n: Int): F[Int] =
    EchoQueries
      .select(n)
      .unique
      .transact(xa)

}

object EchoQueries {
  import doobie.util.query.Query0

  def select(n: Int): Query0[Int] =
    sql"SELECT $n".query[Int]
}
