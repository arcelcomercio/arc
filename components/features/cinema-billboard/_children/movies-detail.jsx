/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class MoviesDetail extends Component {
	constructor(...props){
		super(...props)

	}
	
	render() {
		return (
      <div className="movie-detail">
        <div className="movie-detail__box-img">
          <a href="/">
            <img
              src="https://cde.3.elcomercio.pe/cines/0/1/7/0/0/1700291/poster.jpg"
              alt=""
              className="movie-detail__img"
            />
          </a>
          <div className="movie-detail__box-icon">
            <span className="movie-detail__icon">V</span>
          </div>
        </div>
        <div className="movie-detail__detail">
          <div className="movie-detail__left">
            <h2 className="movie-detail__title">Capitana Marvel</h2>
            <p className="movie-detail__where">Donde Verla</p>
            <div className="movie-detail__hours">
              <a href="/" className="movie-detail__cinema">
                {' '}
                CINEPLANET MALL DEL SUR S/ 12
              </a>
              <p className="movie-detail__text">
                Av. Los Lirios Nro. 301 C.C Mall del Sur - San Juan de
                Miraflores, Lima
              </p>
              <p className="movie-detail__text">
                [E][AT] 2:45, 5:25,8:05, 10:45
              </p>
            </div>
          </div>
          <div className="movie-detail__right" />
        </div>
      </div>
    )
	}
}

export default MoviesDetail