import React, { Component } from 'react';

class CardEditorial extends Component {
	render() {
		return (
      <div className="card-editorial">
        <div className="card-editorial__wrapper">
          <h4 className="card-editorial__grupo">Editorial</h4>
          <h2>
            <a className="card-editorial__name" href="/">
              EDITORIAL: ORDEN EN LA DESPENSA
            </a>
          </h2>
          <div className="card-editorial__description">
            <div className="card-editorial__box-image">
              <a href="/"><img
                className="card-editorial__image"
                src="https://img.elcomercio.pe/files/listing_ec_opinion_destaques/uploads/2017/03/30/58dd6e97888c2.png"
                alt="image"
							/></a>
            </div>
            <div className="card-editorial__box-detail">
              <p className="card-editorial__title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dolorum iure, aliquam inventore possimus aspernatur unde dicta rem? Quasi odio labore.
              </p>
            </div>
          </div>
          <div className="card-editorial__social">
            <a href="/" className="card-editorial__icono">
              <span>f</span>
            </a>
            <a href="/" className="card-editorial__icono">
              <span>t</span>
            </a>
          </div>
        </div>
      </div>
    )
	}
}

export default CardEditorial