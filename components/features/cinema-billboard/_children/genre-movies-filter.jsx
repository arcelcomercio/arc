import React, { PureComponent, Fragment } from 'react'
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'

class GenreMoviesFilter extends PureComponent {
  classes = {
    moviesGrid: 'movies-grid margin-top',
    container: 'movies-grid__container',
    headline: 'movies-grid__headline text-uppercase text-center',
    nav: 'movies-grid__nav',
    navList: 'movies-grid__nav-list flex flex--justify-center',
    navItem: 'movies-grid__nav-item',
    navLink: 'movies-grid__nav-link',
    form: 'movies-grid__form',
    info: 'movies-grid__info',
    select: 'movies-grid__select',
    grid: 'movies-grid__grid',
    movie: 'movies-grid__movie',
    imageBox: 'movies-grid__img-box',
    image: 'movies-grid__img',
    details: 'movies-grid__details',
    title: 'movies-grid__title',
    tag: 'movies-grid__tag',
  }

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      genres: [],
    }
    this.billboardFormat = new BillboardFormat()

    const { contextPath, arcSite } = props
    this.WEBSITE_PARAM = `?_website=${arcSite}`
    this.URI_BASE = `${contextPath}/cartelera`
  }

  componentDidMount() {
    const { data, genre } = this.props
    this.billboardFormat.setData = data

    this.setState({
      movies: this.billboardFormat.moviesByGenre(genre),
      genres: this.billboardFormat.genreList,
    })
  }

  _handleSelectChange = e => {
    window.location.href = e.target.value
  }

  render() {
    const { movies, genres } = this.state
    const { genre } = this.props

    return (
      <section className={this.classes.moviesGrid}>
        <div className={this.classes.container}>
          <h3 className={this.classes.headline}>Listín Cinematográfico</h3>
          {genres && (
            <Fragment>
              <nav className={this.classes.nav}>
                <ul className={this.classes.navList}>
                  <li className={this.classes.navItem}>
                    <a
                      href={`${this.URI_BASE}${this.WEBSITE_PARAM}`}
                      className={`${this.classes.navLink} text-uppercase ${
                        !genre ? 'movies-grid__nav-link--active' : ''
                      }`}>
                      TODAS
                    </a>
                  </li>
                  {genres.map(
                    singleGenre =>
                      singleGenre.name !== 'Otras' && (
                        <li
                          className={this.classes.navItem}
                          key={`nav-${singleGenre.url}`}>
                          <a
                            href={`${this.URI_BASE}/peliculas/cines/${
                              singleGenre.url
                            }${this.WEBSITE_PARAM}`}
                            className={`${
                              this.classes.navLink
                            } text-uppercase ${
                              genre === singleGenre.url
                                ? 'movies-grid__nav-link--active'
                                : ''
                            }`}>
                            {singleGenre.name}
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </nav>
              <form action="/" className={this.classes.form}>
                <p className={this.classes.info}>
                  Utilice los desplegables para seleccionar el film
                </p>
                <select
                  name="genres"
                  id="genres"
                  className={this.classes.select}
                  onChange={e => this._handleSelectChange(e)}>
                  <option selected value="default" disabled>
                    FILTRAR POR GÉNERO:
                  </option>
                  <option value={`${this.URI_BASE}${this.WEBSITE_PARAM}`}>
                    Todas
                  </option>
                  {genres.map(
                    singleGenre =>
                      singleGenre.name !== 'Otras' && (
                        <option
                          value={`${this.URI_BASE}/peliculas/cines/${
                            singleGenre.url
                          }${this.WEBSITE_PARAM}`}
                          key={`select-${singleGenre.url}`}>
                          {singleGenre.name}
                        </option>
                      )
                  )}
                </select>
              </form>
            </Fragment>
          )}
          {movies && (
            <ul className={this.classes.grid}>
              {movies.map(movie => (
                <li key={movie.mid} className={this.classes.movie}>
                  <a
                    href={`${this.URI_BASE}/${movie.url}/cines${
                      this.WEBSITE_PARAM
                    }`}>
                    <figure className={this.classes.imageBox}>
                      <img
                        src={movie.poster_chico.sizes['134x193']}
                        alt={movie.title || ''}
                        className={this.classes.image}
                      />
                    </figure>
                    <div className={this.classes.details}>
                      <h2 className={this.classes.title}>
                        {movie.title || ''}
                      </h2>
                      <span className={this.classes.tag}>Estreno</span>
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
