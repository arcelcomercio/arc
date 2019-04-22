import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import FormatoCine from './_children/FormatoCine'

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
    this.instancia = new FormatoCine()
  }

  componentDidMount() {
    this.fetch()
  }

  changeSelect = (e) => {
		return console.log(e, 'hola')
	}

  fetch() {
    const { fetched } = this.getContent('cinema-billboard', { website: '' })
    fetched.then(response => {
      this.instancia.addData = response 
      const cines = this.instancia.cinemaList
      const peli = this.instancia.moviesList
      const generos = this.instancia.genderList
      const porgen = this.instancia.moviesByGender('Accion')


      console.log(generos, 'genero')
		})
  }

  render() {
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
            </select>

            <select
              name="genre"
              id="genero"
              onChange={e => this.changeSelect(e)}>
              <option value="default" selected="" disabled="">
                GÉNERO
              </option>
              <option value="todas">Todas</option>
            </select>

            <select
              name="theater"
              id="cine"
              onChange={e => this.changeSelect(e)}>
              <option value="default" selected="" disabled="">
                CINES
              </option>
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

MoviesFilter.label = 'Filtro de Películas 2'

export default MoviesFilter
