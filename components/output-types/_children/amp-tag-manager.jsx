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
  requestUri,
}) => {
  const {
    id,
    multimediaType,
    sectionLink,
    author,
    link,
    videoSeo,
    nucleoOrigen,
    title,
  } = new StoryData({
    data: globalContent,
    arcSite,
  })

  const subSection = formatSlugToText(sectionLink, 2) || ''
  const section = formatSlugToText(sectionLink, 1) || ''
  const videoSeoItems = videoSeo.map(({ idVideo = '' } = {}, index) => {
    const totalIndex = index !== 0 ? `_${index}` : ''
    return `    
      "trackVideoPlay${totalIndex}": {
        "on": "video-play",
        "request": "event",
        "selector": ".id-${idVideo}",
        "vars": {
          "eventCategory": "PowaAMP",
          "eventAction": "playbackPlay",
          "eventLabel": "${idVideo} | ${link}"
        }
      },
      "trackVideoPause${totalIndex}": {
        "on": "video-pause",
        "request": "event",
        "selector": ".id-${idVideo}",
        "vars": {
          "eventCategory": "PowaAMP",
          "eventAction": "playbackPaused",
          "eventLabel": "${idVideo} | ${link}"
        }
      },
      "trackVideoComplete${totalIndex}": {
        "on": "video-ended",
        "request": "event",
        "selector": ".id-${idVideo}",
        "vars": {
          "eventCategory": "PowaAMP",
          "eventAction": "playbackFinished",
          "eventLabel": "${idVideo} | ${link}"
        }
      }
     `
  })

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
      "cd16": "${nucleoOrigen}"
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

  const pageNext = requestUri.match(`^(/(.*)/.*&pageNext=2)`)
  const urlStory = `${siteProperties.siteUrl}${link}?outputType=amp`

  const urlPixel = `https://www.google-analytics.com/r/collect?v=1&ds=AMP&t=pageview&tid=${
    siteProperties.ampGoogleTagManagerId
  }&cid=CLIENT_ID(_ga)&dl=${urlStory}&dt=${title}&cd4=noticias&cd5=&cd6=AMP&cd7=${getMultimedia(
    multimediaType,
    true
  )}&cd8=${id}&cd15=${author}&cd1    `

  return (
    <>
      {pageNext && <amp-pixel src={urlPixel} layout="nodisplay" />}
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
    </>
  )
}
