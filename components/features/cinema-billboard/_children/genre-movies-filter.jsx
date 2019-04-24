import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'

@Consumer
class GenreMoviesFilter extends PureComponent {
  classes = {}

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      genres: [],
    }
    this.billboardFormat = new BillboardFormat()

    const { arcSite } = props
    this.WEBSITE_PARAM = `?_website=${arcSite}`
  }

  componentDidMount() {
    const { data, genre } = this.props
    this.billboardFormat.setData = data

    this.setState({
      movies: this.billboardFormat.moviesByGender(genre),
      genres: this.billboardFormat.genderList,
    })
  }

  _handleSelectChange = e => {
    window.location.href = e.target.value
  }

  render() {
    const { movies, genres } = this.state
    const { contextPath, genre } = this.props

    return (
      <section className="movies-grid margin-top">
        <div className="movies-grid__container">
          <h3 className="movies-grid__headline text-uppercase text-center">
            Listín Cinematográfico
          </h3>
          {genres && (
            <Fragment>
              <nav className="movies-grid__nav">
                <ul className="movies-grid__nav-list flex flex--justify-center">
                  <li className="movies-grid__nav-item">
                    <a
                      href={`${contextPath}/cartelera${this.WEBSITE_PARAM}`}
                      className={`movies-grid__nav-link text-uppercase ${
                        !genre ? 'movies-grid__nav-link--active' : ''
                      }`}>
                      TODAS
                    </a>
                  </li>
                  {genres.map(
                    singleGenre =>
                      singleGenre.genero !== 'Otras' && (
                        <li
                          className="movies-grid__nav-item"
                          key={`nav-${singleGenre.url}`}>
                          <a
                            href={`${contextPath}/cartelera/peliculas/cines/${
                              singleGenre.url
                            }${this.WEBSITE_PARAM}`}
                            className={`movies-grid__nav-link text-uppercase ${
                              genre === singleGenre.url
                                ? 'movies-grid__nav-link--active'
                                : ''
                            }`}>
                            {singleGenre.genero}
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
                  onChange={e => this._handleSelectChange(e)}>
                  <option selected value="default" disabled>
                    FILTRAR POR GÉNERO:
                  </option>
                  <option
                    value={`${contextPath}/cartelera${this.WEBSITE_PARAM}`}>
                    Todas
                  </option>
                  {genres.map(
                    singleGenre =>
                      singleGenre.genero !== 'Otras' && (
                        <option
                          key={singleGenre.url}
                          value={`${contextPath}/cartelera/peliculas/cines/${
                            singleGenre.url
                          }${this.WEBSITE_PARAM}`}
                          key={`select-${singleGenre.url}`}>
                          {singleGenre.genero}
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
                <li key={movie.mid} className="movies-grid__movie">
                  <a
                    href={`${contextPath}/cartelera/${movie.url}/cines${
                      this.WEBSITE_PARAM
                    }`}>
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

GenreMoviesFilter.label = 'Grilla de Películas'

export default GenreMoviesFilter
