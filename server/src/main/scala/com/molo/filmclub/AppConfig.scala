package com.molo.filmclub

import cats.effect.{Blocker, ContextShift, Resource, Sync}
import com.molo.filmclub.client.TmdbConfig
import pureconfig._
import pureconfig.generic.auto._
import pureconfig.module.catseffect.syntax._
import pureconfig.module.http4s._

final case class DbConfig(
  connectionThreads: Int,
  driver: String,
  url: String,
  user: String,
  pass: String
)

final case class HttpConfig(
  port: Int,
  host: String
)

final case class AppConfig(
  http: HttpConfig,
  db: DbConfig,
  tmdb: TmdbConfig
)

object AppConfig {

  private val namespace = "app"

  def resource[F[_]: Sync: ContextShift](blocker: Blocker): Resource[F, AppConfig] =
    Resource.liftF(ConfigSource.default.at(namespace).loadF[F, AppConfig](blocker))

}
