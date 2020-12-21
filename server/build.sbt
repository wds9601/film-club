name := "film-club-server"

version := "0.1"

scalaVersion := "2.13.4"

lazy val CatsEffectVersion = "2.3.0"
lazy val Fs2Version        = "2.4.6"
lazy val Http4sVersion     = "0.21.13"
lazy val CirceVersion      = "0.13.0"
lazy val DoobieVersion     = "0.9.4"
lazy val FlywayVersion     = "7.3.0"
lazy val RefinedVersion    = "0.9.18"
lazy val PureConfigVersion = "0.14.0"
lazy val LogbackVersion    = "1.2.3"
lazy val ScalaTestVersion  = "3.2.3"
lazy val ScalaCheckVersion = "1.15.1"

libraryDependencies ++= Seq(
  // http
  "org.http4s"            %% "http4s-blaze-server"    % Http4sVersion,
  "org.http4s"            %% "http4s-blaze-client"    % Http4sVersion,
  "org.http4s"            %% "http4s-circe"           % Http4sVersion,
  "org.http4s"            %% "http4s-dsl"             % Http4sVersion,

  // effects and streaming
  "org.typelevel"         %% "cats-effect"            % CatsEffectVersion,
  "co.fs2"                %% "fs2-core"               % Fs2Version,

  // json
  "org.http4s"            %% "http4s-circe"           % Http4sVersion,
  "io.circe"              %% "circe-core"             % CirceVersion,
  "io.circe"              %% "circe-generic"          % CirceVersion,
  "io.circe"              %% "circe-generic-extras"   % CirceVersion,
  "io.circe"              %% "circe-refined"          % CirceVersion,

  // database
  "org.flywaydb"          %  "flyway-core"            % FlywayVersion,
  "org.tpolecat"          %% "doobie-core"            % DoobieVersion,
  "org.tpolecat"          %% "doobie-postgres"        % DoobieVersion,
  "org.tpolecat"          %% "doobie-hikari"          % DoobieVersion,

  // config
  "com.github.pureconfig" %% "pureconfig"             % PureConfigVersion,
  "com.github.pureconfig" %% "pureconfig-cats-effect" % PureConfigVersion,
  "com.github.pureconfig" %% "pureconfig-http4s"      % PureConfigVersion,
  "eu.timepit"            %% "refined-pureconfig"     % RefinedVersion,

  // logging
  "ch.qos.logback"        %  "logback-classic"        % LogbackVersion,

  // tests
  "org.scalatest"         %% "scalatest"              % ScalaTestVersion  % Test,
  "org.scalacheck"        %% "scalacheck"             % ScalaCheckVersion % Test,
  "org.tpolecat"          %% "doobie-scalatest"       % DoobieVersion     % Test
)

// these don't seem to play well with tagless-final style
wartremoverErrors in (Compile, compile) ++= Warts.allBut(
  Wart.Any,
  Wart.Nothing,
  Wart.GlobalExecutionContext, // this is fine
)

resolvers += Resolver.sonatypeRepo("releases")
addCompilerPlugin("org.typelevel" %% "kind-projector"     % "0.11.2" cross CrossVersion.full)
addCompilerPlugin("com.olegpy"    %% "better-monadic-for" % "0.3.1")
addCompilerPlugin(scalafixSemanticdb)
scalacOptions += "-Yrangepos"
scalacOptions += "-Ymacro-annotations"

Compile / run / fork := true

// Use development.conf only for local dev,
// application.conf will be packaged for deployment
Test / run / javaOptions += "-Dconfig.file=development.conf"

enablePlugins(DockerPlugin)