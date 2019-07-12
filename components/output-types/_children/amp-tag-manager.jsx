import React from 'react'
import { createMarkup } from '../../utilities/helpers'
import ConfigParams from '../../utilities/config-params'

export default ({ autors, sections, siteProperties }) => {
  /* eslint-disable no-template-curly-in-string */
  const ampAnalytics = `
  {
    "vars": {
      "account": "${siteProperties.ampGoogleTagManagerId}"
    },
    "triggers": {
      "trackPageview": {
        "on": "visible",
        "request": "pageview"
      }
    }
  }`

  const chartbet = ` {
    "vars": {
        "uid" : ${siteProperties.charbeatAccountNumber},
        "domain" : "${siteProperties.siteDomain}",
        "sections" : "${sections.map(({ name }) => {
          return `'${name}'`
        })}",
        "author" : "'Redacción ${autors.map(({ name }) => {
          return `'${name}'`
        })}'",
        "contentType" : "${ConfigParams.ELEMENT_TYPE_CHARBEAT}"

    }
  }`

  const comscore = ` {
    "vars": {
      "c2": "${ConfigParams.COMSCORE_ID}"
    },
    "extraUrlParams": {
      "comscorekw": "amp"
    }
  }`

  return (
    <>
      <amp-analytics
        type="googleanalytics"
        id={`analytics-${siteProperties.ampGoogleTagManagerName}`}>
        <script
          type="application/json"
          dangerouslySetInnerHTML={createMarkup(ampAnalytics)}
        />
      </amp-analytics>
      <amp-analytics type="comscore">
        <script
          type="application/json"
          dangerouslySetInnerHTML={createMarkup(comscore)}
        />
      </amp-analytics>
      <amp-analytics type="chartbeat">
        <script
          type="application/json"
          dangerouslySetInnerHTML={createMarkup(chartbet)}
        />
      </amp-analytics>
    </>
  )
}
