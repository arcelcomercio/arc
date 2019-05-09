import React from 'react'
import Form from './form'
import Confirmation from './confirmation'

const classes = {
  newsletter: 'newsletter',
  boxSuscripcion: 'newsletter__box-suscription',
  errorMessage: 'newsletter__error-message',
  errorMessageMedium: 'newsletter__error-message--font-medium',
  banner: 'newsletter__banner',
  bannerimage: 'newsletter__banner-image',
  image: 'newsletter__image',
}
const Newsletter = props => {
  const { image, banner, hasBanner, confirmRegister, formMessage } = props

  const formHtml = confirmRegister ? (
    <Confirmation {...props} />
  ) : (
    <Form {...props} />
  )

  return (
    <div className={classes.newsletter}>
      <div className={classes.boxSuscripcion}>
        {!confirmRegister && (
          <h4
            className={`${classes.errorMessage} ${classes.errorMessageMedium}`}>
            {formMessage}
          </h4>
        )}
        {hasBanner && (
          <div className={classes.banner}>
            <img
              src={banner}
              alt="banner"
              className={`${classes.banner} ${classes.bannerimage}`}
            />
          </div>
        )}
        {formHtml}
      </div>
      <div className={classes.image}>
        <img src={image} alt="newsletter" />
      </div>
    </div>
  )
}

export default Newsletter
