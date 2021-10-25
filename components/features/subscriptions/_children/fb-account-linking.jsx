/* eslint-disable jsx-a11y/alt-text */
import Identity from '@arc-publishing/sdk-identity'
import { useContent } from 'fusion:content'
import PropTypes from 'prop-types'
import * as React from 'react'

import { extendSession } from '../../../utilities/subscriptions/identity'

const SIGNER_CONTENT_SOURCE = 'fb-event-signer'

const FbEventTag = React.memo(
  ({ event, onBeforeSend = (i) => i, ...props }) => {
    const content = useContent({
      source: SIGNER_CONTENT_SOURCE,
      query: {
        event,
        ...props,
      },
    })
    if (content && props.debug) {
      if (typeof window !== 'undefined') {
        window.console.log(`SignedUri: ${content?.uri}`)
      }
    }
    if (content) onBeforeSend(content)

    // if (content && content.uri) {
    //   const divLog = window.document.getElementById('divLog')
    //   if (divLog) {
    //     divLog.innerHTML = ` URL PIXEL: ${content.uri}`
    //   }
    // }

    return content?.uri ? (
      <img src={content.uri} style={{ display: 'none' }} />
    ) : null
  }
)

export const SubscribeEventTag = ({
  debug = false,
  onBeforeSend = (i) => i,
  subscriptionId,
  offerCode,
  value,
  currency,
}) => (
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

SubscribeEventTag.propTypes = {
  debug: PropTypes.bool,
  subscriptionId: PropTypes.string.isRequired,
  offerCode: PropTypes.string,
  value: PropTypes.number,
  currency: PropTypes.string,
}

export const LogIntoAccountEventTag = ({
  subscriptionId,
  debug = false,
  onBeforeSend = (content) => content,
}) => {
  const [accessToken, setAccessToken] = React.useState()

  React.useEffect(() => {
    Identity.isLoggedIn().then((resLog) => {
      if (resLog) {
        extendSession().then(({ accessToken: token }) => {
          setAccessToken(token)
        })
      }
    })
  }, [])

  return accessToken ? (
    <FbEventTag
      debug={debug}
      onBeforeSend={onBeforeSend}
      event="LogIntoAccount"
      accessToken={accessToken}
      subscription_id={subscriptionId}
    />
  ) : null
}

LogIntoAccountEventTag.propTypes = {
  debug: PropTypes.bool,
  subscriptionId: PropTypes.string.isRequired,
}
