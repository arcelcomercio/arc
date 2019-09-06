import React from 'react'
import {
  createMarkup,
  getMultimedia,
  formatSlugToText,
} from '../../utilities/helpers'
import ConfigParams from '../../utilities/config-params'
import StoryData from '../../utilities/story-data'

export default ({
  autors,
  sections,
  siteProperties,
  arcSite,
  globalContent,
}) => {
  const {
    id,
    multimediaType,
    sectionLink,
    author,
    link,
    videoSeo,
    nucleoOrigen,
  } = new StoryData({
    data: globalContent,
    arcSite,
  })

  const subSection = formatSlugToText(sectionLink, 2) || ''
  const section = formatSlugToText(sectionLink, 1) || ''
  const videoSeoItems = videoSeo.map(
    ({ caption, idVideo = '' } = {}, index) => {
      const totalIndex = index !== 0 ? `_${index}` : ''
      return `    
      "trackVideoPlay${totalIndex}": {
        "on": "video-play",
        "request": "event",
        "selector": ".id-${idVideo}",
        "vars": {
          "eventCategory": "PowaAMP",
          "eventAction": "playbackPlay",
          "eventLabel": "${idVideo} | ${caption}"
        }
      },
      "trackVideoPause${totalIndex}": {
        "on": "video-pause",
        "request": "event",
        "selector": ".id-${idVideo}",
        "vars": {
          "eventCategory": "PowaAMP",
          "eventAction": "playbackPaused",
          "eventLabel": "${idVideo} | ${caption}"
        }
      },
      "trackVideoComplete${totalIndex}": {
        "on": "video-ended",
        "request": "event",
        "selector": ".id-${idVideo}",
        "vars": {
          "eventCategory": "PowaAMP",
          "eventAction": "playbackFinished",
          "eventLabel": "${idVideo} | ${caption}"
        }
      }
     `
    }
  )

  const ampAnalytics = `
  {
    "vars": {
        "account": "${siteProperties.ampGoogleTagManagerId}"
    },
    "extraUrlParams": {
      "cd3": "${link.slice(1)}",
      "cd4": "${section}",
      "cd5": "${subSection}",
      "cd6": "AMP",
      "cd7": "${getMultimedia(multimediaType, true)}",
      "cd8": "${id}",
      "cd15": "${author}",
      "cd16": "${nucleoOrigen}",
      "ds": "AMP"
    },        
    "triggers": {
        "trackPageview": {
            "on": "visible",
            "request": "pageview"
        }
        ${videoSeoItems[0] ? `, ${videoSeoItems}` : ''}
    }
}`

  const chartbet = ` {
    "vars": {
        "uid" : ${siteProperties.charbeatAccountNumber},
        "domain" : "${siteProperties.siteDomain}",
        "sections" : "${sections &&
          sections.map(({ name }) => {
            return `'${name}'`
          })}",
        "author" : "'Redacción ${autors &&
          autors.map(({ name }) => {
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
