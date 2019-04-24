/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'


class MoviesDetail extends Component {
	constructor(...props){
    super(...props)
    
    this.billboardFormat = new BillboardFormat()

    this.state = {
      movie: {},
      cinema: []
    }

  }
  
  componentDidMount(){
    const { data, movie, cinema } = this.props
    this.billboardFormat.setData = data
    const { moviesList } = this.billboardFormat
    const pelicula = moviesList.find(itemMovie => itemMovie.url === movie)

    if(cinema === 'cines'){
      this.setState({ cinema: pelicula.cines })
    } else {
     
      const cine = pelicula.cines.find(
        itemCine => itemCine.url === cinema
      )
      const nuevoCine = [{...cine}]
      this.setState({ cinema: nuevoCine})
    }

    this.setState({
      movie: pelicula
    })
  }
	
	render() {
    const { cinema, movie } = this.state
    const pelicula = movie || {}
    const {
      poster: { sizes = {} } = {},
      portada_e: { description = '' }  = {},
      title = '',
      body = '',
      pais = '',
      director = '',
      actores = '',
      calificacion = '',
    } = pelicula

		return (
      <div className="movie-detail">
        <div className="movie-detail__box-img">
          <a href={description}>
            <img
              src={sizes['620x387']}
              alt={title}
              className="movie-detail__img"
            />
          </a>
          <div className="movie-detail__box-icon">
            <span className="movie-detail__icon">V</span>
          </div>
        </div>
        <div className="movie-detail__detail">
          <div className="movie-detail__left">
            <h2 className="movie-detail__title">{title}</h2>
            <p className="movie-detail__where">Donde Verla</p>
            <div className="movie-detail__hours">
              {cinema &&
                cinema.map(cine => {
                  return (
                    <div className="movie-detail__item">
                      <a
                        href={`/cartelera/peliculas/${cine.url}`}
                        className="movie-detail__cinema">
                        {cine.nombre}
                      </a>
                      <p className="movie-detail__text">{cine.direccion}</p>
                      <p className="movie-detail__text">{cine.horario}</p>
                    </div>
                  )
                })}
            </div>
            <a href="/" className="movie-detail__more">
              <p className="movie-detail__btn">Ver Mas</p>
            </a>
          </div>
          <div className="movie-detail__right">
            <p className="movie-detail__name movie-detail__name--sinopsis">
              Sinopsis:
              <span className="movie-detail__value">{body}</span>
            </p>
            <p className="movie-detail__name">
              Pais:
              <span className="movie-detail__value">{pais}</span>
            </p>
            <p className="movie-detail__name">
              Director:
              <span className="movie-detail__value">{director}</span>
            </p>
            <p className="movie-detail__name">
              Actor:
              <span className="movie-detail__value">{actores}</span>
            </p>
            <p className="movie-detail__name">
              Calificacion:
              <span className="movie-detail__value">{calificacion}</span>
            </p>
          </div>
        </div>
      </div>
    )
	}
}

export default MoviesDetail