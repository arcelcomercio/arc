import React, { Fragment } from 'react'

const classes = {
  title: 'newsletter__title',
  descripcion: 'newsletter__description',
  row: 'newsletter__row',
  email: 'newsletter__email',
  errorMessage: 'newsletter__error-message',
  textCenter: 'text-center',
  button: 'newsletter__button',
  tos: 'newsletter__tos',
}

const StaticsNewsletterChildForm = props => {
  const {
    description,
    urlTos,
    urlPrivacyPolicies,
    features,
    validation,
    submitForm,
  } = props

  return (
    <Fragment>
      <h3 className={classes.title}>
        Registrate en nuestro <span>Newsletter</span>
      </h3>
      <p className={classes.descripcion}>{description}</p>
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
          <label className={classes.tos} htmlFor="tos">
            <input
              type="checkbox"
              id="tos"
              name="tos"
              required="required"
              value="1"
              onChange={features.tos}
            />
            Acepto los{' '}
            <a href={urlTos} target="_blank" rel="noopener noreferrer">
              Términos y condiciones
            </a>{' '}
            y{' '}
            <a
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
    </Fragment>
  )
}

export default StaticsNewsletterChildForm
