class FormatoCine {
  constructor(data = {}) {
    this.data = data
    this.peliculas = []
    this.cines = []
    this._init()
  }

  _init() {
    // eslint-disable-next-line no-prototype-builtins
    if (this.data.hasOwnProperty('cartelera')) {
      this.peliculas = this.data.peliculas
      this.cines = this.data.cines
      const {
        cartelera
      } = this.data
      cartelera.forEach(post => {
        const cinema = {
          cine: post.cid,
          horario: post.horario
        }
        const pelicula = post.mid
        this.pushMovieInCinema({
          ...cinema
        }, pelicula)
        this.pushCinemaInMovie({
          ...cinema
        }, pelicula)
      })
    }
  }

  set addData(data){
    this.data = data
    this._init()
  }

  pushCinemaInMovie(cinema, movie) {
    const listadoPeliculas = Object.values(this.peliculas)
    const listadoCines = this.cines
    listadoPeliculas.forEach(pelicula => {
      const itemPelicula = pelicula
      if (itemPelicula.mid === movie) {
        const nuevoCine = listadoCines.find(cine => {
          return cine.cid === cinema.cine
        })
        if (itemPelicula.cines) {
          itemPelicula.cines.push(nuevoCine)
        } else {
          itemPelicula.cines = []
          itemPelicula.cines.push(nuevoCine)
        }
      }
    })
    this.setPeliculasInCinema = listadoPeliculas
  }

  pushMovieInCinema(cinema, movie) {
    const listadoPeliculas = Object.values(this.peliculas)
    const listadoCines = this.cines
    listadoCines.forEach(cine => {
      const itemCine = cine
      if (itemCine.cid === cinema.cine) {
        const peli = listadoPeliculas.find(pelicula => {
          return pelicula.mid === movie
        })
        if (itemCine.peliculas) {
          itemCine.peliculas.push(peli)
        } else {
          itemCine.peliculas = []
          itemCine.peliculas.push(peli)
        }
      }
    })
    this.setCinesInMovies = listadoCines
  }

  set setCinesInMovies(cines) {
    this.cines = cines
  }

  set setPeliculasInCinema(peliculas) {
    this.peliculas = peliculas
  }

  get genderList() {
    const listadoPeliculas = Object.values(this.peliculas)
    const generos = listadoPeliculas.map(pelicula => {
      if (pelicula.genero) {
        return {
          genero: pelicula.genero.genero,
          url: pelicula.genero.url
        }
      }
      return {
        genero: 'Otras',
        url: ''
      }
    })
    return [...new Set(generos)]
  }

  get moviesList() {
    const listadoPeliculas = Object.values(this.peliculas)
    return listadoPeliculas
  }

  get cinemaList() {
    return this.cines
  }

  moviesByGender(gender) {
    const listadoPeliculas = Object.values(this.peliculas)
    if (gender) {
      const peliculasPorGenero = listadoPeliculas.filter(pelicula => {
        return pelicula.genero.genero === gender
      })
      return peliculasPorGenero
    }
    return listadoPeliculas
  }
}

export default FormatoCine