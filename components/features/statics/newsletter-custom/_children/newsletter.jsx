import React from 'react'
import Form from './form'
import Confirmation from './confirmation'

const classes = {
  newsletter: `newsletter__custom flex flex-col-reverse items-center lg:justify-between lg:justify-center`,
  boxSubscription: `newsletter__box-subscription pr-40 pl-40 primary-font p-25`,
  errorMessage: 'newsletter__error-message block pt-5 text-xs',
  errorMessageMedium: 'text-lg mb-20',
  bannerImage: 'newsletter__banner-image w-full lg:w-inherit',
  image: 'newsletter__image lg:w-full',
}
const Newsletter = props => {
  const { confirmRegister, formMessage } = props

  const formHtml = confirmRegister ? (
    <Confirmation {...props} />
  ) : (
    <Form {...props} />
  )

  return (
    <div className={classes.newsletter}>
      <div className={classes.boxSubscription}>
        {!confirmRegister && (
          <h4
            itemProp="name"
            className={`${classes.errorMessage} ${classes.errorMessageMedium}`}>
            {formMessage}
          </h4>
        )}
        {formHtml}
      </div>
    </div>
  )
}

export default Newsletter
