import React, { Component } from 'react';

class CardDestaqueTv extends Component {
	constructor(...props){
		super(...props)
	}
	render() {
		const datos = this.props
		console.log(datos)
		return (
      <div className="card-destaque-tv">
        <div className="card-destaque-tv__container">
          <div className="card-destaque-tv__box-title">
            <h1>
              <a href="/" className="card-destaque-tv__title">
                Berrocal: el miembro de Alianza Lima que decidió no subir al
                Fokker
              </a>
            </h1>
          </div>
          <div className="card-destaque-tv__box-sub">
            <span>
							<a href="/" className="card-destaque-tv__section">Política</a>
            </span>
            {/* <span className="card-destaque-tv__social"></span> */}
          </div>
          <div className="card-destaque-tv__box-image">
            <img
              className="card-destaque-tv__img"
              src="https://img.elcomercio.pe/files/listing_ec_seccion_comerciotv/uploads/2017/12/07/5a296ad17dd05.jpeg"
              alt="image"
            />
            <span className="card-destaque-tv__icon">V</span>
          </div>
          <div className="card-destaque-tv__tags">
            <p className="card-destaque-tv__related">Tag Relacionados:</p>
            <ul className="card-destaque-tv__list">
              <li className="card-destaque-tv__item">
                <a className="card-destaque-tv__link" href="/">
                  Alianza
                </a>
              </li>
              <li className="card-destaque-tv__item">
                <a className="card-destaque-tv__link" href="/">
                  Alianza
                </a>
              </li>
              <li className="card-destaque-tv__item">
                <a className="card-destaque-tv__link" href="/">
                  Alianza
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
	}
}

export default CardDestaqueTv;