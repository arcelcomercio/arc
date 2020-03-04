/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import { interpolateUrl } from '../_dependencies/domains'

const SIGNER_CONTENT_SOURCE = 'fb-event-signer'

const FbEventTag = React.memo(({ event, onBeforeSend = i => i, ...props }) => {
  const content = useContent({
    source: SIGNER_CONTENT_SOURCE,
    query: {
      event,
      ...props,
    },
  })
  if (content && props.debug) {
    console.log(`SignedUri: ${content.uri}`)
  }
  if (content) onBeforeSend(content)
  return content && content.uri ? (
    <img src={content.uri} style={{ display: 'none' }} />
  ) : null
})

export const SubscribeEventTag = ({
  debug,
  onBeforeSend,
  subscriptionId,
  offerCode,
  value,
  currency,
}) => {
  return (
    <FbEventTag
      debug={debug}
      onBeforeSend={onBeforeSend}
      event="Subscribe"
      subscription_id={subscriptionId}
      offer_code={offerCode}
      value={value}
      currency={currency}
    />
  )
}
SubscribeEventTag.propTypes = {
  debug: PropTypes.bool,
  subscriptionId: PropTypes.string.isRequired,
  offerCode: PropTypes.string,
  value: PropTypes.number,
  currency: PropTypes.string,
}
export const LogIntoAccountEventTag = ({
  subscriptionId,
  debug,
  onBeforeSend,
}) => {
  const {
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()

  const url = interpolateUrl(`${urls.originApi}${urls.arcEntitlements}`)
  const accessToken = window.Identity.userIdentity.accessToken

  return (
    <FbEventTag
      debug={debug}
      onBeforeSend={onBeforeSend}
      event="LogIntoAccount"
      accessToken={accessToken}
      entitlementsUrl={url}
      subscription_id={subscriptionId}
    />
  )
}
LogIntoAccountEventTag.propTypes = {
  debug: PropTypes.bool,
  subscriptionId: PropTypes.string.isRequired,
}
