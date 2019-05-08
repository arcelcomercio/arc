import React, { PureComponent } from 'react'
import BillboardFormat from '../../../utilities/billboard-format'

const classes = {
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

class StaticCinemaBillboardChildMoviesList extends PureComponent {
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
    const movies = matchedCinema.peliculas.filter((data, index, arr) => {
      return arr.map(mapObj => mapObj.mid).indexOf(data.mid) === index
    })

    console.log(movies)

    this.setState({
      movies,
      cinema: matchedCinema,
    })
  }

  render() {
    const { movies, cinema } = this.state

    return (
      cinema && (
        <div className={classes.movieList}>
          <div className={classes.top}>
            <h1 className={classes.cinema}>{cinema.nombre}</h1>
            <h3 className={classes.address}>{cinema.direccion}</h3>
          </div>
          <div className={classes.box}>
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
                  <div className={classes.movieItem}>
                    <div className={classes.leftSide}>
                      <a
                        href={`${this.URI_BASE}/${url}/${cinema.url}${
                          this.WEBSITE_PARAM
                        }`}
                        className={classes.imageBox}>
                        <img
                          src={sizes['620x387']}
                          alt={title}
                          className={classes.image}
                        />
                        <h3 className={classes.title}>{title}</h3>
                      </a>
                      <p className={classes.function}>{cinema.horario}</p>
                    </div>
                    <div className={classes.rightSide}>
                      <p className={classes.subtitle}>
                        Sinopsis:
                        <span className={classes.description}>{body}</span>
                      </p>
                      <p className={classes.subtitle}>
                        País:
                        <span className={classes.description}>{pais}</span>
                      </p>
                      <p className={classes.subtitle}>
                        Director:
                        <span className={classes.description}>
                          {director}
                        </span>
                      </p>
                      <p className={classes.subtitle}>
                        Actores:
                        <span className={classes.description}>
                          {actores}
                        </span>
                      </p>
                      <p className={classes.subtitle}>
                        Calificación:
                        <span className={classes.description}>
                          {calificacion}
                        </span>
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className={`${classes.cinema} text-center`}>
                No hay peliculas disponibles para este cine
              </p>
            )}
          </div>
        </div>
      )
    )
  }
}

export default StaticCinemaBillboardChildMoviesList
