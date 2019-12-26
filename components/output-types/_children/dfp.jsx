/* eslint-disable react/no-danger */
import React from 'react'
import Content from 'fusion:content'

const getSectionSlug = (sectionId = '') => {
  return sectionId.split('/')[1] || ''
}

const formatAdsCollection = response => {
  const { espacios: spaces = [] } = response || {}
  const adsCollection = spaces.map(
    ({ id, slotname, dimensions, islazyload }) => {
      const formatSpace = {
        id,
        slotName: slotname,
        dimensions: JSON.parse(dimensions),
      }
      if (islazyload) {
        formatSpace.prerender = '[window.addLazyLoadToAd]'
      }
      return formatSpace
    }
  )
  return `"use strict";var adsCollection=${JSON.stringify(
    adsCollection
  ).replace(
    `"[window.addLazyLoadToAd]"`,
    'window.addLazyLoadToAd'
  )};arcAds.registerAdCollection(adsCollection);`
}

const Dfp = ({
  deployment,
  contextPath,
  siteProperties = {},
  metaValueId,
  globalContent = {},
}) => {
  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}},function(d){console.log("Advertisement has loaded...",d)});`

  const lazyLoadFunction = `"use strict";window.addLazyLoadToAd=function(e){if("IntersectionObserver"in window)return new Promise(function(n){var o=e.adId;new IntersectionObserver(function(e,o){e.forEach(function(e){e.isIntersecting&&(console.log("ad resolved!!!!"),n(),o.unobserve(e.target))})},{rootMargin:"0px 0px 500px 0px"}).observe(document.getElementById(o))})};`

  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { path: primarySection } = {} } = {},
  } = globalContent

  let contentConfigValues = {}
  switch (metaValueId) {
    case 'meta_section':
      contentConfigValues = {
        page: 'sect',
        sectionSlug: getSectionSlug(sectionId || _id),
      }
      break
    case 'meta_story':
      contentConfigValues = {
        page: 'post',
        sectionSlug: getSectionSlug(primarySection),
      }
      break
    case 'meta_home':
      contentConfigValues = {
        page: 'home',
      }
      break
    default:
      contentConfigValues = {
        page: sectionId || _id ? 'sect' : 'home',
        sectionSlug: getSectionSlug(sectionId || _id || ''),
      }
      break
  }

  return (
    <Content
      {...{
        contentService: 'get-dfp-spaces',
        contentConfigValues,
      }}>
      {content => (
        <>
          <script
            src={deployment(`${contextPath}/resources/assets/js/arcads.js`)}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: initAds }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: lazyLoadFunction }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: formatAdsCollection(content) }}
          />
        </>
      )}
    </Content>
  )
}

export default Dfp
