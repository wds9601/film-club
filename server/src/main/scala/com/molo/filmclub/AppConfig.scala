package com.molo.filmclub

import cats.effect.{Blocker, ContextShift, Resource, Sync}
import pureconfig._
import pureconfig.generic.auto._
import pureconfig.module.catseffect.syntax._

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
    db: DbConfig
)

object AppConfig {

  private val namespace = "app"

  def resource[F[_]: Sync: ContextShift](blocker: Blocker): Resource[F, AppConfig] =
    Resource.liftF(ConfigSource.default.at(namespace).loadF[F, AppConfig](blocker))

}
