/* eslint-disable react/no-danger */
import React from 'react'
import Content from 'fusion:content'

const getSectionSlug = (sectionId = '') => {
  return sectionId.split('/')[1] || ''
}

const formatAdsCollection = (response, requestUri = '') => {
  const { espacios: spaces = [] } = response || {}
  const tmpAdTargeting = requestUri.match(/tmp_ad=([^&]*)/) || []
  const tmpAdValue = tmpAdTargeting[1] || ''
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
      if (tmpAdValue) {
        formatSpace.targeting = {
          tmp_ad: tmpAdValue,
        }
      }
      return formatSpace
    }
  )
  return `"use strict";var adsCollection=${JSON.stringify(
    adsCollection
  ).replace(
    /"\[window\.addLazyLoadToAd\]"/g,
    'window.addLazyLoadToAd'
  )};arcAds.registerAdCollection(adsCollection);`
}

const Dfp = ({
  deployment,
  contextPath,
  siteProperties = {},
  metaValueId,
  globalContent = {},
  requestUri,
}) => {
  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}},function(d){console.log("Advertisement has loaded...",d)});`

  const lazyLoadFunction = `"use strict";window.addLazyLoadToAd=function(e){if("IntersectionObserver"in window){var n=(e||{}).adId;if(n)return new Promise(function(e){var o=new IntersectionObserver(function(n,o){n.forEach(function(n){n.isIntersecting&&(console.log("resolved!!!!"),e(),o.unobserve(n.target))})},{rootMargin:"0px 0px 500px 0px"});document.getElementById(n)&&o.observe(document.getElementById(n))})}};`

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
        page: 'sect',
        sectionSlug: 'default',
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
            dangerouslySetInnerHTML={{
              __html: formatAdsCollection(content, requestUri),
            }}
          />
        </>
      )}
    </Content>
  )
}

export default Dfp
