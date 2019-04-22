import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'

// "this.options[this.selectedIndex].value &amp;&amp; (window.location = this.options[this.selectedIndex].value);"
@Consumer
class GenreMoviesFilter extends Component {
  classes = {}

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      genres: [],
    }
    this.billboardFormat = new BillboardFormat()
  }

  componentDidMount() {
    this.getBillboard()
  }

  getBillboard() {
    const { fetched } = this.getContent('cinema-billboard', { website: '' })

    fetched.then(response => {
      this.billboardFormat.setData = response
      const movies = this.billboardFormat.moviesList
      const genres = this.billboardFormat.genderList
      this.setState({
        movies,
        genres,
      })
    })
  }

  _changeSelect(e) {
    const from = e.target.id
    const { value } = e.target
    if (from === 'genres') {
      this.billboardFormat.moviesByGender(value)
    }
  }

  render() {
    const { movies, genres } = this.state
    const { customFields, contextPath, arcSite } = this.props
    const { headline } = customFields || {}
    const WEBSITE_PARAM = `?_website=${arcSite}`

    return (
      <section className="movies-grid margin-top">
        <div className="movies-grid__container">
          <h3 className="movies-grid__headline text-uppercase text-center">
            {headline || `Listín Cinematográfico`}
          </h3>
          {genres && (
            <Fragment>
              <nav className="movies-grid__nav">
                <ul className="movies-grid__nav-list flex flex--justify-center">
                  <li className="movies-grid__nav-item">
                    <a
                      href={`${contextPath}/cartelera${WEBSITE_PARAM}`}
                      className="movies-grid__nav-link text-uppercase movies-grid__nav-link--active">
                      TODAS
                    </a>
                  </li>
                  {genres.map(
                    genre =>
                      genre.genero !== 'Otras' && (
                        <li className="movies-grid__nav-item">
                          <a
                            href={`${contextPath}/cartelera/peliculas/cines/${
                              genre.url
                            }${WEBSITE_PARAM}`}
                            className="movies-grid__nav-link text-uppercase">
                            {genre.genero}
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </nav>
              <form action="/" className="movies-grid__form">
                <p className="movies-grid__info">
                  Utilice los desplegables para seleccionar el film
                </p>
                <select
                  name="genres"
                  id="genres"
                  className="movies-grid__select"
                  onChange={e => this._changeSelect(e)}>
                  <option selected="" value="" disabled="">
                    FILTRAR POR GÉNERO:
                  </option>
                  {genres.map(
                    genre =>
                      genre.genero !== 'Otras' && (
                        <option value="/cartelera/terror#listing">
                          {genre.genero}
                        </option>
                      )
                  )}
                </select>
              </form>
            </Fragment>
          )}
          {movies && (
            <ul className="movies-grid__grid">
              {movies.map(movie => (
                <li className="movies-grid__movie">
                  <a
                    href={`${contextPath}/cartelera/${
                      movie.url
                    }/cines${WEBSITE_PARAM}`}>
                    <figure className="movies-grid__image-box">
                      <img
                        src={movie.poster_chico.sizes['134x193']}
                        alt={movie.title || ''}
                        className="movies-grid__image"
                      />
                    </figure>
                    <div className="movies-grid__details">
                      <h2 className="movies-grid__title">
                        {movie.title || ''}
                      </h2>
                      <span className="movies-grid__tag">Estreno</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    )
  }
}

GenreMoviesFilter.propTypes = {
  customFields: PropTypes.shape({
    headline: PropTypes.string.tag({
      name: 'Texto de cabecera',
      description: 'Dejar vacío para mostrar - Listín Cinematográfico -.',
    }),
  }),
}

GenreMoviesFilter.label = 'Grilla de Películas'

export default GenreMoviesFilter
