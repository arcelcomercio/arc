import React, { Component } from 'react';

class CardAutor extends Component {
	render() {
		return (
      <div className="card-autor">
        <div className="card-autor__wrapper">
          <div className="card-autor__box-image">
            <img
              className="card-autor__image"
              src="https://img.elcomercio.pe/files/listing_ec_opinion_destaques/uploads/2017/03/30/58dd6e97888c2.png"
              alt="image"
            />
          </div>
          <div className="card-autor__box-detail">
            <h2>
              <a className="card-autor__name" href="/">
                Fernando Vivas
              </a>
            </h2>
            <p className="card-autor__grupo">Rincon del Autor</p>
            <h2>
              <a className="card-autor__title" href="/">
                No acosen a Salvador, por Fenando Vivas
              </a>
            </h2>
            <div className="card-autor__social">
              <a href="/" className="card-autor__icono">
                <span>f</span>
              </a>
              <a href="/" className="card-autor__icono">
                <span>t</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
	}
}

export default CardAutor;