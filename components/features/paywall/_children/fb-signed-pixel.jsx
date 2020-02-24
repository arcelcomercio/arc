/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import PropTypes from 'prop-types'
import { getContent } from 'fusion:content'

const SIGNER_CONTENT_SOURCE = 'fb-event-signer'

const FbEventTag = React.memo(({ event, ...props }) => {
  const [uri, setUri] = React.useState()
  React.useEffect(() => {
    getContent(SIGNER_CONTENT_SOURCE, {
      event,
      ...props,
    }).then(setUri)
  }, [])
  return uri ? <img src={uri} style={{ display: 'none' }} /> : null
})

export const SubscribeEventTag = ({
  subscriptionId,
  offerCode,
  value,
  currency,
}) => {
  return (
    <FbEventTag
      event="Subscribe"
      subscriptionId={subscriptionId}
      offerCode={offerCode}
      value={value}
      currency={currency}
    />
  )
}
SubscribeEventTag.propTypes = {
  subscriptionId: PropTypes.string,
  offerCode: PropTypes.string,
  value: PropTypes.number,
  currency: PropTypes.string,
}
export const LogIntoAccountEventTag = ({ subscriptionId, isSubscriber }) => {
  return (
    <FbEventTag
      event="LogIntoAccount"
      subscriptionId={subscriptionId}
      isSubscriber={isSubscriber}
    />
  )
}
LogIntoAccountEventTag.propTypes = {
  subscriptionId: PropTypes.string,
  isSubscriber: PropTypes.bool,
}
