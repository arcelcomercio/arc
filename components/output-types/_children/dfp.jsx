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

  const hbOjo =
    (((arcSite === 'ojo' && requestUri.match('^/ojo-show')) ||
      arcSite === 'depor') &&
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
        [320, 50],
        [300, 250]
      ],
      'labels': ['phone']
    }
  ]}}`) ||
    ''
  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}${hbOjo}},function(d){console.log("Advertisement has loaded...",d)});`

  const lazyLoadFunction = `"use strict";window.addLazyLoadToAd=function(e){if("IntersectionObserver"in window){var n=(e||{}).adId;if(n)return new Promise(function(e){var o=new IntersectionObserver(function(n,o){n.forEach(function(n){n.isIntersecting&&(console.log("resolved!!!!"),e(),o.unobserve(n.target))})},{rootMargin:"0px 0px 500px 0px"});document.getElementById(n)&&o.observe(document.getElementById(n))})}};`

  const {
    section_id: sectionId,
    _id,
    content_restrictions: { content_code: contentCode = '' } = {},
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
      typeContent = contentCode === '' ? 'standar' : contentCode
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
      flagsub = true
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
    const getAdsDisplayFunction = `var getAdsDisplay=function(){var e,i={detect_mobile_browser:function(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-/i.test(e.substr(0,4)))&&(t=!0),t},detect_touchable_device:function(){var e=!1;return"object"==typeof window.ontouchstart&&(e=!0),e},detect_rotable_device:function(){var e=!1;return"onorientationchange"in window&&(e=!0),e},detect_state_device:function(){var e=i.detect_mobile_browser(),t=i.detect_touchable_device();return e?"mobile":t?"tablet":"desktop"},detect_orientation_device:function(){return window.innerHeight>window.innerWidth?"portrait":"landscape"}};switch(i.detect_state_device()){case"desktop":e="desktop";break;case"tablet":case"mobile":e="mobile"}return e}`

    const sectionValues =
      page === 'home' || page === 'post'
        ? (primarySection || sectionId || _id || '').split('/')
        : (primarySection || sectionId || _id || requestUri || '').split('/')
    const section = sectionValues[1] || ''
    const subsection = flagsub ? '' : sectionValues[2] || ''
    const { siteUrl = '' } = getProperties(arcSite) || {}
    const targetingTags = tags.map(({ slug = '' }) => slug.split('-').join(''))
    const getTargetFunction = `var getTarget=function getTarget(){ return {"contenido":"${typeContent}","publisher":"${arcSite}","seccion":"${section}","categoria":"${subsection}","fuente":"WEB","tipoplantilla":"${page}","phatname":"${siteUrl}${
      requestUri.split('?')[0]
    }","tags":'${targetingTags}',"ab_test":"","paywall":getUserPaywallLogin(),"tmp_ad":getTmpAd()}};`
    const paywallFunction = `var getUserPaywallLogin=function getUserPaywallLogin(){
      var user_type = 'no'
      if(window.localStorage && window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}'){
        var UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')).uuid;
        var COUNT_USER = JSON.parse(window.localStorage.getItem('ArcP') || '{}')[UUID_USER]
        if(COUNT_USER && COUNT_USER.sub.p.length) { user_type = 'si' }
      } else { var user_type = 'no' }
      return user_type;
    }
    `
    const adsCollection = spaces.map(
      ({
        space,
        slotname2,
        dimensions,
        dimensions_mobile: dimensionsMobile,
        islazyload,
        dispositivo,
        bloque,
        /*   breakpoint: breakpoints,
        refresh=false  */
      }) => {
        /* 
        const flagDimension = (breakpoints !== '[]')? true:''
        */

        const flagHbOjo =
          arcSite === 'ojo' && section === 'ojo-show' ? true : ''
        const flagHbDepor = arcSite === 'depor' ? true : ''
        const formatSpace = {
          id: `gpt_${space}`,
          slotName: slotname2,
          dimensions: `<::getAdsDisplay() === 'mobile' ? ${dimensionsMobile} : ${dimensions}::>`,
          targeting: `<::getTarget() ::>`,
          dispositivo,
          bloque,
        }
        if (islazyload) {
          formatSpace.prerender = '<::window.addLazyLoadToAd::>'
        }
        /* 
          if (flagDimension) {
          formatSpace.dimensions=`<::${dimensions}::>`
          formatSpace.sizemap={
            breakpoints:`<::${breakpoints}::>`,
            refresh
            }
          }  */
        // agregando informacion en commit de hb ojo
        if (flagHbDepor) {
          if (space === 'top') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop', 'phone'],
                    params: {
                      placementId: `<::getAdsDisplay() === 'mobile' ? '19294436' : '19294314' ::>`,
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop', 'phone'],
                    params: {
                      accountId: '19186',
                      siteId: `<::getAdsDisplay() === 'mobile' ? '215762' : '215760' ::>`,
                      zoneId: `<::getAdsDisplay() === 'mobile' ? '1704488' : '1704496' ::>`,
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop', 'phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop', 'phone'],
                    params: {
                      siteId: `<::getAdsDisplay() === 'mobile' ? '353418' : '283399' ::>`,
                      pageId: '1237243',
                      formatId: '74156',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['desktop'],
                    params: {
                      placementId: '1204171840339',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja1') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop'],
                    params: {
                      placementId: '19294320',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop'],
                    params: {
                      accountId: '19186',
                      siteId: '215760',
                      zoneId: '1704492',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop'],
                    params: {
                      siteId: '283399',
                      pageId: '1237243',
                      formatId: '90175',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['desktop'],
                    params: {
                      placementId: '12041718424252',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja2') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop'],
                    params: {
                      placementId: '19294321',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop'],
                    params: {
                      accountId: '19186',
                      siteId: '215760',
                      zoneId: '1704494',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop'],
                    params: {
                      siteId: '283399',
                      pageId: '1237243',
                      formatId: '90176',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['desktop'],
                    params: {
                      placementId: '120417184450199',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja3') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['phone'],
                    params: {
                      placementId: '19294438',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['phone'],
                    params: {
                      accountId: '19186',
                      siteId: '215762',
                      zoneId: '1704482',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['phone'],
                    params: {
                      siteId: '353418',
                      pageId: '1237243',
                      formatId: '90177',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['phone'],
                    params: {
                      placementId: '12041718460820',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja4') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['phone'],
                    params: {
                      placementId: '19294439',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['phone'],
                    params: {
                      accountId: '19186',
                      siteId: '215762',
                      zoneId: '1704484',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['phone'],
                    params: {
                      siteId: '353418',
                      pageId: '1237243',
                      formatId: '90178',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['phone'],
                    params: {
                      placementId: '12041718471768',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja5') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['phone'],
                    params: {
                      placementId: '19294440',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['phone'],
                    params: {
                      accountId: '19186',
                      siteId: '215762',
                      zoneId: '1704486',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['phone'],
                    params: {
                      siteId: '353418',
                      pageId: '1237243',
                      formatId: '90179',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['phone'],
                    params: {
                      placementId: '120417184834766',
                    },
                  },
                ],
              },
            }
          } else if (space === 'laterall') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop'],
                    params: {
                      placementId: '19294317',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop'],
                    params: {
                      accountId: '19186',
                      siteId: '215760',
                      zoneId: '1704500',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop'],
                    params: {
                      siteId: '283399',
                      pageId: '1237243',
                      formatId: '90173',
                    },
                  },
                ],
              },
            }
          } else if (space === 'lateralr') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop'],
                    params: {
                      placementId: '19294319',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop'],
                    params: {
                      accountId: '19186',
                      siteId: '215760',
                      zoneId: '1704502',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop'],
                    params: {
                      siteId: '283399',
                      pageId: '1237243',
                      formatId: '90174',
                    },
                  },
                ],
              },
            }
          } else if (space === 'zocalo') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop', 'phone'],
                    params: {
                      placementId: `<::getAdsDisplay() === 'mobile' ? '19294437' : '19294316' ::>`,
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop', 'phone'],
                    params: {
                      accountId: '19186',
                      siteId: `<::getAdsDisplay() === 'mobile' ? '215762' : '215760' ::>`,
                      zoneId: `<::getAdsDisplay() === 'mobile' ? '1704490' : '1704498' ::>`,
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop', 'phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop', 'phone'],
                    params: {
                      siteId: `<::getAdsDisplay() === 'mobile' ? '353418' : '283399' ::>`,
                      pageId: '1237243',
                      formatId: '74162',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['desktop'],
                    params: {
                      placementId: '120417184140495',
                    },
                  },
                ],
              },
            }
          }
        }
        if (flagHbOjo) {
          if (space === 'top') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop', 'phone'],
                    params: {
                      placementId: `<::getAdsDisplay() === 'mobile' ? '19003326' : '19003302' ::>`,
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop', 'phone'],
                    params: {
                      accountId: '19186',
                      siteId: `<::getAdsDisplay() === 'mobile' ? '215782' : '215780' ::>`,
                      zoneId: `<::getAdsDisplay() === 'mobile' ? '1655590' : '1655560' ::>`,
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop', 'phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop', 'phone'],
                    params: {
                      siteId: `<::getAdsDisplay() === 'mobile' ? '349419' : '316986' ::>`,
                      pageId: `<::getAdsDisplay() === 'mobile' ? '1225821' : '1225819' ::>`,
                      formatId: '74156',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['desktop'],
                    params: {
                      placementId: '12045165030430',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja1') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop'],
                    params: {
                      placementId: '19003320',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop'],
                    params: {
                      accountId: '19186',
                      siteId: '215780',
                      zoneId: '1655524',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop'],
                    params: {
                      siteId: '316986',
                      pageId: '1225819',
                      formatId: '90175',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['desktop'],
                    params: {
                      placementId: '12045164820238',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja2') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop'],
                    params: {
                      placementId: '19003321',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop'],
                    params: {
                      accountId: '19186',
                      siteId: '215780',
                      zoneId: '1655534',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop'],
                    params: {
                      siteId: '316986',
                      pageId: '1225819',
                      formatId: '90176',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['desktop'],
                    params: {
                      placementId: '12045165151976',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja3') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['phone'],
                    params: {
                      placementId: '19003329',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['phone'],
                    params: {
                      accountId: '19186',
                      siteId: '215782',
                      zoneId: '1655576',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['phone'],
                    params: {
                      siteId: '349419',
                      pageId: '1225821',
                      formatId: '90177',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['phone'],
                    params: {
                      placementId: '12045165353373',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja4') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['phone'],
                    params: {
                      placementId: '19003330',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['phone'],
                    params: {
                      accountId: '19186',
                      siteId: '215782',
                      zoneId: '1655580',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['phone'],
                    params: {
                      siteId: '349419',
                      pageId: '1225821',
                      formatId: '90178',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['phone'],
                    params: {
                      placementId: '12045165513386',
                    },
                  },
                ],
              },
            }
          } else if (space === 'caja5') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['phone'],
                    params: {
                      placementId: '19003331',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['phone'],
                    params: {
                      accountId: '19186',
                      siteId: '215782',
                      zoneId: '1655582',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['phone'],
                    params: {
                      siteId: '349419',
                      pageId: '1225821',
                      formatId: '90179',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['phone'],
                    params: {
                      placementId: '1204516577243',
                    },
                  },
                ],
              },
            }
          } else if (space === 'laterall') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop'],
                    params: {
                      placementId: '19003306',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop'],
                    params: {
                      accountId: '19186',
                      siteId: '215780',
                      zoneId: '1655542',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop'],
                    params: {
                      siteId: '316986',
                      pageId: '1225819',
                      formatId: '90173',
                    },
                  },
                ],
              },
            }
          } else if (space === 'lateralr') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop'],
                    params: {
                      placementId: '19003308',
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop'],
                    params: {
                      accountId: '19186',
                      siteId: '215780',
                      zoneId: '1655554',
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop'],
                    params: {
                      siteId: '316986',
                      pageId: '1225819',
                      formatId: '90174',
                    },
                  },
                ],
              },
            }
          } else if (space === 'zocalo') {
            formatSpace.bidding = {
              prebid: {
                enabled: true,
                bids: [
                  {
                    bidder: 'appnexus',
                    labels: ['desktop', 'phone'],
                    params: {
                      placementId: `<::getAdsDisplay() === 'mobile' ? '19003327' : '19003319' ::>`,
                    },
                  },
                  {
                    bidder: 'rubicon',
                    labels: ['desktop', 'phone'],
                    params: {
                      accountId: '19186',
                      siteId: `<::getAdsDisplay() === 'mobile' ? '215782' : '215780' ::>`,
                      zoneId: `<::getAdsDisplay() === 'mobile' ? '1655592' : '1655566' ::>`,
                    },
                  },
                  {
                    bidder: 'criteo',
                    labels: ['desktop', 'phone'],
                    params: {
                      networkId: '7890',
                    },
                  },
                  {
                    bidder: 'smartadserver',
                    labels: ['desktop', 'phone'],
                    params: {
                      siteId: `<::getAdsDisplay() === 'mobile' ? '349419' : '316986' ::>`,
                      pageId: `<::getAdsDisplay() === 'mobile' ? '1225821' : '1225819' ::>`,
                      formatId: '74162',
                    },
                  },
                  {
                    bidder: 'adpone',
                    labels: ['desktop'],
                    params: {
                      placementId: '1204713113677',
                    },
                  },
                ],
              },
            }
          }
        }
        return formatSpace
      }
    )
    return `"use strict"; document.addEventListener('DOMContentLoaded', function () {${initAds}${lazyLoadFunction}${getTmpAdFunction};${getAdsDisplayFunction};${getTargetFunction}${paywallFunction}; window.adsColl=${JSON.stringify(
      adsCollection
    )
      .replace(/"<::/g, '')
      .replace(/::>"/g, '')};
       window.adsCollection = window.adsColl.filter(
        function(input)
         {   
           if(input.dispositivo)
           {
            if(input.dispositivo.indexOf(getAdsDisplay())!==-1)
            { return input; };
           } 
          }
         ) ;
       arcAds.registerAdCollection(window.adsCollection);});`
  }

  return (
    <>
      {(arcSite === 'publimetro' ||
        arcSite === 'depor' ||
        arcSite === 'elcomercio' ||
        arcSite === 'elcomerciomag' ||
        arcSite === 'peru21' ||
        arcSite === 'gestion' ||
        arcSite === 'peru21g21' ||
        arcSite === 'diariocorreo' ||
        arcSite === 'ojo' ||
        arcSite === 'elbocon' ||
        arcSite === 'trome') && (
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
              </>
            )
          }
        </Content>
      )}
    </>
  )
}

export default Dfp
