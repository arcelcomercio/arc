class BillboardFormat {
  constructor(data = {}) {
    this.data = data
    this.movies = []
    this.cinemas = []
    this._init()
  }

  _init() {
    if (Object.prototype.hasOwnProperty.call(this.data, "cartelera")) {
      this.movies = this.data.peliculas
      this.cinemas = this.data.cines
      const {
        cartelera
      } = this.data

      cartelera.forEach(item => {
        const cinema = {
          cine: item.cid,
          horario: item.horario,
        }
        const movie = item.mid
        this.pushMovieInCinema({
            ...cinema,
          },
          movie
        )
        this.pushCinemaInMovie({
            ...cinema,
          },
          movie
        )
      })
    }
  }

  set setData(data) {
    this.data = data
    this._init()
  }

  get getData() {
    return {
      cinemas: this.cinemaList,
      movies: this.moviesList,
      genres: this.genreList
    }
  }

  pushCinemaInMovie(cinemaObj, movieId) {
    const moviesList = Object.values(this.movies)
    const cinemasList = this.cinemas
    moviesList.forEach(movie => {
      const auxMovie = movie
      if (auxMovie.mid === movieId) {
        const matchedCinema = cinemasList.find(cinema => {
          return cinema.cid === cinemaObj.cine
        })
        Object.assign(matchedCinema, {
          horario: cinemaObj.horario
        })
        if (auxMovie.cines) {
          auxMovie.cines.push(matchedCinema)
        } else {
          auxMovie.cines = []
          auxMovie.cines.push(matchedCinema)
        }
      }
    })

    this.setMoviesByCinemas = moviesList
  }

  pushMovieInCinema(cinemaObj, movieId) {
    const moviesList = Object.values(this.movies)
    const cinemasList = this.cinemas
    cinemasList.forEach(cinema => {
      const auxCinema = cinema
      if (auxCinema.cid === cinemaObj.cine) {
        const matchedMovie = moviesList.find(movie => {
          return movie.mid === movieId
        })
        if (auxCinema.peliculas) {
          auxCinema.peliculas.push(matchedMovie)
        } else {
          auxCinema.peliculas = []
          auxCinema.peliculas.push(matchedMovie)
        }
      }
    })
    this.setCinemasByMovies = cinemasList
  }

  set setCinemasByMovies(cinemas) {
    this.cinemas = cinemas
  }

  set setMoviesByCinemas(movies) {
    this.movies = movies
  }

  get genreList() {
    const moviesList = Object.values(this.movies)
    const genres = moviesList
      .map(movie => {
        if (movie.genero) {
          return {
            name: movie.genero.genero,
            url: movie.genero.url,
          }
        }
        return {
          name: 'Otras',
          url: '',
        }
      })
      .filter((data, index, arr) => {
        return arr.map(mapObj => mapObj.name).indexOf(data.name) === index
      })
    return [...new Set(genres)]
  }

  get moviesList() {
    const moviesList = Object.values(this.movies)
    return moviesList
  }

  get cinemaList() {
    return this.cinemas
  }

  moviesByGenre(genre) {
    const moviesList = Object.values(this.movies)
    if (genre) {
      const moviesByGenre = moviesList.filter(pelicula => {
        return pelicula.genero.url === genre
      })
      return moviesByGenre
    }
    return moviesList
  }
}

export default BillboardFormat