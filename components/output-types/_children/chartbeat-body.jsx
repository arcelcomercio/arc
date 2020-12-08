import React from 'react'
import getProperties from 'fusion:properties'
import { VIDEO, GALLERY } from '../../utilities/constants/multimedia-types'
import {
  META_ARCHIVE,
  META_AUTHOR,
  META_HOME,
  META_SECTION,
  META_SEARCH,
  META_STORY,
  META_TAG,
} from '../../utilities/constants/meta'
import { GALLERY_VERTICAL } from '../../utilities/constants/subtypes'

const getSectionList = (requestUri, type) => {
  // Toma la URI sin slash al inicio y final
  const uriMatch = requestUri.match(/^\/([\w-/]+)\//) || {}
  const cleanUri = uriMatch[1] || ''
  const sections = cleanUri.split('/')
  if (type === META_HOME) return 'portada'
  if (type === META_SECTION) return sections
  if (type === META_STORY) return sections.slice(0, -1)
  if (
    type === META_ARCHIVE ||
    type === META_AUTHOR ||
    type === META_TAG ||
    type === META_SEARCH
  ) {
    return sections[0]
  }
  return ''
}

const getAuthor = credits =>
  credits &&
  credits.by &&
  credits.by[0] &&
  credits.by.map(author => author.name)

const getTagList = tags => tags.map(tag => tag.slug)

const getStoryType = (promoItems, subtype) => {
  const promoTypes = Object.keys(promoItems)

  if (promoTypes[0] === GALLERY) {
    const typeGallery =
      subtype === GALLERY_VERTICAL ? 'foto_galeria_vertical' : 'foto_galeria'
    return {
      stringType: 'Articulo Nota Fotogaleria',
      type: typeGallery,
    }
  }
  if (promoTypes[0] === VIDEO) {
    return {
      stringType: 'Articulo Nota Simple',
      type: 'video',
    }
  }
  return {
    stringType: 'Articulo Nota Simple',
    type: 'imagen',
  }
}

const ChartbeatBody = ({
  story,
  hasVideo,
  requestUri,
  metaValue,
  tags,
  credits,
  promoItems,
  arcSite,
  subtype = '',
}) => {
  const { charbeatAccountNumber, siteDomain } = getProperties(arcSite)
  const page = metaValue('id')
  const sectionList = getSectionList(requestUri, page)
  const author = getAuthor(credits) || ''
  const tagsList = getTagList(tags) || arcSite
  const { type, stringType } = getStoryType(promoItems, subtype) || {}
  const renderSections = story ? sectionList.concat(tagsList) : sectionList

  /* chartbeatVideoScript

  (function() {
    function loadChartbeat() {
      window._sf_endpt = (new Date()).getTime();
      var e = document.createElement('script');
      e.type = 'text/javascript';
      e.async=true;
      e.src='//static.chartbeat.com/js/chartbeat_video.js';
      e.setAttribute('language', 'javascript');
      document.body.appendChild(e);
    }
    window.addEventListener('load', function() {
      requestIdle(function() {
        loadChartbeat()
      })
    })
  })(); */
  const chartbeatVideoScript = `!function(){window.addEventListener("load",function(){requestIdle(function(){!function(){window._sf_endpt=(new Date).getTime();var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="//static.chartbeat.com/js/chartbeat_video.js",t.setAttribute("language","javascript"),document.body.appendChild(t)}()})})}();`
  /* chartbeatScript
  
  (function() {
    function loadChartbeat() {
      window._sf_endpt = new Date().getTime();
      var e = document.createElement('script');
      var n = document.getElementsByTagName('script')[0];
      e.type = 'text/javascript';
      e.async = true;
      e.src = '//static.chartbeat.com/js/chartbeat.js';
      n.parentNode.insertBefore(e, n);
    } loadChartbeat();
  })(); */
  const chartbeatScript = `!function(){!function(){window._sf_endpt=(new Date).getTime();var t=document.createElement("script"),e=document.getElementsByTagName("script")[0];t.type="text/javascript",t.async=!0,t.src="//static.chartbeat.com/js/chartbeat.js",e.parentNode.insertBefore(t,e)}()}();`

  const chartbeatConfig = `
    var _sf_startpt = new Date().getTime()
    var _sf_async_config = _sf_async_config || {};_sf_async_config.uid = ${charbeatAccountNumber};_sf_async_config.domain = "${siteDomain}";_sf_async_config.flickerControl = false;_sf_async_config.useCanonical = true;_sf_async_config.sections = "${renderSections}"; ${
    story
      ? `_sf_async_config.authors = '${author}'; _sf_async_config.type = '${type}'; _sf_async_config.contentType = "${stringType}";`
      : ''
  } ${
    // TODO: identificar que portadas y secciones normalmente tienen videos
    // hasVideo reconoce si es una noticia con videos Powa o Youtube
    hasVideo || page === META_SECTION ? chartbeatVideoScript : chartbeatScript
  }`

  return (
    <>
      <script
        async
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: chartbeatConfig }}
      />
      <script async src="//static.chartbeat.com/js/chartbeat_mab.js" />
    </>
  )
}

export default ChartbeatBody
