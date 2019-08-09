import React, { PureComponent } from 'react'
import BillboardFormat from '../../../utilities/billboard-format'
import { defaultImage } from '../../../utilities/helpers'

const classes = {
  moviesGrid: 'movies-grid bg-white mt-20 p-20',
  container: 'movies-grid__container',
  headline: 'uppercase text-center mb-20',
  nav: 'movies-grid__nav hidden md:block',
  navList: 'flex justify-center flex-wrap mb-10',
  navItem: 'mb-10',
  navLink:
    'movies-grid__nav-link p-10 position-relative uppercase text-md text-gray-200',
  form: 'movies-grid__form mb-20 md:hidden',
  info: 'movies-grid__info mb-20 text-xs text-gray-200',
  select: 'movies-grid__select bg-info w-full text-gray-300',
  grid: 'movies-grid__grid grid',
  movie: 'movies-grid__movie m-0 mx-auto',
  imageBox: '',
  image: 'w-full mb-10',
  details: 'movies-grid__details',
  title: 'movies-grid__title mb-5 text-sm text-gray-200 line-h-sm',
  tag: 'movies-grid__tag font-bold text-sm text-gray-300',
}

const URI_BASE = '/cartelera'
const MOVIES_BASE = '/peliculas'
const TEATHERS_BASE = '/cines'
const MOVIE_IMG_SIZE = '134x193'

class StaticCinemaBillboardChildGenreMoviesFilter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      genres: [],
    }
    this.billboardFormat = new BillboardFormat()
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
    const { genre, deployment, contextPath, arcSite } = this.props

    return (
      <section className={classes.moviesGrid}>
        <div className={classes.container}>
          <h3 className={classes.headline}>Listín Cinematográfico</h3>
          {genres && (
            <>
              <nav className={classes.nav}>
                <ul className={classes.navList}>
                  <li className={classes.navItem}>
                    <a
                      href={URI_BASE}
                      className={`${classes.navLink} ${
                        !genre ? 'movies-grid__nav-link--active' : ''
                      }`}>
                      TODAS
                    </a>
                  </li>
                  {genres.map(
                    singleGenre =>
                      singleGenre.name !== 'Otras' && (
                        <li
                          className={classes.navItem}
                          key={`nav-${singleGenre.url}`}>
                          <a
                            href={`${URI_BASE}${MOVIES_BASE}${TEATHERS_BASE}/${
                              singleGenre.url
                            }`}
                            className={`${classes.navLink} ${
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
              <form action="/" className={classes.form}>
                <p className={classes.info}>
                  Utilice los desplegables para seleccionar el film
                </p>
                <select
                  name="genres"
                  id="genres"
                  className={classes.select}
                  onChange={e => this._handleSelectChange(e)}>
                  <option selected value="default" disabled>
                    FILTRAR POR GÉNERO:
                  </option>
                  <option value={`${URI_BASE}`}>Todas</option>
                  {genres.map(
                    singleGenre =>
                      singleGenre.name !== 'Otras' && (
                        <option
                          value={`${URI_BASE}${MOVIES_BASE}${TEATHERS_BASE}/${
                            singleGenre.url
                          }`}
                          key={`select-${singleGenre.url}`}>
                          {singleGenre.name}
                        </option>
                      )
                  )}
                </select>
              </form>
            </>
          )}
          {movies && (
            <ul className={classes.grid}>
              {movies.map(movie => (
                <li key={movie.mid} className={classes.movie}>
                  <a href={`${URI_BASE}/${movie.url}${TEATHERS_BASE}`}>
                    <figure className={classes.imageBox}>
                      <img
                        src={
                          movie.poster_chico.sizes[MOVIE_IMG_SIZE] ||
                          defaultImage({
                            deployment,
                            contextPath,
                            arcSite,
                            size: 'sm',
                          })
                        }
                        alt={movie.title || ''}
                        className={classes.image}
                        
                      />
                      <figcaption className={classes.details}>
                        <h2 className={classes.title}>{movie.title || ''}</h2>
                        <p className={classes.tag}>Estreno</p>
                      </figcaption>
                    </figure>
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

export default StaticCinemaBillboardChildGenreMoviesFilter
