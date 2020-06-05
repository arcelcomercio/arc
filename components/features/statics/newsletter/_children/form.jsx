import React from 'react'

const classes = {
  title: `newsletter__title position-relative font-bold pb-15 title-lg line-h-xs`,
  titleCovid19: `newsletter__title--covid19`,
  description: 'newsletter__description secondary-font title-sm line-h-xs',
  row: 'newsletter__row mb-20',
  email:
    'newsletter__email w-full pr-15 pl-15 text-md border-1 border-solid border-gray',
  errorMessage: 'newsletter__error-message block pt-5 text-xs',
  textCenter: 'text-center',
  button: 'newsletter__button bg-gray-300 font-bold w-full border-0 text-white',
  policies: 'newsletter__policies font-bold cursor-pointer text-sm',
  pageLink: 'newsletter__page-link text-gray-300',
  inputCheckbox: 'newsletter__input-checkbox mr-10',
  covid19: 'newsletter__covid19 mb-50',
}

const StaticsNewsletterChildForm = props => {
  const {
    description,
    urlTos,
    urlPrivacyPolicies,
    features,
    validation,
    submitForm,
    isActiveApiCovid19,
  } = props

  return (
    <>
      <h3 itemProp="name"
        className={`${classes.title} ${isActiveApiCovid19 &&
          classes.titleCovid19}`}>
        Regístrate en nuestro <span>Newsletter</span>
      </h3>
      {isActiveApiCovid19 && (
        <h4 itemProp="name" className={classes.covid19}>Coronavirus al día</h4>
      )}
      <p className={classes.description}>{description}</p>
      <form action="">
        <div className={classes.row}>
          <input
            className={classes.email}
            type="text"
            name="email"
            placeholder="Correo electrónico*"
            required="required"
            onChange={features.email}
          />
          {validation.email.hasError() && submitForm && (
            <div className={classes.errorMessage}>
              {validation.email.message()}
            </div>
          )}
        </div>
        <div className={`${classes.row} ${classes.textCenter}`}>
          <button
            className={classes.button}
            type="submit"
            onClick={features.save}>
            Enviar
          </button>
        </div>
        <div className={classes.row}>
          <label className={classes.policies} htmlFor="tos">
            <input
              type="checkbox"
              id="tos"
              name="tos"
              required="required"
              value="1"
              className={classes.inputCheckbox}
              onChange={features.tos}
            />
            Acepto los{' '}
            <a
              className={classes.pageLink}
              href={urlTos}
              target="_blank"
              rel="noopener noreferrer">
              Términos y condiciones
            </a>{' '}
            y{' '}
            <a
              className={classes.pageLink}
              href={urlPrivacyPolicies}
              target="_blank"
              rel="noopener noreferrer">
              Políticas de privacidad
            </a>
          </label>
          {validation.tos.hasError() && submitForm && (
            <div className={classes.errorMessage}>
              {validation.tos.message()}
            </div>
          )}
        </div>
      </form>
    </>
  )
}

export default StaticsNewsletterChildForm
