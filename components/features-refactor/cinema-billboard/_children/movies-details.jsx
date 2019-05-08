import React, { PureComponent } from 'react'
import BillboardFormat from '../../../utilities/billboard-format'

const classes = {
  container: 'movie-details flex flex--column',
  imgBox: 'movie-details__box-img position-relative full-width',
  img: 'movie-details__img full-width',
  iconBox: 'movie-details__box-icon position-absolute flex-center',
  icon: 'movie-details__icon',
  details: 'movie-details__detail full-width flex flex--column',
  leftSide: 'movie-details__left full-width',
  title: 'movie-details__title',
  where: 'movie-details__where text-uppercase',
  hours: 'movie-details__hours scroll-vertical-auto',
  item: 'movie-details__item',
  cinema: 'movie-details__cinema block',
  text: 'movie-details__text',
  more: 'movie-details__more flex-center',
  button: 'movie-details__btn',
  rightSide: 'movie-details__right',
  name: 'movie-details__name',
  value: 'movie-details__value',
}

class StaticCinemaBillboardChildMoviesDetails extends PureComponent {
  constructor(props) {
    super(props)

    this.billboardFormat = new BillboardFormat()

    this.state = {
      movie: {},
      cinemas: [],
    }

    const { contextPath, arcSite } = props
    this.WEBSITE_PARAM = `?_website=${arcSite}`
    this.URI_BASE = `${contextPath}/cartelera`
  }

  componentDidMount() {
    const { data, movie, cinema } = this.props
    this.billboardFormat.setData = data
    const { moviesList } = this.billboardFormat
    const matchedMovie =
      moviesList.find(singleMovie => singleMovie.url === movie) || {}
    if (cinema === 'cines') {
      const cines = matchedMovie.cines.filter((dato, index, arr) => {
        return arr.map(mapObj => mapObj.cid).indexOf(dato.cid) === index
      })
      this.setState({ cinemas: cines })
    } else {
      const filteredCinemas = matchedMovie.cines.find(
        itemCine => itemCine.url === cinema
      )
      const orderedCinemas = [{ ...filteredCinemas }]
      this.setState({ cinemas: orderedCinemas })
    }

    this.setState({
      movie: matchedMovie,
    })
  }

  render() {
    const { cinemas, movie } = this.state
    const {
      title = '',
      body = '',
      pais = '',
      director = '',
      actores = '',
      duracion = '',
      calificacion = '',
      poster: { sizes = {} } = {},
      portada_e: { description = '' } = {},
    } = movie

    return (
      movie && (
        <div className={classes.container}>
          <div className={classes.imgBox}>
            <a target="_BLANK" rel="noopener noreferrer" href={description}>
              <img src={sizes['620x387']} alt={title} className={classes.img} />
            </a>
            <div className={classes.iconBox}>
              <span className={classes.icon}>V</span>
            </div>
          </div>
          <div className={classes.details}>
            <div className={classes.leftSide}>
              <h2 className={classes.title}>{title}</h2>
              <p className={classes.where}>Donde Verla</p>
              <div className={classes.hours}>
                {cinemas &&
                  cinemas.map(cinema => {
                    return (
                      <div className={classes.item}>
                        <a
                          href={`${this.URI_BASE}/peliculas/${cinema.url}${
                            this.WEBSITE_PARAM
                          }`}
                          className={classes.cinema}>
                          {cinema.nombre}
                        </a>
                        <p className={classes.text}>{cinema.direccion}</p>
                        <p className={classes.text}>{cinema.horario}</p>
                      </div>
                    )
                  })}
              </div>
              <a
                href={`${this.URI_BASE}${this.WEBSITE_PARAM}`}
                className={classes.more}>
                <p className={classes.button}>Regresar</p>
              </a>
            </div>
            <div className={classes.rightSide}>
              <p className={`${classes.name} ${classes.name}--sinopsis`}>
                Sinopsis:
                <br />
                <span className={classes.value}>{body}</span>
              </p>
              <p className={classes.name}>
                País:
                <br />
                <span className={classes.value}>{pais}</span>
              </p>
              <p className={classes.name}>
                Director:
                <br />
                <span className={classes.value}>{director}</span>
              </p>
              <p className={classes.name}>
                Actores:
                <br />
                <span className={classes.value}>{actores}</span>
              </p>
              <p className={classes.name}>
                Duración:
                <br />
                <span className={classes.value}>{duracion}</span>
              </p>
              <p className={classes.name}>
                Calificación:
                <br />
                <span className={classes.value}>{calificacion}</span>
              </p>
            </div>
          </div>
        </div>
      )
    )
  }
}

StaticCinemaBillboardChildMoviesDetails.label = "Detalle de la película"

export default StaticCinemaBillboardChildMoviesDetails
