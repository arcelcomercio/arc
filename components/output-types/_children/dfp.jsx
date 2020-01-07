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
    siteProperties = {},
    globalContent = {},
    requestUri,
    metaValue,
    arcSite,
  } = useFusionContext()

  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}},function(d){console.log("Advertisement has loaded...",d)});`

  const lazyLoadFunction = `"use strict";window.addLazyLoadToAd=function(e){if("IntersectionObserver"in window){var n=(e||{}).adId;if(n)return new Promise(function(e){var o=new IntersectionObserver(function(n,o){n.forEach(function(n){n.isIntersecting&&(console.log("resolved!!!!"),e(),o.unobserve(n.target))})},{rootMargin:"0px 0px 500px 0px"});document.getElementById(n)&&o.observe(document.getElementById(n))})}};`

  const {
    section_id: sectionId,
    _id,
    taxonomy: {
      primary_section: { path: primarySection } = {},
      tags = [],
    } = {},
  } = globalContent

  let contentConfigValues = {}
  let page = ''
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
      page = 'sect'

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
      page = 'post'
      break
    case 'meta_home':
      contentConfigValues = {
        page: 'home',
      }
      page = 'home'
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
    const getAdsDisplayFunction = `var getAdsDisplay=function getAdsDisplay(){var IS_MOBILE=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);return IS_MOBILE?'mobile':'desktop'}`

    const sectionValues = (primarySection || sectionId || _id || '').split('/')
    const section = sectionValues[1] || ''
    const subsection = sectionValues[2] || ''
    const { siteUrl = '' } = getProperties(arcSite) || {}
    const targetingTags = tags.map(({ slug = '' }) => slug.split('-').join(''))
    const adsCollection = spaces.map(
      ({
        space,
        slotname,
        dimensions,
        dimensions_mobile: dimensionsMobile,
        islazyload,
      }) => {
        const formatSpace = {
          id: `gpt_${space}`,
          slotName: slotname,
          dimensions: `<::getAdsDisplay() === 'mobile' ? ${dimensionsMobile} : ${dimensions}::>`,
          targeting: {
            publisher: arcSite,
            seccion: section,
            categoria: subsection,
            fuente: 'WEB',
            tipoplantilla: page,
            phatname: `${siteUrl}${requestUri}`,
            tags: targetingTags,
            ab_test: '',
            tmp_ad: '<::getTmpAd()::>',
          },
        }
        if (islazyload) {
          formatSpace.prerender = '<::window.addLazyLoadToAd::>'
        }
        return formatSpace
      }
    )
    return `"use strict";document.addEventListener('DOMContentLoaded', function () {${initAds}${lazyLoadFunction}${getTmpAdFunction};${getAdsDisplayFunction};var adsCollection=${JSON.stringify(
      adsCollection
    )
      .replace(/"<::/g, '')
      .replace(/::>"/g, '')};arcAds.registerAdCollection(adsCollection);});`
  }

  return (
    <>
      {arcSite === 'publimetro' && (
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
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: formatAdsCollection(content, requestUri),
                  }}
                />
              </>
            )
          }
        </Content>
      )}
    </>
  )
}

export default Dfp
