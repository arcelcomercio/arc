import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

@Consumer
class MoviesFilter extends Component {
  classes = {
    moviesFilter: 'movies-filter flex flex--justify-between',
    label: 'movies-filter__label text-uppercase',
    form: 'movies-filter__form flex ',
    options: 'movies-filter__options flex',
    button: 'movies-filter__button text-uppercase',
  }

  constructor(...props) {
    super(...props)
    this.cinema = {}
    this.cines = []
    this.peliculas = []
    this.pelicula = ''
    this.genero = ''
    this.cine = ''
  }

  componentDidMount() {
    this.fetch()
  }

  cinesPorPelicula = pelicula => {
    const { cinema } = this.state
    if(pelicula === 'default') {
      this.setState({cines: cinema.cines})
      return cinema.cines
    }
    const nuevosCines = cinema.cartelera
      .filter(item => item.mid === pelicula)
      .map(cine => cinema.cines
        .find(el => el.cid === cine.cid))
      this.setState({cines: nuevosCines})
    return nuevosCines
  }

  peliculasPorGenero = genero => {
    const { cinema } = this.state
    const peliculas = Object.values(cinema.peliculas)
    if(genero === 'todas' || genero === 'default'){
      this.setState({ peliculas})
      return peliculas
    } 
    const nuevasPeliculas = peliculas.filter(
      pelicula => pelicula.genero.genero === genero
    )
    this.setState({peliculas: nuevasPeliculas})
    return nuevasPeliculas
  }

  peliculasPorCine = cine => {
    const { cinema } = this.state
    const listaPeliculas = Object.values(cinema.peliculas)
    if(cine === 'default'){
      this.setState({peliculas: listaPeliculas})
      return listaPeliculas
    }
    const nuevasPeliculas = cinema.cartelera
      .filter(item => item.cid === cine)
      .map(pelicula => listaPeliculas
        .find(el => el.mid === pelicula.mid))
    this.setState({peliculas: nuevasPeliculas})

    return nuevasPeliculas
  }

  listaGeneros = peliculas => {
    const pelis = Object.values(peliculas)
    const nuevaLista = pelis.map(pelicula =>
      pelicula.genero ? pelicula.genero.genero : 'Otras'
    )
    return [...new Set(nuevaLista)]
  }

  // listaCines = cines => {
  //   return cines.map(cine => {
  //     return {
  //       id: cine.cid,
  //       nombre: cine.nombre,
  //     }
  //   })
  // }

  listaPeliculas = peliculas => {
    const pelis = Object.values(peliculas)
    return pelis.map(pelicula => {
      return {
        id: pelicula.mid,
        title: pelicula.title,
      }
    })
  }

  changeSelect(e) {
    const from = e.target.id
    const { value } = e.target
    if (from === 'pelicula') {
      this.cinesPorPelicula(value)
    }
    if (from === 'genero') {
      this.peliculasPorGenero(value)
    }
    if (from === 'cine') {
      this.peliculasPorCine(value)
    }
  }

  fetch() {
    const { fetched } = this.getContent('cinema-billboard', { website: '' })
    fetched.then(response => {
      const peliculas = this.listaPeliculas(response.peliculas)
      const { cines } = response
      this.setState({
        cinema: response,
        peliculas,
        cines,
      })
    })
  }

  render() {
    const stateReady = this.state && this.state.cinema
    const litadoPeliculas = this.state && this.state.peliculas
    const listadoCines = this.state && this.state.cines
    const listadoGenero =
      stateReady && this.listaGeneros(this.state.cinema.peliculas)
    return (
      <div className={this.classes.moviesFilter}>
        <h4 className={this.classes.label}>Vamos al cine</h4>
        <form
          action="/cartelera/search"
          method="post"
          className={this.classes.form}>
          <div className={this.classes.options}>
            <select
              name="movie"
              id="pelicula"
              onChange={e => this.changeSelect(e)}>
              <option value="default" selected="" disabled="">
                PELÍCULAS
              </option>
              {litadoPeliculas &&
                litadoPeliculas.map(pelicula => (
                  <option key={pelicula.id} value={pelicula.id}>
                    {pelicula.title}
                  </option>
                ))}
            </select>

            <select
              name="genre"
              id="genero"
              onChange={e => this.changeSelect(e)}>
              <option value="default" selected="" disabled="">
                GÉNERO
              </option>
              <option value="todas">Todas</option>
              {listadoGenero &&
                listadoGenero.map((pelicula, id) => (
                  <option key={id} value={pelicula}>
                    {pelicula}
                  </option>
                ))}
            </select>

            <select
              name="theater"
              id="cine"
              onChange={e => this.changeSelect(e)}>
              <option value="default" selected="" disabled="">
                CINES
              </option>
              {listadoCines &&
                listadoCines.map(pelicula => (
                  <option key={pelicula.cid} value={pelicula.cid}>
                    {pelicula.nombre}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit" className={this.classes.button}>
            Buscar
          </button>
        </form>
      </div>
    )
  }
}

MoviesFilter.label = 'Filtro de Películas'

export default MoviesFilter
