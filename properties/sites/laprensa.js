export default {
  siteName: 'La Prensa',
  sitemapNewsName: 'Diario La Prensa',

  googleFonts: 'Lato:400,700|Exo:500',

  colorPrimary: '#005fa5',
  siteDomain: 'peru21.pe',
  siteUrl: 'https://peru21.pe',
  resizerUrl: 'https://elcomercio-peru21-prod.cdn.arcpublishing.com/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/Peru21_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-KKQFJ3Z',
  ampGoogleTagManagerId: 'UA-3055636-4',
  ampGoogleTagManagerName: 'peru21',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-4',
  fbArticleStyle: 'LogoPeru21',
  nameStoryRelated: 'VEA TAMBIÉN',
  siteDescription:
    'Noticias de Perú y el mundo en Peru21.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://publimetro.pe/f/i/pub_40.png',
  assets: {
    nav: {
      logo: 'logo-white.png',
      logoSomos: 'logo-white.png',
    },
    header: {
      logo: 'logo-white.png',
    },
    footer: {
      logo: 'logo-footer-md.png',
    },
    seo: {
      logoAmp: 'logo-amp.png',
      width: 230,
      height: 60,
    },
  },
  infoPagesDev: {
    termsAndConditions: 'OY6E6FMKWVDXFC7P3S7VKRMWAU',
    guidingPrinciples: '',
    privacyPolicies: 'U2FDMRFNEVDVJNASRBJD7BWE3I',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'F5UCK5TMLZBRPN3OFRXIAW6HWY',
    aboutUs: '',
    frequentQuestions: '2ILZRA4AUBFSXK7JLGGN3SZ2XE',
  },
  infoPagesProd: {
    termsAndConditions: '',
    guidingPrinciples: '',
    privacyPolicies: '',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: '',
    aboutUs: '',
    frequentQuestions: '',
  },

  legalLinks: [
    {
      name: 'Términos y condiciones',
      url: '/terminos-y-condiciones/',
    },
    {
      name: 'Políticas de Privacidad',
      url: '/politicas-de-privacidad/',
    },
    {
      name: 'Politicas de Cookies',
      url: '/politicas-de-cookies/',
    },
  ],

  socialNetworks: [
    {
      name: 'facebook',
      url: '',
    },
    {
      name: 'twitter',
      url: '',
    },
  ],
  social: {
    facebook: {
      user: '',
    },
    twitter: {
      user: '',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
  },
  listUrlAdvertisings: [
    'https://d1r08wok4169a5.cloudfront.net/ads-peru21/ads-fia-28253241-p21_ia_interna1-300x250-div-gpt-ad-8599377-31.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-peru21/ads-fia-28253241-p21_ia_interna2-300x250-div-gpt-ad-8599377-32.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-peru21/ads-fia-28253241-p21_ia_interna3-300x250-div-gpt-ad-8599377-33.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-peru21/ads-fia-28253241-p21_ia_interna4-300x250-div-gpt-ad-8599377-34.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-peru21/ads-fia-28253241-p21_ia_interna5-300x250-div-gpt-ad-8599377-35.html',
  ],
  activeSignwall: false,
  activePaywall: false,
  activeNewsletter: false,
  signwall: {
    mainColorBg: '#f7c600',
    mainColorTxt: '#000000',
    mainLogo: 'logo.png',
    mainColorBr: '#efdb96',
    mainColorLink: '#36b',
    authProviders: ['facebook'],
  },
  tv: {
    logoUrl: '/peru21tv/',
    logoAlt: 'Perú21Tv',
  },
  top : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop', 'phone'],
        params: {
            zoneId : `<::getAdsDisplay() === 'mobile' ? '1717112' : '1716986' ::>`,
            siteId : `<::getAdsDisplay() === 'mobile' ? '215754' : '215752' ::>`,            
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop', 'phone'],
        params: {
            placementId: `<::getAdsDisplay() === 'mobile' ? '19312144' : '19312126' ::>`
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop', 'phone'],
        params: {
            networkId: '7890'
        }
      },{
        bidder: 'smartadserver',
        labels: ['desktop', 'phone'],
        params: {
            siteId: '283398',
            pageId: `<::getAdsDisplay() === 'mobile' ? '1239548' : '1239547' ::>`,
            formatId: '74156'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920521'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop', 'phone'],
        params: {
            publisherId: '157414',
            adSlot: `<::getAdsDisplay() === 'mobile' ? '2920520' : '2920522' ::>`
        }
      }]
    }
  },
  caja1 : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop'],
        params: {
            zoneId: '1716990',
            siteId: '215752',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19312132'
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'smartadserver',
        labels: ['desktop'],
        params: {
            siteId: '283398',
            pageId: '1239547',
            formatId: '90175'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920506'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920507'
        }
      }]
    }
  },
  caja2 : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop'],
        params: {
            zoneId: '1716998',
            siteId: '215752',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19312133'
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'smartadserver',
        labels: ['desktop'],
        params: {
            siteId: '283398',
            pageId: '1239547',
            formatId: '90176'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920508'
        }
      }]
    }
  },
  caja3 : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['phone'],
        params: {
            zoneId: '1717116',
            siteId: '215754',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19312148'
        }
      }, {
        bidder: 'criteo',
        labels: ['phone'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'smartadserver',
        labels: ['phone'],
        params: {
            siteId: '283398',
            pageId: '1239548',
            formatId: '90177'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920510'
        }
      }]
    }
  },
  caja4: {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['phone'],
        params: {
            zoneId: '1717118',
            siteId: '215754',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19312149'
        }
      }, {
        bidder: 'criteo',
        labels: ['phone'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'smartadserver',
        labels: ['phone'],
        params: {
            siteId: '283398',
            pageId: '1239548',
            formatId: '90178'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920512'
        }
      }]
    }
  },
  caja5: {
    prebid:{
      enabled: true,
      bids: [
        {
          bidder: 'rubicon',
          labels: ['phone'],
          params: {
            zoneId: '1717120',
            siteId: '215754',
            accountId: '19186'
          }
        }, {
          bidder: 'appnexus',
          labels: ['phone'],
          params: {
            placementId: '19312151'
          }
        }, {
          bidder: 'criteo',
          labels: ['phone'],
          params: {
            networkId: '7890'
          }
        }, {
          bidder: 'smartadserver',
          labels: ['phone'],
          params: {
            siteId: '283398',
            pageId: '1239548',
            formatId: '90179'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['phone'],
          params: {
            publisherId: '157414',
            adSlot: '2920514'
          }
        }
      ]
    }
  },
  lateralr : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop'],
        params: {
            zoneId: '1717004',
            siteId: '215752',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19312130'
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'smartadserver',
        labels: ['desktop'],
        params: {
            siteId: '283398',
            pageId: '1239547',
            formatId: '90174'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920517'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920518'
        }
      }]
    }
  },
  laterall: {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop'],
        params: {
            zoneId: '1717000',
            siteId: '215752',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19312129'
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'smartadserver',
        labels: ['desktop'],
        params: {
            siteId: '283398',
            pageId: '1239547',
            formatId: '90173'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920515'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920516'
        }
      }]
    }
  },
  zocalo: {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop', 'phone'],
        params: {
            accountId: '19186',
            siteId : `<::getAdsDisplay() === 'mobile' ? '215754' : '215752' ::>`,
            zoneId : `<::getAdsDisplay() === 'mobile' ? '1717114' : '1716988' ::>`,
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop', 'phone'],
        params: {
            placementId: `<::getAdsDisplay() === 'mobile' ? '19312145' : '19312127' ::>`
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop', 'phone'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'smartadserver',
        labels: ['desktop', 'phone'],
        params: {
            siteId: '283398',
            pageId : `<::getAdsDisplay() === 'mobile' ? '1239548' : '1239547' ::>`,
            formatId: '74162'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop', 'phone'],
        params: {
            publisherId: '157414',
            adSlot : `<::getAdsDisplay() === 'mobile' ? '2920524' : '2920525' ::>`
        }
      }]
    }
  }
}
