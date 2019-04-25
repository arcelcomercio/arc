import React, { Fragment } from 'react'

const FormNewsletter = props => {
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
      <h3 className="newsletter__title">
        Registrate en nuestro <span>Newsletter</span>
      </h3>
      <p className="newsletter__description">{description}</p>
      <form action="">
        <div className="newsletter__row">
          <input
            className="newsletter__email"
            type="text"
            name="email"
            placeholder="Correo electrónico*"
            required="required"
            onChange={features.email}
          />
          {validation.email.hasError() && submitForm && (
            <div className="newsletter__error-message">
              {validation.email.message()}
            </div>
          )}
        </div>
        <div className="newsletter__row text-center">
          <button
            className="newsletter__button"
            type="submit"
            onClick={features.save}>
            Enviar
          </button>
        </div>
        <div className="newsletter__row">
          <label className="newsletter__tos" htmlFor="tos">
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
            <div className="newsletter__error-message">
              {validation.tos.message()}
            </div>
          )}
        </div>
      </form>
    </Fragment>
  )
}

export default FormNewsletter
