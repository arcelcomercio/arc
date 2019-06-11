import React, { PureComponent } from 'react'
import BillboardFormat from '../../../utilities/billboard-format'
import { defaultImage } from '../../../utilities/helpers'

const classes = {
  container: 'movie-details flex flex-col',
  imgBox: 'movie-details__box-img position-relative w-full',
  img: 'movie-details__img w-full h-full object-cover',
  iconBox:
    'movie-details__box-icon position-absolute flex items-center justify-center',
  icon: 'movie-details__icon',
  details: 'movie-details__detail w-full flex flex-col',
  leftSide: 'movie-details__left w-full',
  title: 'movie-details__title',
  where: 'movie-details__where uppercase',
  hours: 'movie-details__hours scroll-vertical-auto',
  item: 'movie-details__item',
  cinema: 'movie-details__cinema block font-bold',
  text: 'movie-details__text font-normal',
  more: 'movie-details__more flex items-center justify-center',
  button: 'movie-details__btn',
  rightSide: 'movie-details__right',
  name: 'movie-details__name font-bold',
  value: 'movie-details__value font-normal',
}

class StaticCinemaBillboardChildMoviesDetails extends PureComponent {
  constructor(props) {
    super(props)

    this.billboardFormat = new BillboardFormat()

    this.state = {
      movie: {},
      cinemas: [],
    }

    const { contextPath } = props
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

  setDefault(size) {
    const { deployment, contextPath, arcSite } = this.props
    return defaultImage({ deployment, contextPath, arcSite, size })
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
        <article className={classes.container}>
          <figure className={classes.imgBox}>
            <a target="_BLANK" rel="noopener noreferrer" href={description}>
              <picture>
                <source
                  srcSet={sizes['367x176'] || this.setDefault('sm')}
                  media="(max-width: 367px)"
                />
                <img
                  src={sizes['620x387'] || this.setDefault('lg')}
                  alt={title}
                  className={classes.img}
                />
              </picture>
            </a>
            <div className={classes.iconBox}>
              <span className={classes.icon}>V</span>
            </div>
          </figure>
          <div className={classes.details}>
            <div className={classes.leftSide}>
              <h2 className={classes.title}>{title}</h2>
              <p className={classes.where}>Dónde Verla</p>
              <div role="list" className={classes.hours}>
                {cinemas &&
                  cinemas.map(cinema => {
                    return (
                      <address role="listitem" className={classes.item}>
                        <a
                          href={`${this.URI_BASE}/peliculas/${cinema.url}`}
                          className={classes.cinema}>
                          {cinema.nombre}
                        </a>
                        <p className={classes.text}>{cinema.direccion}</p>
                        {/* Este <p> debería ser <time> pero cada dato interno debe ser independiente */}
                        <p className={classes.text}>{cinema.horario}</p>
                      </address>
                    )
                  })}
              </div>
              <a href={this.URI_BASE} className={classes.more}>
                <p className={classes.button}>Regresar</p>
              </a>
            </div>
            <div className={classes.rightSide}>
              <p className={`${classes.name} ${classes.name}--sinopsis`}>
                Sinopsis:
                <br />
                <p className={classes.value}>{body}</p>
              </p>
              <p className={classes.name}>
                País:
                <br />
                <p className={classes.value}>{pais}</p>
              </p>
              <p className={classes.name}>
                Director:
                <br />
                <p className={classes.value}>{director}</p>
              </p>
              <p className={classes.name}>
                Actores:
                <br />
                <p className={classes.value}>{actores}</p>
              </p>
              <p className={classes.name}>
                Duración:
                <br />
                <p className={classes.value}>{duracion}</p>
              </p>
              <p className={classes.name}>
                Calificación:
                <br />
                <p className={classes.value}>{calificacion}</p>
              </p>
            </div>
          </div>
        </article>
      )
    )
  }
}

export default StaticCinemaBillboardChildMoviesDetails
