import React from 'react'
import Form from './form'
import Confirmation from './confirmation'

const classes = {
  newsletter: `newsletter flex flex-col-reverse items-center lg:justify-between lg:flex-row`,
  boxSuscripcion: `newsletter__box-suscription pr-40 pl-40 primary-font lg:p-0 lg:pr-15 lg:pl-15`,
  errorMessage: 'newsletter__error-message block pt-5 text-xs',
  errorMessageMedium: 'text-lg mb-20',
  bannerImage: 'newsletter__banner-image w-full lg:w-inherit',
  imageContainer: `newsletter__image-container bg-white overflow-hidden text-center border-solid border-gray lg:h-inherit`,
  image: 'newsletter__image lg:w-full',
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
