/* eslint-disable react/no-danger */
import React from 'react'
import Content from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

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
 
 const hb =
 (arcSite === 'trome' && requestUri.match('^/espectaculos') &&
   `,bidding: {prebid: {enabled: true,timeout: 3000,useSlotForAdUnit: true, sizeConfig: [
    {
      'mediaQuery': '(min-width: 1024px)',
      'sizesSupported': [
        [970, 250],
        [970, 90],
        [728, 90],
        [300, 250],
        [300, 600],
        [160, 600],
        [120, 600]
      ],
      'labels': ['desktop']
    },
    {
      'mediaQuery': '(min-width: 300px) and (max-width: 768px)',
      'sizesSupported': [
        [320, 100],
        [320, 50],
        [300, 250]
      ],
      'labels': ['phone']
    }
  ]}}`) ||
 ''

  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}${hb}},function(d){console.log("Advertisement has loaded...",d)});`

  const lazyLoadFunction = `"use strict";window.addLazyLoadToAd=function(e){if("IntersectionObserver"in window){var n=(e||{}).adId;if(n)return new Promise(function(e){var o=new IntersectionObserver(function(n,o){n.forEach(function(n){n.isIntersecting&&(console.log("resolved!!!!"),e(),o.unobserve(n.target))})},{rootMargin:"0px 0px 500px 0px"});document.getElementById(n)&&o.observe(document.getElementById(n))})}};`

  const {
    section_id: sectionId,
    _id,
    content_restrictions: {content_code:contentCode=''}={},
    taxonomy: {
      primary_section: { path: primarySection } = {},
      tags = [],
    } = {},
  } = globalContent

  let contentConfigValues = {}
  let page = ''
  let flagsub = false
  let typeContent = ''
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
          sectionSlug: getSectionSlug(requestUri),
        }
        flagsub = true
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
      typeContent=(contentCode==='')?'standar':contentCode
      break
    case 'meta_home':
      contentConfigValues = {
        page: 'home',
      }
      page = 'home'
      break
      case 'meta_tag':
        contentConfigValues = {
          page: 'sect',
          sectionSlug: 'default',
        }
        page = 'sect'
        flagsub=true
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
 
    const sectionValues = (page==='home'|| page==='post')?(primarySection || sectionId || _id|| '').split('/'):(primarySection || sectionId || _id || requestUri || '').split('/')
    const section = sectionValues[1] || ''
    const subsection = flagsub?'':sectionValues[2] || ''
    const { siteUrl = '' } = getProperties(arcSite) || {}
    const targetingTags = tags.map(({ slug = '' }) => slug.split('-').join(''))
    const getTargetFunction = `var getTarget=function getTarget(){ return {"contenido":"${typeContent}","publisher":"${arcSite}","seccion":"${section}","categoria":"${subsection}","fuente":"WEB","tipoplantilla":"${page}","phatname":"${siteUrl}${requestUri.split('?')[0]}","tags":'${targetingTags}',"ab_test":"","tmp_ad":getTmpAd()}};`
    const adsCollection = spaces.map(
      ({
        space,
        slotname2,
        dimensions,
        dimensions_mobile: dimensionsMobile,
        islazyload,
        breakpoint: breakpoints,
        refresh=false
      }) => {
        const flagDimension = (breakpoints !== '[]')? true:''
        const flagHb = (arcSite === 'trome' && section === 'espectaculos')? true:''
        const formatSpace = {
          id: `gpt_${space}`,
          slotName: slotname2,
          dimensions: `<::getAdsDisplay() === 'mobile' ? ${dimensionsMobile} : ${dimensions}::>`,
          targeting: `<::getTarget() ::>`,
        }
        if (islazyload) {
          formatSpace.prerender = '<::window.addLazyLoadToAd::>'
        }
        if (flagDimension) {
          formatSpace.dimensions=`<::${dimensions}::>`
          formatSpace.sizemap={
            breakpoints:`<::${breakpoints}::>`,
            refresh
        }
      }

      if(flagHb){
        if(space === 'top'){
          formatSpace.bidding={
            prebid:{
              enabled: true,
              bids: [
                {
                  bidder: 'appnexus',
                  labels: ['desktop', 'phone'],
                  params: {
                    placementId: `<::getAdsDisplay() === 'mobile' ? '12914965' : '12914706' ::>`
                  }
                },
                {
                  bidder: 'rubicon',
                  labels: ['desktop', 'phone'],
                  params: {
                    accountId: '19186',
                    siteId : `<::getAdsDisplay() === 'mobile' ? '215766' : '215764' ::>`,
                    zoneId : `<::getAdsDisplay() === 'mobile' ? '1609566' : '1609554' ::>`
                  }
                },
                {
                  bidder: 'criteo',
                  labels: ['desktop', 'phone'],
                  params: {
                    networkId: '7890' 
                  }
                }
              ]
            }
          }
        }else if(space === 'caja1'){
          formatSpace.bidding={
            prebid:{
              enabled: true,
              bids: [
                {
                  bidder: 'appnexus',
                  labels: ['desktop'],
                  params: {
                    placementId: '12914711'
                  }
                },
                {
                  bidder: 'rubicon',
                  labels: ['desktop'],
                  params: {
                    accountId: '19186',
                    siteId : '215764',
                    zoneId : '1609562',
                  }
                },
                {
                  bidder: 'criteo',
                  labels: ['desktop'],
                  params: {
                    networkId: '7890' 
                  }
                }
              ]
            }
          }
        }else if(space === 'caja2'){
          formatSpace.bidding={
            prebid:{
              enabled: true,
              bids: [
                {
                  bidder: 'appnexus',
                  labels: ['desktop'],
                  params: {
                    placementId: '12914714'
                  }
                },
                {
                  bidder: 'rubicon',
                  labels: ['desktop'],
                  params: {
                    accountId: '19186',
                    siteId : '215764',
                    zoneId : '1609564',
                  }
                },
                {
                  bidder: 'criteo',
                  labels: ['desktop'],
                  params: {
                    networkId: '7890' 
                  }
                }
              ]
            }
          }
        }else if(space === 'caja3'){
          formatSpace.bidding={
            prebid:{
              enabled: true,
              bids: [
                {
                  bidder: 'appnexus',
                  labels: ['desktop', 'phone'],
                  params: {
                    placementId: '12914967'
                  }
                },
                {
                  bidder: 'rubicon',
                  labels: ['desktop','phone'],
                  params: {
                    accountId: '19186',
                    siteId : '215766',
                    zoneId : '1609570',
                  }
                },
                {
                  bidder: 'criteo',
                  labels: ['desktop','phone'],
                  params: {
                    networkId: '7890' 
                  }
                }
              ]
            }
          }
        }else if(space === 'caja4'){
          formatSpace.bidding={
            prebid:{
              enabled: true,
              bids: [
                {
                  bidder: 'appnexus',
                  labels: ['phone'],
                  params: {
                    placementId: '12914968'
                  }
                },
                {
                  bidder: 'rubicon',
                  labels: ['phone'],
                  params: {
                    accountId: '19186',
                    siteId : '215766',
                    zoneId : '1609572',
                  }
                },
                {
                  bidder: 'criteo',
                  labels: ['phone'],
                  params: {
                    networkId: '7890' 
                  }
                }
              ]
            }
          }
        }else if(space === 'caja5'){
          formatSpace.bidding={
            prebid:{
              enabled: true,
              bids: [
                {
                  bidder: 'appnexus',
                  labels: ['phone'],
                  params: {
                    placementId: '12914969'
                  }
                },
                {
                  bidder: 'rubicon',
                  labels: ['phone'],
                  params: {
                    accountId: '19186',
                    siteId : '215766',
                    zoneId : '1609574',
                  }
                },
                {
                  bidder: 'criteo',
                  labels: ['phone'],
                  params: {
                    networkId: '7890' 
                  }
                }
              ]
            }
          }
        }else if(space === 'laterall'){
          formatSpace.bidding={
            prebid:{
              enabled: true,
              bids: [
                {
                  bidder: 'appnexus',
                  labels: ['desktop'],
                  params: {
                    placementId: '12914709'
                  }
                },
                {
                  bidder: 'rubicon',
                  labels: ['desktop'],
                  params: {
                    accountId: '19186',
                    siteId : '215764',
                    zoneId : '1609558',
                  }
                },
                {
                  bidder: 'criteo',
                  labels: ['desktop'],
                  params: {
                    networkId: '7890' 
                  }
                }
              ]
            }
          }
        }else if(space === 'lateralr'){
          formatSpace.bidding={
            prebid:{
              enabled: true,
              bids: [
                {
                  bidder: 'appnexus',
                  labels: ['desktop'],
                  params: {
                    placementId: '12914710'
                  }
                },
                {
                  bidder: 'rubicon',
                  labels: ['desktop'],
                  params: {
                    accountId: '19186',
                    siteId : '215764',
                    zoneId : '1609560',
                  }
                },
                {
                  bidder: 'criteo',
                  labels: ['desktop'],
                  params: {
                    networkId: '7890' 
                  }
                }
              ]
            }
          }
        }else if(space === 'zocalo'){
          formatSpace.bidding={
            prebid:{
              enabled: true,
              bids: [
                {
                  bidder: 'appnexus',
                  labels: ['desktop', 'phone'],
                  params: {
                    placementId: `<::getAdsDisplay() === 'mobile' ? '12914964' : '12914705' ::>`
                  }
                },
                {
                  bidder: 'rubicon',
                  labels: ['desktop', 'phone'],
                  params: {
                    accountId: '19186',
                    siteId : `<::getAdsDisplay() === 'mobile' ? '215766' : '215764' ::>`,
                    zoneId : `<::getAdsDisplay() === 'mobile' ? '1609568' : '1609556' ::>`,
                  }
                },
                {
                  bidder: 'criteo',
                  labels: ['desktop', 'phone'],
                  params: {
                    networkId: '7890' 
                  }
                }
              ]
            }
          }
        }
      }
        return formatSpace
      }
    )
    return `"use strict"; document.addEventListener('DOMContentLoaded', function () {${initAds}${lazyLoadFunction}${getTmpAdFunction};${getAdsDisplayFunction};${getTargetFunction}; window.adsCollection=${JSON.stringify(adsCollection)
      .replace(/"<::/g, '')
      .replace(
        /::>"/g,
        ''
      )};arcAds.registerAdCollection(window.adsCollection);});`
  }

  return (
    <>
      {(  arcSite === 'publimetro' ||  
          arcSite === 'depor'||  
          arcSite === 'elcomercio' || 
          arcSite === 'elcomerciomag' || 
          arcSite === 'peru21' || 
          arcSite === 'gestion' || 
          arcSite === 'peru21g21' ||
          arcSite === 'diariocorreo' || 
          arcSite === 'ojo' ||
          arcSite === 'elbocon' ||
          arcSite === 'trome'
          ) && (
        <Content
          {...{
            contentService: 'get-dfp-spaces',
            contentConfigValues,
          }}>
          {content =>
            isFuature ? (
              <div id={`gpt_${adId}`} className="flex justify-center"></div>
            ) : (
              <>
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: formatAdsCollection(content, requestUri),
                  }}
                />
                <script
                  defer
                  src="https://d1r08wok4169a5.cloudfront.net/gpt-adtmp/gpt-adtmp.js"
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
