class FormatoCine {
  constructor(data = {}) {
    this.data = data
    this.peliculas = this.data.peliculas
    this.cines = this.data.cines
    this._init()
  }

  _init() {
    const { cartelera } = this.data
    cartelera.map(post => {
      const cinema = { cine: post.cid, horario: post.horario }
      const pelicula = post.mid
			this.pushMovieInCinema({ ...cinema }, pelicula)
			this.pushCinemaInMovie({ ...cinema }, pelicula)
    })
	}
	
	pushCinemaInMovie(cinema, movie) {
		const listadoPeliculas = Object.values(this.peliculas)
		const listadoCines = this.cines
		listadoPeliculas.find(pelicula => {
      if (pelicula.mid === movie) {
        const nuevoCine = listadoCines.find(cine => {
          return cine.cid === cinema.cine
        })
				if (pelicula.cines) {
					pelicula.cines.push(nuevoCine)
        } else {
					pelicula.cines = []
					pelicula.cines.push(nuevoCine)
        }
      }
    })
		this.setPeliculasInCinema = listadoPeliculas
	}

  pushMovieInCinema(cinema, movie) {
    const listadoPeliculas = Object.values(this.peliculas)
    const listadoCines = this.cines
    listadoCines.find(cine => {
      if (cine.cid === cinema.cine) {
        const peli = listadoPeliculas.find(pelicula => {
          return pelicula.mid === movie
        })
        if (cine.peliculas) {
          cine.peliculas.push(peli)
        } else {
          cine.peliculas = []
          cine.peliculas.push(peli)
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
      return pelicula.genero ? pelicula.genero.genero : 'Otras'
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