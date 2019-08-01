import React from 'react'
import { createMarkup, getMultimedia } from '../../utilities/helpers'
import ConfigParams from '../../utilities/config-params'
import StoryData from '../../utilities/story-data'

export default ({
  autors,
  sections,
  siteProperties,
  arcSite,
  globalContent,
}) => {
  const { id, multimediaType } = new StoryData({
    data: globalContent,
    arcSite,
  })

  /* eslint-disable no-template-curly-in-string */
  const ampAnalytics = `
  {
    "vars": {
        "account": "${siteProperties.ampGoogleTagManagerId}"
    },
    "extraUrlParams": {
      "cd6": "AMP",
      "cd7": "${getMultimedia(multimediaType, true)}",
      "cd8": "${id}"
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
        "sections" : "${sections && sections.map(({ name }) => {
          return `'${name}'`
        })}",
        "author" : "'Redacción ${autors && autors.map(({ name }) => {
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
