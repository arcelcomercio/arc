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
    form: 'movies-filter__form flex ',
    options: 'movies-filter__options movies-filter--font-config flex',
    button: 'movies-filter__button movies-filter--font-config text-uppercase',
  }

  constructor(...props) {
    super(...props)

    this.state = {
      cinema: {},
      cines: [],
      peliculas: [],
      genre: [],
    }

    this.billboardFormat = new BillboardFormat()
  }

  componentDidMount() {
    const { data } = this.props
    console.log(data, 'DATOS')
    this.billboardFormat.setData = data
    const cinema = this.billboardFormat.getData
    const peliculas = this.billboardFormat.moviesList
    const cines = this.billboardFormat.cinemaList
    const genre = this.billboardFormat.genderList
    // ... no se, por ahi va la cosa

    this.setState({
      cinema,
      peliculas,
      cines,
      genre,
    })
  }

  changeSelect = e => {
    const { id } = e.target
    const idOption = e.target.selectedOptions[0].dataset.id
    if (id === 'pelicula') {
      this.newCinema(idOption)
    }
    if (id === 'genero') {
      this.movieGenre(idOption)
    }
    if (id === 'cines') {
      this.newMovie(idOption)
    }
  }

  newCinema(id) {
    const { peliculas } = this.state
    const peli = peliculas.filter(pelicula => pelicula.mid === id)
    const nuevosCines = peli[0].cines.filter((dato, index, arr) => {
      return arr.map(mapObj => mapObj.cid).indexOf(dato.cid) === index
    })
    this.setState({ cines: nuevosCines })
  }

  movieGenre(id) {
    const newMovies = this.billboardFormat.moviesByGender(id)
    this.setState({ peliculas: newMovies })
  }


  render() {
    const { peliculas, cines, genre } = this.state
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
            <div className={this.classes.options}>
              <select
                name="movie"
                id="pelicula"
                onChange={e => this.changeSelect(e)}>
                <option value="default" selected="" disabled="">
                  PELÍCULAS
                </option>
                {peliculas &&
                  peliculas.map(pelicula => {
                    return (
                      <option
                        key={pelicula.mid}
                        value={pelicula.url}
                        data-id={pelicula.mid}
                        selected=""
                        disabled="">
                        {pelicula.title}
                      </option>
                    )
                  })}
              </select>

              <select
                name="genre"
                id="genero"
                onChange={e => this.changeSelect(e)}>
                <option value="default" selected="" disabled="">
                  GÉNERO
                </option>
                <option value="todas">Todas</option>
                {genre &&
                  genre.map(gen => {
                    return (
                      <option
                        key={gen.url}
                        value={gen.url}
                        data-id={gen.genero}
                        selected=""
                        disabled="">
                        {gen.genero}
                      </option>
                    )
                  })}
              </select>

              <select
                name="theater"
                id="cine"
                onChange={e => this.changeSelect(e)}>
                <option value="default" selected="" disabled="">
                  CINES
                </option>
                {cines &&
                  cines.map(cine => {
                    return (
                      <option
                        key={cine.cid}
                        value={cine.url}
                        selected=""
                        disabled="">
                        {cine.nombre}
                      </option>
                    )
                  })}
              </select>
            </div>
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
