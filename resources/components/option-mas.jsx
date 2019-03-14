import React, { Component } from 'react';

class BarraAutor extends Component {
	render() {
		return (
      <div className="barra-autor">
        <div className="barra-autor__wrapper">
          <div className="barra-autor__social">
            <span className="barra-autor__fecha movil">13.03.2019</span>
            <div className="barra-autor__icons">
              <a href="/">t</a>
              <a href="/">f</a>
            </div>
          </div>
          <div className="barra-autor__content">
            <div className="barra-autor__box-image">
              <a href="/" className="barra-autor__image">
                <img
                  src="https://img.elcomercio.pe/files/listing_ec_opinion_mas_opiniones/uploads/2018/03/22/5ab39c03d227a.png"
                  alt="autor"
                />
              </a>
            </div>
            <div className="barra-autor__box-desc">
              <span className="barra-autor__fecha">13.03.2019</span>
              <h2>
                <a href="/" className="barra-autor__name">
                  Hugo Neira
                </a>
              </h2>
              <p>
                <a href="/" className="barra-autor__subtitle">
                  Choferes amistosos o filósofos inesperados, por Hugo Neira
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
	}
}

export default BarraAutor;