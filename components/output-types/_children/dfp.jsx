/* eslint-disable react/no-danger */
import React, { useEffect } from 'react'
import Content from 'fusion:content'
import { useFusionContext } from 'fusion:context'

const getAdId = (content, adId) => {
  return { content, adId }
}

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
  return `"use strict";var getAdsCollection=function getAdsCollection(){var adsCollection=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var IS_MOBILE=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);return adsCollection.map(function(ad){return{...ad,display:IS_MOBILE?'mobile':'desktop'}})};
  var adsCollection=getAdsCollection(${JSON.stringify(adsCollection).replace(
    /"\[window\.addLazyLoadToAd\]"/g,
    'window.addLazyLoadToAd'
  )});
  arcAds.registerAdCollection(adsCollection);`
}

const Dfp = ({ isFuature, adId }) => {
  const {
    deployment,
    contextPath,
    siteProperties = {},
    globalContent = {},
    requestUri,
    metaValue,
  } = useFusionContext()

  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}},function(d){console.log("Advertisement has loaded...",d)});`

  const lazyLoadFunction = `"use strict";window.addLazyLoadToAd=function(e){if("IntersectionObserver"in window){var n=(e||{}).adId;if(n)return new Promise(function(e){var o=new IntersectionObserver(function(n,o){n.forEach(function(n){n.isIntersecting&&(console.log("resolved!!!!"),e(),o.unobserve(n.target))})},{rootMargin:"0px 0px 500px 0px"});document.getElementById(n)&&o.observe(document.getElementById(n))})}};`

  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { path: primarySection } = {} } = {},
  } = globalContent

  let contentConfigValues = {}
  switch (metaValue('id')) {
    case 'meta_section':
      if (sectionId || _id) {
        contentConfigValues = {
          page: 'sect',
          sectionSlug: getSectionSlug(sectionId || _id),
        }
      } else {
        contentConfigValues = {
          page: 'sect',
          sectionSlug: 'default',
        }
      }
      break
    case 'meta_story':
      if (primarySection) {
        contentConfigValues = {
          page: 'post',
          sectionSlug: getSectionSlug(primarySection),
        }
      } else {
        contentConfigValues = {
          page: 'post',
          sectionSlug: 'default',
        }
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

  useEffect(() => {
    console.log('FUNCIONAAAA!!!')
  })

  return (
    <Content
      {...{
        contentService: 'get-dfp-spaces',
        contentConfigValues,
      }}>
      {content =>
        isFuature ? (
          <div id={getAdId(content, adId)}>HOLA MUNDO</div>
        ) : (
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
        )
      }
    </Content>
  )
}

export default Dfp
