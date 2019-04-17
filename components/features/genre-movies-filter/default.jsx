import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import BillboardFormat from '../../../resources/utilsJs/billboardFormat'

// "this.options[this.selectedIndex].value &amp;&amp; (window.location = this.options[this.selectedIndex].value);"
@Consumer
class GenreMoviesFilter extends Component {
  classes = {}

  constructor(props) {
    super(props)
    this.state = {
      moviesBase: [],
      movies: [],
      genres: [],
    }
  }

  componentDidMount() {
    this.getBillboard()
  }

  getBillboard() {
    const { fetched } = this.getContent('cinema-billboard', { website: '' })

    fetched.then(response => {
      const { peliculas: moviesList } = response || {}
      const movies = this.getMoviesList(moviesList)
      const genres = this.getGenreList(moviesList)
      this.setState({
        moviesBase: moviesList,
        movies,
        genres,
      })
    })
  }

  getMoviesList = movies => {
    const moviesList = Object.values(movies)
    return moviesList.map(movie => ({
      id: movie.mid,
      title: movie.title,
      posters: movie.poster_chico,
      url: movie.url,
      genero: movie.genero,
    }))
  }

  getGenreList = moviesList => {
    const movies = Object.values(moviesList)
    const genres = movies.map(movie => {
      const { genero: genre = {} } = movie
      if (!genre.genero || !genre.url) return {}
      const { genero, url } = genre
      return {
        name: genero,
        url,
      }
    })
    return [...new Set(genres)]
  }

  getMoviesByGenre = genre => {
    const { moviesBase: moviesList } = this.state
    const movies = Object.values(moviesList)
    if (genre === 'todas' || genre === 'default') {
      this.setState({ movies })
      return movies
    }
    const filteredMovies = movies.filter(movie => movie.genero.genero === genre)
    this.setState({ movies: filteredMovies })
    return filteredMovies
  }

  _changeSelect(e) {
    const from = e.target.id
    const { value } = e.target
    if (from === 'genres') {
      this.getMoviesByGenre(value)
    }
  }

  render() {
    const { movies, genres } = this.state
    const { customFields, contextPath } = this.props
    const { headline } = customFields || {}
    console.log(genres)

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
                      href={`${contextPath}/cartelera`}
                      className="movies-grid__nav-link text-uppercase movies-grid__nav-link--active">
                      TODAS
                    </a>
                  </li>
                  {genres.map(genre => (
                    <li className="movies-grid__nav-item">
                      <a
                        href={`${contextPath}/cartelera/peliculas/cines/${
                          genre.url
                        }`}
                        className="movies-grid__nav-link text-uppercase">
                        {genre.name}
                      </a>
                    </li>
                  ))}
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
                  {genres.map(genre => (
                    <Fragment>
                      <option value="/cartelera/terror#listing">{genre}</option>
                    </Fragment>
                  ))}
                </select>
              </form>
            </Fragment>
          )}
          {movies && (
            <ul className="movies-grid__grid">
              {movies.map(movie => (
                <li className="movies-grid__movie">
                  <a href={`${contextPath}/cartelera/${movie.url}/cines`}>
                    <figure className="movies-grid__image-box">
                      <img
                        src={movie.posters.sizes['134x193']}
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
