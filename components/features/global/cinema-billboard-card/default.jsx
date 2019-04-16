import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class CinemaBillboardCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieSelected: '',
      cinemaSelected: '',
      premiereData: {
        title: '',
        img: '',
        url: '',
        alt: '',
      },
      billboardData: {
        moviesList: [],
        cinemasList: [],
      },
    }
    this.handleMovieSelected = this.handleMovieSelected.bind(this)
    this.handleCinemaSelected = this.handleCinemaSelected.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getBillboard()
  }

  getBillboard() {
    const { fetched } = this.getContent('cinema-billboard', { website: '' })

    fetched.then(response => {
      const { peliculas, cines, estrenos } = response

      const moviesList = Object.values(peliculas)
      const cinemasList = cines

      // TODO: Agregar rezise de esta imagen
      const premiereData = {
        title: estrenos[0].name,
        img: estrenos[0].poster.sizes.poster,
        url: estrenos[0].url,
        alt: estrenos[0].body,
      }

      this.setState({
        premiereData,
        billboardData: { moviesList, cinemasList },
      })
    })
  }

  handleMovieSelected(event) {
    this.setState({ movieSelected: event.target.value })
  }

  handleCinemaSelected(event) {
    this.setState({ cinemaSelected: event.target.value })
  }

  handleSubmit(event) {
    const { contextPath, arcSite } = this.props
    const { movieSelected, cinemaSelected } = this.state

    const moviePath = movieSelected || 'peliculas'
    const cinemaPath = cinemaSelected || 'cines'

    const fullPath =
      !movieSelected && !cinemaSelected ? '' : `${moviePath}/${cinemaPath}`

    window.location.href = `${contextPath}/cartelera/${fullPath}?_website=${arcSite}`
    event.preventDefault()
  }

  render() {
    const {
      movieSelected,
      cinemaSelected,
      billboardData,
      premiereData,
    } = this.state

    const { contextPath, arcSite } = this.props

    return (
      <div className="card-cinema padding-normal row-1">
        <article className="position-relative">
          <span className="card-cinema__gradient full-width" />
          <h3 className="card-cinema__category">
            <a
              className="card-cinema__link"
              href={`${contextPath}/cartelera?_website=${arcSite}`}>
              Cartelera
            </a>
          </h3>
          <figure className="card-cinema__figure">
            <a
              href={`${contextPath}/cartelera/peliculas/${
                premiereData.url
              }?_website=${arcSite}`}>
              <img
                src={premiereData.img}
                alt={premiereData.alt}
                className="full-width card-cinema__img"
              />
            </a>
          </figure>
          <div className="card-cinema__detail full-width">
            <span className="card-cinema__premiere">Estreno</span>
            <h2 className="card-cinema__p-title">
              <a
                className="card-cinema__p-link"
                href={`${contextPath}/cartelera/peliculas/${
                  premiereData.url
                }?_website=${arcSite}`}>
                Luchando con mi familia
              </a>
            </h2>
          </div>
        </article>
        <div className="card-cinema__movies-list">
          <h4 className="card-cinema__title">Vamos al cine</h4>
          <form
            action="/cartelera/search"
            method="post"
            className="card-cinema__form"
            onSubmit={this.handleSubmit}>
            <div className="card-cinema__selects-container">
              <select
                name="movie"
                className="card-cinema__select"
                value={movieSelected}
                onChange={this.handleMovieSelected}>
                <option
                  value=""
                  defaultValue
                  disabled
                  className="card-cinema__option">
                  PELÍCULAS
                </option>
                {billboardData.moviesList.map(movie => (
                  <option
                    value={movie.url}
                    className="card-cinema__option"
                    key={movie.mid}>
                    {movie.title}
                  </option>
                ))}
              </select>
              <select
                name="theater"
                className="card-cinema__select"
                value={cinemaSelected}
                onChange={this.handleCinemaSelected}>
                <option
                  value=""
                  defaultValue
                  disabled
                  className="card-cinema__option">
                  CINES
                </option>
                {billboardData.cinemasList.map(cinema => (
                  <option
                    value={cinema.url}
                    className="card-cinema__option"
                    key={cinema.cid}>
                    {cinema.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="card-cinema__button">
              Buscar
            </button>
          </form>
        </div>
      </div>
    )
  }
}

CinemaBillboardCard.label = 'Cartelera'

export default CinemaBillboardCard
