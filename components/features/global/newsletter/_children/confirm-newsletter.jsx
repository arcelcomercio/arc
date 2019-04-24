import React, { Fragment } from 'react'

const ConfirmNewsletter = props => {
  const { features } = props
  return (
    <Fragment>
      <h3 className="newsletter__title">
        ¡Muchas gracias por <span>Registrarte!</span>
      </h3>
      <p className="newsletter__description">
        Recibirás diariamente nuestro newsletter
      </p>
      <div className="newsletter__row text-center">
        <button
          className="newsletter__button"
          type="button"
          onClick={features.redirect}>
          Ir a la Portada
        </button>
      </div>
    </Fragment>
  )
}

export default ConfirmNewsletter
