import React from 'react'
import { Gestion, Comercio } from './iconos'

const Footer = props => {
  const { position } = props // center || right

  return (
    <div className={`footer ${position === 'right' ? 'right' : ''}`}>
      <p className="footer__text">
        Con tu registro puedes navegar en los siguientes sitios:
      </p>
      <div
        className="footer__logo" /** TODO: necesita logo o logo-container? */
      >
        <Comercio color="white" width="80" height="16" size="2" />
        |
        <Gestion color="white" width="80" height="16" size="2" />
      </div>
    </div>
  )
}

export default Footer
