import React, { Component } from 'react'
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'

class MoviesDetails extends Component {
  classes = {
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
      const cines = matchedMovie.cines.filter((data, index, arr) => {
        return arr.map(mapObj => mapObj.cid).indexOf(data.cid) === index
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
        <div className={this.classes.container}>
          <div className={this.classes.imgBox}>
            <a target="_BLANK" rel="noopener noreferrer" href={description}>
              <img
                src={sizes['620x387']}
                alt={title}
                className={this.classes.img}
              />
            </a>
            <div className={this.classes.iconBox}>
              <span className={this.classes.icon}>V</span>
            </div>
          </div>
          <div className={this.classes.details}>
            <div className={this.classes.leftSide}>
              <h2 className={this.classes.title}>{title}</h2>
              <p className={this.classes.where}>Donde Verla</p>
              <div className={this.classes.hours}>
                {cinemas &&
                  cinemas.map(cinema => {
                    return (
                      <div className={this.classes.item}>
                        <a
                          href={`${this.URI_BASE}/peliculas/${cinema.url}${
                            this.WEBSITE_PARAM
                          }`}
                          className={this.classes.cinema}>
                          {cinema.nombre}
                        </a>
                        <p className={this.classes.text}>
                          {cinema.direccion}
                        </p>
                        <p className={this.classes.text}>
                          {cinema.horario}
                        </p>
                      </div>
                    )
                  })}
              </div>
              <a
                href={`${this.URI_BASE}${this.WEBSITE_PARAM}`}
                className={this.classes.more}>
                <p className={this.classes.button}>Regresar</p>
              </a>
            </div>
            <div className={this.classes.rightSide}>
              <p
                className={`${this.classes.name} ${
                  this.classes.name
                }--sinopsis`}>
                Sinopsis:
                <br />
                <span className={this.classes.value}>{body}</span>
              </p>
              <p className={this.classes.name}>
                País:
                <br />
                <span className={this.classes.value}>{pais}</span>
              </p>
              <p className={this.classes.name}>
                Director:
                <br />
                <span className={this.classes.value}>{director}</span>
              </p>
              <p className={this.classes.name}>
                Actores:
                <br />
                <span className={this.classes.value}>{actores}</span>
              </p>
              <p className={this.classes.name}>
                Duración:
                <br />
                <span className={this.classes.value}>{duracion}</span>
              </p>
              <p className={this.classes.name}>
                Calificación:
                <br />
                <span className={this.classes.value}>{calificacion}</span>
              </p>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default MoviesDetails
