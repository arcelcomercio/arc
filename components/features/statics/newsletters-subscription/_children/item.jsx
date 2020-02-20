import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  item: 'newsletters-subscription__item p-5',
  card:
    'newsletters-subscription__card flex flex-col items-center pl-10 pr-10 md:pt-20 xs:pt-20 pt-20 pb-20 md:pb-20',
  figure:
    'newsletters-subscription__figure w-full flex flex-col items-center position-relative',
  image: 'w-full h-full object-cover',
  icon:
    'newsletters-subscription__icono icon-marca position-absolute bottom-0 flex items-center justify-center rounded',
  detail:
    'newsletters-subscription__detail w-full flex flex-col items-center justify-between pt-10',
  titleText: 'newsletters-subscription__title-text text-center mb-10 mt-5',
  titleSpan:
    'newsletters-subscription__title-span  primary-font font-bold text-gray-300',
  description: 'newsletters-subscription__description',
  btn: 'newsletters-subscription__btn mt-15',
  btnSubscribed:
    'newsletters-subscription__btn newsletters-subscription__btn--subscribed mt-15',
}

const NewslettersSubscriptionItem = ({
  name,
  image,
  code,
  description,
  isSubscribed = false,
  callbackSubscription,
}) => {
  return (
    <article role="listitem" className={classes.item}>
      <div className={classes.card}>
        <figure className={classes.figure}>
          <img className={classes.image} src={image} alt={name} />
          <i className={classes.icon} />
        </figure>
        <div className={classes.detail}>
          <h3 className={classes.titleText}>
            <span className={classes.titleSpan}>{name}</span>
          </h3>
          <p className={classes.description}>{description}</p>
          {isSubscribed ? (
            <button
              type="button"
              onClick={() => callbackSubscription(code)}
              className={classes.btnSubscribed}>
              Desuscribirme
            </button>
          ) : (
            <button
              type="button"
              onClick={() => callbackSubscription(code)}
              className={classes.btn}>
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
