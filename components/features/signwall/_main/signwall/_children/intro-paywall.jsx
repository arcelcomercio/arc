import React from 'react'
import Button from '../../../../../global-components/button'

const classes = {
  btnSuscription: `flex items-center btn nav__btn text-gray-200 lg:flex btn btn--blue btn-md btn-bg`,
}

const IntroPaywall = props => {
  return (
    <div className="benefits">
      s/29 / Al mes por 6 meses Luego S/39 cada mes
      <h3>Beneficios</h3>
      <ul>
        <li>
          Acceso a contenido exclusivo en gestion.pe y navegación ilimitada
          desde todos los dispositivos
        </li>
      </ul>
      <Button btnClass={classes.btnSuscription} btnText="Suscríbete" />
      <p>Si eres suscriptor del diario impreso, descubre tu descuento</p>
    </div>
  )
}

export default IntroPaywall
