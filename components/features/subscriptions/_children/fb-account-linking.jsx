/* eslint-disable jsx-a11y/alt-text */
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'

import { PropertiesSite } from '../_dependencies/Properties'

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
    console.log({ content })
    if (content && props.debug) {
      if (typeof window !== 'undefined') {
        window.console.log(`SignedUri: ${content?.uri}`)
      }
    }
    if (content) onBeforeSend(content)
    return content?.uri ? (
      <img src={content.uri} style={{ display: 'none' }} />
    ) : null
  }
)

export const SubscribeEventTag = ({
  debug,
  onBeforeSend,
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
  debug,
  onBeforeSend,
}) => {
  const { arcSite } = useAppContext() || {}
  const { urls } = PropertiesSite[arcSite]
  const [accessToken, setAccessToken] = React.useState()

  React.useEffect(() => {
    window.Identity.options({ apiOrigin: urls.arcOrigin })
    window.Identity.isLoggedIn().then((resLog) => {
      if (resLog) {
        window.Identity.extendSession().then(({ accessToken: token }) => {
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

// https://www.facebook.com/tr
// ?id=1252229265121278
// &ev=LogIntoAccount
// &cd%5Bsubscription_id%5D=676dd1b1-2afd-40d7-a61d-f393102a550e
// &cd%5Barc-site%5D=elcomercio
// &cd%5Bis_subscriber%5D=true
// &noscript=1
// &eid=e30df99f-4080-4321-b7e8-26e9873104c5
// &ts=1620660496624
// &sig=WGrTsbgSk0D0mD8NheX6x5anHB795hr8mTZKOWEJS2s%3D
