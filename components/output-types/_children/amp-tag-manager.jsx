import React from 'react'
// import { formatSlugToText } from '../../utilities/parse/strings'
import { ELEMENT_TYPE_CHARBEAT } from '../../utilities/constants/element-types'
import { VIDEO, GALLERY } from '../../utilities/constants/multimedia-types'
import { COMSCORE_ID } from '../../utilities/constants/ids'
import StoryData from '../../utilities/story-data'

const getMultimedia = (multimediaType, amp = false) => {
  let type = ''
  switch (multimediaType) {
    case VIDEO:
      type = 'video'
      break
    case GALLERY:
      type = amp ? 'foto_galeria' : 'gallery'
      break
    default:
      type = amp ? 'imagen' : 'story'
  }
  return type
}

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
    author,
    link,
    videoSeo,
    nucleoOrigen,
    title,
  } = new StoryData({
    data: globalContent,
    arcSite,
  })

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

  const ampAnalyticsOjo = `
  {
    "vars": {
        "account": "${siteProperties.ampGoogleTagManagerId}"
    },
    "triggers": {
        ${videoSeoItems[0] ? ` ${videoSeoItems}` : ''}
    }
  }`

  const chartbeat = ` {
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
        "contentType" : "${ELEMENT_TYPE_CHARBEAT}"

    }
  }`

  const comscore = ` {
    "vars": {
      "c2": "${COMSCORE_ID}"
    },
    "extraUrlParams": {
      "comscorekw": "amp"
    }
  }`

  const urlStory = `${siteProperties.siteUrl}${requestUri}`
  const urlPixel = `https://www.google-analytics.com/r/collect?v=1&_v=a1&ds=AMP&sr=SCREEN_WIDTHxSCREEN_HEIGHT&sd=SCREEN_COLOR_DEPTH&ul=BROWSER_LANGUAGE&de=DOCUMENT_CHARSET&dr=DOCUMENT_REFERRER&t=pageview&tid=${
    siteProperties.ampGoogleTagManagerId
  }&cid=CLIENT_ID(_ga)&dl=${urlStory}&dt=${title}&cd4=noticias&cd5=&cd6=AMP&cd7=${getMultimedia(
    multimediaType,
    true
  )}&cd8=${id}&cd11=nologin-v&cd15=${author}&cd16=${nucleoOrigen} `

  return (
    <>
      <amp-pixel src={urlPixel} layout="nodisplay" />
      <amp-analytics
        type="googleanalytics"
        id={`analytics-${siteProperties.ampGoogleTagManagerName}`}>
        <script
          type="application/json"
          dangerouslySetInnerHTML={{ __html: ampAnalyticsOjo }}
        />
      </amp-analytics>

      <amp-analytics type="comscore">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{ __html: comscore }}
        />
      </amp-analytics>
      <amp-analytics type="chartbeat">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{ __html: chartbeat }}
        />
      </amp-analytics>
    </>
  )
}
