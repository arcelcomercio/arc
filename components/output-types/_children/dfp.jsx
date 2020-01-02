/* eslint-disable react/no-danger */
import React from 'react'
import Content from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

const getAdId = (content, adId) => {
  const { espacios: spaces = [] } = content || {}
  const adsId = spaces.map(({ id, space }) => {
    let formatAdsId = ''
    if (space === adId) {
      formatAdsId = id
    }
    return formatAdsId
  })
  return adsId.filter(String)[0]
}

const getSectionSlug = (sectionId = '') => {
  return sectionId.split('/')[1] || ''
}

const Dfp = ({ isFuature, adId }) => {
  const {
    deployment,
    contextPath,
    siteProperties = {},
    globalContent = {},
    requestUri,
    metaValue,
    arcSite,
  } = useFusionContext()

  console.log('requestUri->', requestUri)

  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}},function(d){console.log("Advertisement has loaded...",d)});`

  const lazyLoadFunction = `"use strict";window.addLazyLoadToAd=function(e){if("IntersectionObserver"in window){var n=(e||{}).adId;if(n)return new Promise(function(e){var o=new IntersectionObserver(function(n,o){n.forEach(function(n){n.isIntersecting&&(console.log("resolved!!!!"),e(),o.unobserve(n.target))})},{rootMargin:"0px 0px 500px 0px"});document.getElementById(n)&&o.observe(document.getElementById(n))})}};`

  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { path: primarySection } = {} } = {},
  } = globalContent

  let contentConfigValues = {}
  let page=''
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
      page='sección'        

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
      page='nota' 
      break
    case 'meta_home':
      contentConfigValues = {
        page: 'home',
      }
      page='portada' 
      break
    default:
      contentConfigValues = {
        page: 'sect',
        sectionSlug: 'default',
      }
      break
  }

  const formatAdsCollection = response => {
    const { espacios: spaces = [] } = response || {}

    const getTmpAdFunction = `var getTmpAd=function getTmpAd(){var tmpAdTargeting=window.location.search.match(/tmp_ad=([^&]*)/)||[];return tmpAdTargeting[1]||''}`
    const getAdsCollectionFunction = `var getAdsCollection=function getAdsCollection(){var adsCollection=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var IS_MOBILE=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);return adsCollection.map(function(ad){return{...ad,display:IS_MOBILE?'mobile':'desktop'}})}`

    const sectionValues = (sectionId || _id || primarySection || '').split('/')
    const section = sectionValues[1] || ''
    const subsection = sectionValues[2] || ''
    const{siteUrl}=getProperties(arcSite)
    const adsCollection = spaces.map(

      ({ id, slotname, dimensions, islazyload }) => {
     
        const formatSpace = {
          id,
          slotName: slotname,
          dimensions: JSON.parse(dimensions),
          targeting: {
            publisher: arcSite,
            tmp_ad: '<::getTmpAd()::>',
            phatname:`${siteUrl}${requestUri}`,
            tipoplantilla:page,
            seccion: section,
            categoria:subsection
          },
          sizemap: {
            breakpoints: [
              [1280, 0],
              [800, 0],
              [0, 0],
            ],
            refresh: true,
          },
        }
        if (islazyload) {
          formatSpace.prerender = '<::window.addLazyLoadToAd::>'
        }
        if (section) {
          formatSpace.targeting.section = section
        }
        if (subsection) {
          formatSpace.targeting.subsection = subsection
        }
        return formatSpace
      }
    )
    return `"use strict";${getAdsCollectionFunction};${getTmpAdFunction};var adsCollection=getAdsCollection(${JSON.stringify(
      adsCollection
    )
      .replace(/"<::/g, '')
      .replace(/::>"/g, '')});arcAds.registerAdCollection(adsCollection);`
  }

  return (
    <Content
      {...{
        contentService: 'get-dfp-spaces',
        contentConfigValues,
      }}>
      {content =>
        isFuature ? (
          <div
            id={getAdId(content, adId)}
            className="flex justify-center"></div>
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
