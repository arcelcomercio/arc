import React from 'react'
import Form from './form'
import Confirmation from './confirmation'

const classes = {
  newsletter: 'newsletter flex flex-col-reverse items-center',
  boxSuscripcion: 'newsletter__box-suscription pr-40 pl-40',
  errorMessage: 'newsletter__error-message block pt-5',
  errorMessageMedium: 'newsletter__error-message--font-medium',
  bannerImage: 'newsletter__banner-image w-full',
  imageContainer: 'newsletter__image-container overflow-hidden text-center',
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
          <div>
            <img src={banner} alt="banner" className={classes.bannerImage} />
          </div>
        )}
        {formHtml}
      </div>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={image} alt="newsletter" />
      </div>
    </div>
  )
}

export default Newsletter
