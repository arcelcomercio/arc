/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class MoviesList extends Component {
	constructor(...props){
		super(...props)
	}

	render() {
		return (
			<div className="movie-list">
				<div className="movie-list__top">
					<h1 className="movie-list__cinema">
						CINE STAR EXCELSIOR S/ 7,50
					</h1>
					<h3 className="movie-list__address">
						Jirón de la Unión 780, Lima, Teléf. 426-3547
					</h3>
				</div>
				<div className="movie-list__box">
					<div className="movie-item">
						<div className="movie-item__left">
							<a href="/" className="movie-item__box-image">
								<img
									src="https://cde.3.elcomercio.pe/cines/0/1/7/0/1/1701023/poster.jpg"
									alt=""
									className="movie-item__img"
								/>
								<h3 className="movie-item__name">
									Pajaritos a volar
								</h3>
							</a>
							<p className="movie-item__function">
								[AT][E] 2:15, 4:00, 5:45
							</p>
						</div>
						<div className="movie-item__right">
							<p className="movie-item__text-black principal">
								Sinopsis:
								<span className="movie-item__text-desc">
									El pequeño y veloz Manou crece creyendo que es una
									gaviota, como sus padres. Pero a pesar de que se
									esfuerza por nadar, pescar y volar, no es muy hábil.
									Cuando se da cuenta de que no es como los otros miembros
									de su familia, emprende una asombrosa aventura para
									descubrir su verdadero origen,
								</span>
							</p>
							<p className="movie-item__text-black">
								País:
								<span className="movie-item__text-desc">Alemania</span>
							</p>
							<p className="movie-item__text-black">
								Director:
								<span className="movie-item__text-desc">
									Andrea Block, Christian Haas
								</span>
							</p>
							<p className="movie-item__text-black">
								Actores:
								<span className="movie-item__text-desc">animación</span>
							</p>
							<p className="movie-item__text-black">
									Calificación:
                  <span className="movie-item__text-desc">
										Calificación
                  </span>
								</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MoviesList