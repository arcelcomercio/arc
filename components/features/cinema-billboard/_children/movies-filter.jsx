import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'

// nuevo
@Consumer
class MoviesFilter extends Component {
  classes = {
    container: 'movies-filter full-width',
    titleBox: 'movies-filter__title-box flex flex--justify-between',
    title: 'movies-filter__title flex-center-vertical position-relative',
    social: 'movies-filter__social flex',
    facebook: 'icon icon--facebook icon--margin-right',
    twitter: 'icon icon--twitter',
    filter: 'movies-filter__filter-box flex flex--justify-between',
    label: 'movies-filter__label movies-filter--font-config text-uppercase',
    form: 'movies-filter__form movies-filter--font-config flex',
    button: 'movies-filter__button movies-filter--font-config text-uppercase',
  }

  constructor(...props) {
    super(...props)
    this.cinema = {}
    this.cines = []
    this.peliculas = []
    this.billboardFormat = new BillboardFormat()
  }

  componentDidMount() {
    const { data } = this.props
    this.billboardFormat.setData = data
    const peliculas = this.billboardFormat.moviesList
    const cines = this.billboardFormat.cinemaList
    // ... no se, por ahi va la cosa

    this.setState({
      cinema: data,
      peliculas,
      cines,
    })
  }

  changeSelect = e => {
    return console.log(e, 'hola')
  }

  render() {
    return (
      <div className={this.classes.container}>
        <div className={this.classes.titleBox}>
          <h2 className={this.classes.title}>Estrenos de la semana</h2>
          <div className={this.classes.social}>
            <i className={this.classes.facebook} />
            <i className={this.classes.twitter} />
          </div>
        </div>
        <div className={this.classes.filter}>
          <h4 className={this.classes.label}>Vamos al cine</h4>
          <form
            action="/cartelera/search"
            method="post"
            className={this.classes.form}>
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
            <button type="submit" className={this.classes.button}>
              Buscar
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default MoviesFilter
