/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'

class MoviesList extends Component {
	constructor(...props){
		super(...props)

		this.billboardFormat = new BillboardFormat()
		
		this.state = {
			movies: [],
			cinema: []
		}
	}

	componentDidMount(){
		const { data } = this.props
		const { params: { cinema } } = this.props
		this.billboardFormat.setData = data
		const { cinemaList } = this.billboardFormat
		const cine = cinemaList.find(itemCine => itemCine.url === cinema)
		const peliculas = cine
		
		this.setState({ 
			cinema: cine,
			movies: peliculas
		 })

	}

	render() {
		const { movies, cinema } = this.state
		const moviesInCinema = movies && movies.peliculas
		return (
			<div className="movie-list">
				<div className="movie-list__top">
					<h1 className="movie-list__cinema">
						{ cinema && cinema.nombre }
					</h1>
					<h3 className="movie-list__address">
						{ cinema && cinema.direccion }
					</h3>
				</div>
				<div className="movie-list__box">
				{ moviesInCinema && moviesInCinema.map(movie => {
					return (
            <div className="movie-item">
              <div className="movie-item__left">
								<a href={`/cartelera/${movie.url}/${cinema.url}`} className="movie-item__box-image">
                  <img
										src={movie.poster.sizes['620x387']}
										alt={movie.title}
                    className="movie-item__img"
                  />
                  <h3 className="movie-item__name">
										{movie.title}
                  </h3>
                </a>
                <p className="movie-item__function">
                  {cinema.horario}
                </p>
              </div>
              <div className="movie-item__right">
                <p className="movie-item__text-black principal">
                  Sinopsis: 
                  <span className="movie-item__text-desc">
										{movie.body}
                  </span>
                </p>
                <p className="movie-item__text-black">
                  País: 
                  <span className="movie-item__text-desc">
										{movie.pais}
                  </span>
                </p>
                <p className="movie-item__text-black">
                  Director: 
                  <span className="movie-item__text-desc">
										{movie.director}
                  </span>
                </p>
                <p className="movie-item__text-black">
                  Actores: 
                  <span className="movie-item__text-desc">
										{movie.actores}
                  </span>
                </p>
                <p className="movie-item__text-black">
                  Calificación: 
                  <span className="movie-item__text-desc">
										{movie.calificacion}
                  </span>
                </p>
              </div>
            </div>
          )
				})}
				</div>
			</div>
		);
	}
}

export default MoviesList