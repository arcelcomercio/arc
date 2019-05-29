import React from 'react'

const classes = {
  title: 'newsletter__title',
  descripcion: 'newsletter__description',
  row: 'newsletter__row',
  textCenter: 'text-center',
  button: 'newsletter__button',
}

const StaticsNewsletterChildConfirmation = props => {
  const { features } = props
  return (
    <>
      <h3 className={classes.title}>
        ¡Muchas gracias por <span>Registrarte!</span>
      </h3>
      <p className={classes.descripcion}>
        Recibirás diariamente nuestro newsletter
      </p>
      <div className={`${classes.row} ${classes.textCenter}`}>
        <button
          className={classes.button}
          type="button"
          onClick={features.redirect}>
          Ir a la Portada
        </button>
      </div>
    </>
  )
}

export default StaticsNewsletterChildConfirmation
