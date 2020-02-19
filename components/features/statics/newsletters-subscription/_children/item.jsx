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
    <article role="listitem" className="author-card p-5 position-relative">
      <div className="author-card__wrapper flex flex-col items-center lg:pt-20 md:pt-20 xs:pt-20 pt-20 pb-60 md:pb-25 lg:pb-25">
        <figure className="flex flex-col items-center ">
          <img
            className="featured-story__img w-full h-full object-cover"
            src={image}
            alt={name}
          />
        </figure>
        <i className="author-card__icono icon-marca position-absolute mb-20 flex items-center justify-center" />
        <div className="author-card__detail flex flex-col items-center pt-10">
          <h3>
            <a
              class="author-card__name block mb-10 mt-5 secondary-font font-bold title-sm text-gray-300 line-h-xs text-center"
              href="#">
              {name}
            </a>
          </h3>
          <p className="card__text">{description}</p>
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
