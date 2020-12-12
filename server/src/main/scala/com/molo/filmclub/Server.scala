package com.molo.filmclub

import cats.effect._
import doobie.util.transactor.Transactor
import org.http4s._
import org.http4s.implicits._
import org.http4s.server.blaze.BlazeServerBuilder

import scala.concurrent.ExecutionContext.global

object Server extends IOApp {

  private def buildServices(xa: Transactor[IO]): IO[HttpApp[IO]] =
    IO {
      val dao = new EchoDao[IO](xa)
      val app = new EchoService[IO](dao).routes.orNotFound
      new ErrorHandler(app).wrapped
    }

  private def startServer(config: HttpConfig, app: HttpApp[IO]): IO[Unit] =
    BlazeServerBuilder[IO](global)
      .bindHttp(config.port, config.host)
      .withHttpApp(app)
      .serve
      .compile
      .drain

  private def resources: Resource[IO, (AppConfig, Transactor[IO])] =
    for {
      blocker    <- Blocker[IO]
      config     <- AppConfig.resource[IO](blocker)
      transactor <- Database.transactor[IO](config.db, blocker)
    } yield (config, transactor)

  override def run(args: List[String]): IO[ExitCode] =
    resources.use { case (cfg, xa) =>
      for {
        app <- buildServices(xa)
        _   <- startServer(cfg.http, app)
      } yield ExitCode.Success
    }

}
