import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import BillboardFormat from '../../../utilities/billboard-format'

const classes = {
  container: 'movies-filter w-full',
  titleBox: 'movies-filter__title-box flex justify-between',
  title: 'movies-filter__title flex items-center position-relative',
  social: 'movies-filter__social flex',
  facebook: 'icon icon--facebook icon--margin-right',
  twitter: 'icon icon--twitter',
  filter: 'movies-filter__filter-box flex justify-between',
  label: 'movies-filter__label movies-filter--font-config uppercase',
  form: 'movies-filter__form movies-filter--font-config flex',
  button: 'movies-filter__btn movies-filter--font-config uppercase',
}

@Consumer
class MoviesFilter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      cinemas: [],
      movies: [],
      genres: [],
    }

    this.billboardFormat = new BillboardFormat()

    const { contextPath } = props
    this.URI_BASE = `${contextPath}/cartelera`

    this.movieSelect = React.createRef()
    this.genreSelect = React.createRef()
    this.cinemaSelect = React.createRef()
  }

  componentDidMount() {
    const { data } = this.props
    this.billboardFormat.setData = data
    const movies = this.billboardFormat.moviesList
    const cinemas = this.billboardFormat.cinemaList
    const genres = this.billboardFormat.genreList

    this.setState({
      movies,
      cinemas,
      genres,
    })
  }

  _handleSelectChange = e => {
    const { id: selectId } = e.target
    const optionId = e.target.selectedOptions[0].dataset.id

    if (selectId === 'movie') {
      this.filterCinemasByMovie(optionId)
    }
    if (selectId === 'genre') {
      this.filterMoviesByGenre(optionId)
    }
    if (selectId === 'cinema') {
      this.filterMoviesByCinema(optionId)
    }
  }

  _handleSubmit = e => {
    e.preventDefault()
    const movieSlug = this.movieSelect.current.value
    const genreSlug = this.genreSelect.current.value
    const cinemaSlug = this.cinemaSelect.current.value

    let searchUri

    if (movieSlug === 'peliculas' && genreSlug === '' && cinemaSlug === 'cines')
      searchUri = this.URI_BASE
    else if (
      genreSlug !== '' &&
      movieSlug === 'peliculas' &&
      cinemaSlug === 'cines'
    )
      searchUri = `${this.URI_BASE}/${movieSlug}/${cinemaSlug}/${genreSlug}`
    else searchUri = `${this.URI_BASE}/${movieSlug}/${cinemaSlug}`

    window.location.href = searchUri
  }

  filterCinemasByMovie(id) {
    const { movies = [] } = this.billboardFormat.getData
    const filteredMovies = movies.filter(movie => movie.mid === id)
    const cinemas = filteredMovies[0].cines.filter((data, index, arr) => {
      return arr.map(mapObj => mapObj.cid).indexOf(data.cid) === index
    })
    this.setState({ cinemas })
  }

  filterMoviesByGenre(id) {
    const movies = this.billboardFormat.moviesByGenre(id)
    this.setState({ movies })
  }

  filterMoviesByCinema(id) {
    const { cinemas = [] } = this.billboardFormat.getData
    const filteredCinemas = cinemas.filter(cinema => cinema.cid === id)
    const movies = filteredCinemas[0].peliculas
    this.setState({ movies })
  }

  render() {
    const { movies, cinemas, genres } = this.state

    return (
      <section className={classes.container}>
        <div className={classes.titleBox}>
          <h2 className={classes.title}>Estrenos de la semana</h2>
          <div className={classes.social}>
            <i className={classes.facebook} />
            <i className={classes.twitter} />
          </div>
        </div>
        <div className={classes.filter}>
          <h4 className={classes.label}>Vamos al cine</h4>
          <form action="/" className={classes.form}>
            <select
              name="movie"
              id="movie"
              ref={this.movieSelect}
              onChange={e => this._handleSelectChange(e)}>
              <option value="peliculas" selected="" disabled="">
                PELÍCULAS
              </option>
              {movies &&
                movies.map(movie => {
                  return (
                    <option
                      key={`movie-${movie.mid}`}
                      value={movie.url}
                      data-id={movie.mid}
                      selected=""
                      disabled="">
                      {movie.title}
                    </option>
                  )
                })}
            </select>

            <select
              name="genre"
              id="genre"
              ref={this.genreSelect}
              onChange={e => this._handleSelectChange(e)}>
              <option value="" selected="" disabled="">
                GÉNERO
              </option>
              {genres &&
                genres.map(
                  genre =>
                    genre.name !== 'Otras' && (
                      <option
                        key={`genre-${genre.url}`}
                        value={genre.url}
                        data-id={genre.url}
                        selected=""
                        disabled="">
                        {genre.name}
                      </option>
                    )
                )}
            </select>

            <select
              name="cinema"
              id="cinema"
              ref={this.cinemaSelect}
              onChange={e => this._handleSelectChange(e)}>
              <option value="cines" selected="" disabled="">
                CINES
              </option>
              {cinemas &&
                cinemas.map(cinema => {
                  return (
                    <option
                      key={`cinema-${cinema.cid}`}
                      value={cinema.url}
                      data-id={cinema.cid}
                      selected=""
                      disabled="">
                      {cinema.nombre}
                    </option>
                  )
                })}
            </select>
            <button
              type="submit"
              className={classes.button}
              onClick={e => this._handleSubmit(e)}>
              Buscar
            </button>
          </form>
        </div>
      </section>
    )
  }
}

export default MoviesFilter
