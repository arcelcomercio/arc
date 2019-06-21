import React from 'react'
import { createMarkup } from '../../utilities/helpers'
import ConfigParams from '../../utilities/config-params'

export default ({ autors, sections, siteProperties }) => {
  /* eslint-disable no-template-curly-in-string */
  const ampAnalytics = `{
    "requests": {
            "pageviewWithCd6": "${unescape('${pageview}&cd6=${cd6}')}"
    },
    "vars": {
        "account": "${siteProperties.ampGoogleTagManagerId}"
    },
    "triggers": {
        "trackPageviewWithCustom": {
            "on": "visible",
            "request": "pageviewWithCd6",
            "vars": {
                "cd6": "AMP"
            }
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
      <amp-analytics type="googleanalytics" id="analytics-elcomercio">
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
