import React from 'react'
import Button from '../../../../../global-components/button'

const classes = {
  btnSuscription: `flex items-center btn nav__btn text-gray-200 lg:flex btn btn--blue btn-lg btn-bg`,
}

const IntroPaywall = props => {
  return (
    <div className="">
      <div className="price">
        <i>s/</i>29
      </div>
      <div className="detail-price uppercase">
        <p>
          <strong>
            / Al mes <br />
            por 6 meses
          </strong>
        </p>
        <p> Luego S/39 cada mes</p>
      </div>
      <h3 className="title-line uppercase text-center mt-40 mb-40">
        Beneficios
      </h3>
      <ul className="list-benefits mb-20">
        <li>
          Acceso a contenido exclusivo en gestion.pe y navegación ilimitada
          desde todos los dispositivos
        </li>
      </ul>
      <Button btnClass={classes.btnSuscription} btnText="Suscríbete" />
      <p className="text-center mt-20 mb-20 text-sm">Si eres suscriptor del diario impreso,<br/> descubre tu descuento</p>
    </div>
  )
}

export default IntroPaywall
