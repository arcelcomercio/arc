/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import { interpolateUrl } from '../_dependencies/domains'

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
export const LogIntoAccountEventTag = ({ subscriptionId }) => {
  const [subscriptions, setSubscriptions] = React.useState()
  const {
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()

  React.useEffect(() => {
    const url = interpolateUrl(`${urls.originApi}${urls.arcEntitlements}`)
    const accessToken = window.Identity.userIdentity.accessToken
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    }).then(res => {
      if (res.skus) {
        const result = Object.keys(res.skus).map(key => {
          return res.skus[key].sku
        })
        setSubscriptions(result)
      }
    })
  }, [])

  return subscriptions ? (
    <FbEventTag
      event="LogIntoAccount"
      subscription_id={subscriptionId}
      is_subscriber={subscriptions.length > 0}
    />
  ) : null
}
LogIntoAccountEventTag.propTypes = {
  subscriptionId: PropTypes.string,
  isSubscriber: PropTypes.bool,
}
