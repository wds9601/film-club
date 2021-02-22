# FilmClub

![film club home page](https://i.imgur.com/P9q8Iy1.png)

## What is FilmClub?
FilmClub is a cinematic discovery app.  Using [TheMovieDB API](https://developers.themoviedb.org/3/getting-started/introduction) FilmClub offers all the newest movie trailers in a simple browsing format, so you quickly get to the important stuff - the cinema! 
- Browse films by release date
- Easy-to-use and visually appealing
- See film posters, trailers, release info, and more!

### Coming Features:
- Search films by keyword
- Browse by genre, director, actors, etc.
- Save interesting movies to your "Tracked Movies" list for an alert when the release date is coming up
- Share your fav movies with other users
- Theater Showing Info (if we can find a good API)


## This FrontEnd Built With
- [Create React App](https://github.com/facebook/create-react-app)
- [Grommet.io](https://v2.grommet.io/)


## Why make this?
As a front end developer, I enjoy making projects with new technologies to continue learning about software development.  This project allowed me to join forces with [gstro](https://github.com/gstro) who took on building out the backend.  Also, we like movies.

These were the new tools I used developing FilmClub:
- [Grommet](https://v2.grommet.io/) - a popular UI library  
- [SwaggerHub/OpenAPI](https://swagger.io/resources/open-api/) collaboration tool


## Getting Started

1. Clone and follow directions to start the corresponding **FilmClub** [backend server](https://github.com/gstro/film-club-server)   
*(currently private, refer to our [OpenAPI specs](https://github.com/wds9601/film-club/blob/main/specs/filmclub.yaml) for API schema)*
3. Clone this repo to local machine
2. Navigate to `film-club-client` folder
4. In project folder:
- run `npm install` to install dependencies from `package.json`
- run `npm start` to begin development server on `localhost:3000`


## This repo contains

Two folders:
  - `/web`: holds all the client side files
  - `/specs`: holds the OpenAPI 3.0 YAML file for the FilmClub API specification.  Serves as a working "contract" between frontend and backend developers and is continuoulsy referenced, and updated through pull requests.
