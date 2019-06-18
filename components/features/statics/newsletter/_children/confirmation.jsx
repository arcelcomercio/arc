import React from 'react'

const classes = {
  title: `newsletter__title position-relative font-bold pb-15 title-md line-h-none`,
  descripcion: 'newsletter__description secondary-font title-sm line-h-md',
  row: 'newsletter__row mb-20',
  textCenter: 'text-center',
  button: 'newsletter__button bg-gray-300 font-bold w-full border-0 text-white',
  strong: 'newsletter__strong block font-xbold text-gray-300',
}

const StaticsNewsletterChildConfirmation = props => {
  const { features } = props
  return (
    <>
      <h3 className={classes.title}>
        ¡Muchas gracias por{' '}
        <strong className={classes.strong}>Registrarte!</strong>
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
