import React from 'react'
import FormNewsletter from './form-newsletter'
import ConfirmNewsletter from './confirm-newsletter'

export const Newsletter = props => {
  const { image, banner, hasBanner, confirmRegister, formMessage } = props

  const formHtml = confirmRegister ? (
    <ConfirmNewsletter {...props} />
  ) : (
    <FormNewsletter {...props} />
  )

  return (
    <div className="newsletter">
      <div className="newsletter__box-suscription">
        {!confirmRegister && (
          <h4 className="newsletter__error-message newsletter__error-message--font-medium">
            {formMessage}
          </h4>
        )}
        {hasBanner && (
          <div className="newsletter__banner">
            <img src={banner} alt="banner" />
          </div>
        )}
        {formHtml}
      </div>
      <div className="newsletter__image">
        <img src={image} alt="newsletter" />
      </div>
    </div>
  )
}

export default Newsletter
