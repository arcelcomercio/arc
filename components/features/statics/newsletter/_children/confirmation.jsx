import React from 'react'
import Fonts from './fonts'

const classes = {
  title: `newsletter__title position-relative font-bold pb-15 title-md line-h-none`,
  titleConfirmation: 'newsletter__title--confirmation',
  titleCovid19: `newsletter__title--covid19`,
  description: 'newsletter__description secondary-font title-sm line-h-md',
  row: 'newsletter__row mb-20',
  textCenter: 'text-center',
  button: 'newsletter__button bg-gray-300 font-bold w-full border-0 text-white',
  strong: 'newsletter__strong block font-xbold text-gray-300',
  confirmation: 'newsletter__confirmation flex justify-between',
  confirmationDesc: 'newsletter__confirmationDesc',
  confirmationTitle: 'newsletter__confirmationTitle',
  confirmationSubtitle: 'newsletter__confirmationSubtitle',
  confirmationButton: 'newsletter__confirmationButton',
  confirmationTextWrapper: 'newsletter__confirmationTextWrapper'
}

const StaticsNewsletterChildConfirmation = props => {
  const { features, isActiveApiCovid19, arcSite } = props
  return (
    <>
      {arcSite === 'trome' ? (
        <>
          <Fonts />
          <div className={classes.confirmation}>
            <div className={classes.confirmationTextWrapper}>
              <h3
                itemProp="name"
                className={`${classes.title} ${classes.confirmationTitle}`}>
                ¡Gracias!
          </h3>
              <p itemProp="description" className={classes.confirmationSubtitle}>
                Por acompañarnos a tomar un café con nosotros.
          </p>
              <p className={classes.confirmationDesc}>
                Recibirás uno lleno de noticias diariamente.
          </p>
              <button
                className={`${classes.button} ${classes.confirmationButton}`}
                type="button"
                onClick={features.redirect}>
                Ir a la Portada
          </button>
            </div>
            <img className={`${classes.subImage}`} src="https://cdna.trome.pe/resources/dist/trome/images/cup_1.svg?d=1" alt="cafe de noticias taza" />
          </div>
        </>) : (
        <>
          <h3
            itemProp="name"
            className={`${classes.title} ${classes.titleConfirmation
              } ${isActiveApiCovid19 && classes.titleCovid19}`}>
            ¡Muchas gracias por{' '}
            <strong className={classes.strong}>Registrarte!</strong>
          </h3>
          <p itemProp="description" className={classes.description}>
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
      )}</>
  )
}

export default StaticsNewsletterChildConfirmation
