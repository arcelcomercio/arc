import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'

// "this.options[this.selectedIndex].value &amp;&amp; (window.location = this.options[this.selectedIndex].value);"
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
  }

  componentDidMount() {
    const { data } = this.props
    this.billboardFormat.setData = data
    this.setState({
      movies: this.billboardFormat.moviesList,
      genres: this.billboardFormat.genderList,
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
    const { contextPath, arcSite } = this.props
    const WEBSITE_PARAM = `?_website=${arcSite}`

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

GenreMoviesFilter.label = 'Grilla de Películas'

export default GenreMoviesFilter
