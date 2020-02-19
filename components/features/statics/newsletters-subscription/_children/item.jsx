import React from 'react'
import PropTypes from 'prop-types'

const NewslettersSubscriptionItem = ({
  name,
  image,
  code,
  description,
  isSubscribed = false,
  callbackSubscription,
}) => {
  return (
    <article role="listitem" className="newsletters-subscription__item p-5">
      <div className="newsletters-subscription__card flex flex-col items-center pl-10 pr-10 lg:pt-20 md:pt-20 xs:pt-20 pt-20 pb-20 md:pb-25 lg:pb-25">
        <figure className="newsletters-subscription__figure w-full flex flex-col items-center position-relative">
          <img className="w-full h-full object-cover" src={image} alt={name} />
          <i className="newsletters-subscription__icono icon-marca position-absolute bottom-0 flex items-center justify-center rounded" />
        </figure>
        <div className="newsletters-subscription__detail w-full flex flex-col items-center pt-10">
          <h3>
            <a
              class="newsletters-subscription__name block mb-10 mt-5 primary-font font-bold  text-gray-300 text-center"
              href="#">
              {name}
            </a>
          </h3>
          <p className="newsletters-subscription__description card__text">
            {description}
          </p>
          {isSubscribed ? (
            <button
              type="button"
              onClick={() => callbackSubscription(code)}
              className="link-suscribe mt-15">
              Desuscribirme
            </button>
          ) : (
            <button
              type="button"
              onClick={() => callbackSubscription(code)}
              className="link-suscribe mt-15">
              Suscribirme
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

NewslettersSubscriptionItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default NewslettersSubscriptionItem
