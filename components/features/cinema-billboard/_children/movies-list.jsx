import React, { PureComponent } from 'react'
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'

class MoviesList extends PureComponent {
  classes = {
    movieList: 'movie-list',
    top: 'movie-list__top flex-center flex--column',
    cinema: 'movie-list__cinema text-uppercase',
    address: 'movie-list__address',
    box: 'movie-list__box',
    movieItem: 'movie-item flex flex--column',
    leftSide: 'movie-item__left',
    imageBox: 'block full-width',
    image: 'movie-item__img full-width',
    title: 'movie-item__title',
    function: 'movie-item__function',
    rightSide: 'movie-item__right',
    subtitle: 'movie-item__subtitle',
    description: 'movie-item__description',
  }

  constructor(props) {
    super(props)

    this.billboardFormat = new BillboardFormat()

    this.state = {
      movies: [],
      cinema: {},
    }

    const { contextPath, arcSite } = props
    this.WEBSITE_PARAM = `?_website=${arcSite}`
    this.URI_BASE = `${contextPath}/cartelera`
  }

  componentDidMount() {
    const { data, cinema } = this.props
    this.billboardFormat.setData = data
    const { cinemaList } = this.billboardFormat
    const matchedCinema = cinemaList.find(itemCine => itemCine.url === cinema)
    const movies = matchedCinema.peliculas

    this.setState({
      movies,
      cinema: matchedCinema,
    })
  }

  render() {
    const { movies, cinema } = this.state

    return (
      cinema && (
        <div className={this.classes.movieList}>
          <div className={this.classes.top}>
            <h1 className={this.classes.cinema}>{cinema.nombre}</h1>
            <h3 className={this.classes.address}>{cinema.direccion}</h3>
          </div>
          <div className={this.classes.box}>
            {movies ? (
              movies.map(movie => {
                const {
                  url = 'peliculas',
                  title = '',
                  body = '',
                  pais = '',
                  director = '',
                  actores = '',
                  calificacion = '',
                  poster: { sizes = {} } = {},
                } = movie

                return (
                  <div className={this.classes.movieItem}>
                    <div className={this.classes.leftSide}>
                      <a
                        href={`${this.URI_BASE}/${url}/${cinema.url}${
                          this.WEBSITE_PARAM
                        }`}
                        className={this.classes.imageBox}>
                        <img
                          src={sizes['620x387']}
                          alt={title}
                          className={this.classes.image}
                        />
                        <h3 className={this.classes.title}>{title}</h3>
                      </a>
                      <p className={this.classes.function}>{cinema.horario}</p>
                    </div>
                    <div className={this.classes.rightSide}>
                      <p className={this.classes.subtitle}>
                        Sinopsis:
                        <span className={this.classes.description}>{body}</span>
                      </p>
                      <p className={this.classes.subtitle}>
                        País:
                        <span className={this.classes.description}>{pais}</span>
                      </p>
                      <p className={this.classes.subtitle}>
                        Director:
                        <span className={this.classes.description}>
                          {director}
                        </span>
                      </p>
                      <p className={this.classes.subtitle}>
                        Actores:
                        <span className={this.classes.description}>
                          {actores}
                        </span>
                      </p>
                      <p className={this.classes.subtitle}>
                        Calificación:
                        <span className={this.classes.description}>
                          {calificacion}
                        </span>
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className={`${this.classes.cinema} text-center`}>
                No hay peliculas disponibles para este cine
              </p>
            )}
          </div>
        </div>
      )
    )
  }
}

export default MoviesList
