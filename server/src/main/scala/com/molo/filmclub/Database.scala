package com.molo.filmclub

import cats.effect.{Async, Blocker, ContextShift, Resource}
import doobie._
import doobie.hikari._


object Database {

  def transactor[F[_]: Async: ContextShift](config: DbConfig, blocker: Blocker): Resource[F, Transactor[F]] =
    for {
      ce <- ExecutionContexts.fixedThreadPool(config.connectionThreads)
      xa <- HikariTransactor.newHikariTransactor(
        config.driver,
        config.url,
        config.user,
        config.pass,
        ce,
        blocker
      )
    } yield xa
}
