package com.molo.filmclub

import cats.implicits._
import cats.effect._
import com.molo.filmclub.client.TmdbClient
import doobie.util.transactor.Transactor
import org.http4s._
import org.http4s.client.Client
import org.http4s.client.blaze.BlazeClientBuilder
import org.http4s.implicits._
import org.http4s.server.Router
import org.http4s.server.blaze.BlazeServerBuilder

import scala.concurrent.ExecutionContext.global

object Server extends IOApp {

  private def buildServices(config: AppConfig, client: Client[IO], xa: Transactor[IO]): IO[HttpApp[IO]] =
    IO {
      val echoDao = new EchoDao[IO](xa)
      val echoSvs = new EchoService[IO](echoDao)
      val filmClient = new TmdbClient[IO](client, config.tmdb)
      val filmsSvs = new FilmsService[IO](filmClient)
      val services = echoSvs.routes <+> filmsSvs.routes
      val app = Router("/v1" -> services).orNotFound
      new ErrorHandler(app).wrapped
    }

  private def startServer(config: HttpConfig, app: HttpApp[IO]): IO[Unit] =
    BlazeServerBuilder[IO](global)
      .bindHttp(config.port, config.host)
      .withHttpApp(app)
      .serve
      .compile
      .drain

  private def resources: Resource[IO, (AppConfig, Client[IO], Transactor[IO])] =
    for {
      blocker    <- Blocker[IO]
      config     <- AppConfig.resource[IO](blocker)
      client     <- BlazeClientBuilder[IO](global).resource
      transactor <- Database.transactor[IO](config.db, blocker)
    } yield (config, client, transactor)

  override def run(args: List[String]): IO[ExitCode] =
    resources.use { case (cfg, client, xa) =>
      for {
        app <- buildServices(cfg, client, xa)
        _   <- startServer(cfg.http, app)
      } yield ExitCode.Success
    }

}
