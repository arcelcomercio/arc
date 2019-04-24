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
    name: 'movie-details__name movie-details__text',
    value: 'movie-details__value',
  }

  constructor(props) {
    super(props)

    this.billboardFormat = new BillboardFormat()

    this.state = {
      movie: {},
      cinema: [],
    }

    const { arcSite } = props
    this.WEBSITE_PARAM = `?_website=${arcSite}`
  }

  componentDidMount() {
    const { data, movie, cinema } = this.props
    this.billboardFormat.setData = data
    const { moviesList } = this.billboardFormat
    const matchedMovie =
      moviesList.find(itemMovie => itemMovie.url === movie) || {}

    if (cinema === 'cines') {
      this.setState({ cinema: matchedMovie.cines })
    } else {
      const filteredCinemas = matchedMovie.cines.find(
        itemCine => itemCine.url === cinema
      )
      const orderedCinemas = [{ ...filteredCinemas }]

      this.setState({ cinema: orderedCinemas })
    }

    this.setState({
      movie: matchedMovie,
    })
  }

  render() {
    const { contextPath } = this.props
    const { cinema, movie } = this.state
    const {
      poster: { sizes = {} } = {},
      portada_e: { description = '' } = {},
      title = '',
      body = '',
      pais = '',
      director = '',
      actores = '',
      calificacion = '',
    } = movie

    return (
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
              {cinema &&
                cinema.map(cine => {
                  return (
                    <div className={this.classes.item}>
                      <a
                        href={`${contextPath}/cartelera/peliculas/${cine.url}${
                          this.WEBSITE_PARAM
                        }`}
                        className={this.classes.cinema}>
                        {cine.nombre}
                      </a>
                      <p className={this.classes.text}>{cine.direccion}</p>
                      <p className={this.classes.text}>{cine.horario}</p>
                    </div>
                  )
                })}
            </div>
            <a href={contextPath} className={this.classes.more}>
              <p className={this.classes.button}>Ver Más</p>
            </a>
          </div>
          <div className={this.classes.rightSide}>
            <p
              className={`${this.classes.name} ${this.classes.name}--sinopsis`}>
              Sinopsis:
              <br />
              <span className={this.classes.value}>{body}</span>
            </p>
            <p className={this.classes.name}>
              Pais:
              <br />
              <span className={this.classes.value}>{pais}</span>
            </p>
            <p className={this.classes.name}>
              Director:
              <br />
              <span className={this.classes.value}>{director}</span>
            </p>
            <p className={this.classes.name}>
              Actor:
              <br />
              <span className={this.classes.value}>{actores}</span>
            </p>
            <p className={this.classes.name}>
              Calificacion:
              <br />
              <span className={this.classes.value}>{calificacion}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MoviesDetails
