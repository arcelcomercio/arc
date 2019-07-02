import React from 'react'

const Footer = props => {
  const { position } = props // center || right

  return (
    <div className={`footer ${position === 'right' ? 'right' : ''}`}>
      <p className="footer__text">
        Con tu registro puedes navegar en los siguientes sitios:
      </p>
      <div className="footer__logo">
        <img src="" alt="" />|
      </div>
    </div>
  )
}

export default Footer
