import React, { Fragment } from 'react'

export const Newsletter = props => {
  const { image, banner, hasBanner, confirmRegister, formMessage } = props

  const bannerHtml = hasBanner ? (
    <div className="newsletter__banner">
      <img src={banner} alt="banner" />
    </div>
  ) : (
    ''
  )

  const formMsg = !confirmRegister ? (
    <h4 className="newsletter__error-message newsletter__error-message--font-medium">
      {formMessage}
    </h4>
  ) : (
    ''
  )

  const formHtml = confirmRegister ? (
    <ConfirmNewsletter {...props} />
  ) : (
    <FormNewsletter {...props} />
  )

  return (
    <div className="newsletter">
      <div className="newsletter__box-suscription">
        {formMsg}
        {bannerHtml}
        {formHtml}
      </div>
      <div className="newsletter__image">
        <img src={image} alt="newsletter" />
      </div>
    </div>
  )
}

export const FormNewsletter = props => {
  const {
    description,
    urlTos,
    urlPrivacyPolicies,
    features,
    validation,
    submitForm,
  } = props

  const errorEmailHtml =
    validation.email.hasError() && submitForm ? (
      <div className="newsletter__error-message">
        {validation.email.message()}
      </div>
    ) : (
      ''
    )

  const errorTosHtml =
    validation.tos.hasError() && submitForm ? (
      <div className="newsletter__error-message">
        {validation.tos.message()}
      </div>
    ) : (
      ''
    )
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
          {errorEmailHtml}
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
          {errorTosHtml}
        </div>
      </form>
    </Fragment>
  )
}

export const ConfirmNewsletter = props => {
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

export default Newsletter
