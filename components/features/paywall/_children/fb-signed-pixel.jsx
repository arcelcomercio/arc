/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'

const SIGNER_CONTENT_SOURCE = 'fb-event-signer'

const FbEventTag = ({ event, ...props }) => {
  const content = useContent({
    source: SIGNER_CONTENT_SOURCE,
    query: {
      event,
      ...props,
    },
  })
  return content && content.uri ? (
    <img src={content.uri} style={{ display: 'none' }} />
  ) : null
}

export const SubscribeEventTag = ({
  subscriptionId,
  offerCode,
  value,
  currency,
}) => {
  return (
    <FbEventTag
      event="Subscribe"
      subscription_id={subscriptionId}
      offer_code={offerCode}
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
      subscription_id={subscriptionId}
      is_subscriber={isSubscriber}
    />
  )
}
LogIntoAccountEventTag.propTypes = {
  subscriptionId: PropTypes.string,
  isSubscriber: PropTypes.bool,
}
