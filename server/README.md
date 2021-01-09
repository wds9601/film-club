# FilmClub Server

### Requirements

- [sbt](https://www.scala-sbt.org/)
```sh
brew install sbt
```
- [docker](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)

The server makes calls to the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction).
This means an API key is required. We'll handle sensitive values with a
gitignored-file. In the `server` directory of the repo, create a file called
`.vars.env` (make sure it's _exactly_ this name, otherwise it might get picked
up by git!). In that file, create an entry named `TMDB_API_KEY` like this:
```sh
TMDB_API_KEY=<API-KEY>
```
Be sure to replace the `<API-KEY>` value with the actual key. You should only
have to modify this file once for each entry, then `source` it for each terminal
session as described below.


### Running

#### Server

Navigate to the `server` directory.

To use the database, start the local Postgres image using Docker:
```sh
docker-compose up &
```

Source the env file to make sure the environment variables are available to the
server:
```sh
source .vars.env
```

Use `sbt` to run the server:
```sh
sbt run
```

This may take a while to start up. You should eventually see a message that says
```
http4s v0.21.13 on blaze v0.14.14 started at http://[::]:8080/
```
You should now be able to make requests to various `localhost:8080` endpoints:

##### `echo`

There's an `echo` path to try out various requests for testing.

- **GET** `localhost:8080/v1/echo/hello/{name}` will respond with
```
Hello, {name}!
```

- **GET** `localhost:8080/v1/echo/int/{n}` will respond with a JSON payload
like this:
```json
{
  "selected": 5
}
```
This endpoint can be used to check the connection to the database.

- **POST** `localhost:8080/v1/echo/person` with a JSON payload with
  - `name`: `String`
  - `age`: `Number` -- needs to be greater than 0
```json
{
  "name": "Jon Snow",
  "age": 35
}
```
will echo the same payload back if it is acceptable. If the payload failed, it
will respond with an error.

##### `films`

The beginning functionality for the server is started at the `films` path.

- **GET** `localhost:8080/v1/films/upcoming` will provide a paginated list of
films that will be released soon, in ascending order by their release-date. The
top level response will be JSON with the following properties:
- `films`: Array of `Film`s
- `page`: Number of current page
- `totalPages`: Number of total pages for available for this query
- `totalResults`: Total number of films available for this query

A `Film` payload looks like the following:
```json
{
  "backdropPath": "/srYya1ZlI97Au4jUYAktDe3avyA.jpg",
  "genres": [
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    }
  ],
  "id": 464052,
  "originalLanguage": "en",
  "originalTitle": "Wonder Woman 1984",
  "overview": "Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.",
  "popularity": 974.114,
  "posterPath": "/di1bCAfGoJ0BzNEavLsPyxQ2AaB.jpg",
  "releaseDate": "2020-12-25",
  "title": "Wonder Woman 1984",
  "voteAverage": 7.1,
  "voteCount": 111
}
```

- **GET** `localhost:8080/v1/films/images/{imagePath}`, where `imagePath` is
either a `poster` or `backdrop`, will return the raw image data (`jpg`).

### Shutdown

To shutdown the service, use `ctrl+c` to exit out of the running server. Then
use
```sh
docker-compose down
```
to terminate the database.
