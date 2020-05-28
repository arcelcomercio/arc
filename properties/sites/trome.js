export default {
  siteName: 'Trome',
  sitemapNewsName: 'Diario Trome',
  newsletterBrand: 'trome',
  colorPrimary: '#E06437',
  siteDomain: 'trome.pe',
  siteUrl: 'https://trome.pe',
  resizerUrl: 'https://trome.pe/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    //  'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/trome_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/trome/web/post/default/preroll&description_url=https%3A%2F%2Ftrome.pe%2F&tfcd=0&npa=0&sz=640x480|640x360|400x300&cust_params=fuente%3Dweb%26publisher%3Dtrome%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/trome/amp/post/default/preroll&description_url=https%3A%2F%2Ftrome.pe%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Damp%26publisher%3Dtrome%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',

  fbAppId: 'fbappidDEEEEEPOR',
  googleTagManagerId: 'GTM-PP8XNMR',
  ampGoogleTagManagerId: 'UA-3055636-13',
  ampGoogleTagManagerName: 'trome',
  charbeatAccountNumber: 99999,
  idGoogleAnalitics: 'UA-3055636-13',
  fbArticleStyle: 'LogoTrome',
  nameStoryRelated: 'RELACIONADAS',
  mobileHeaderFollowing: 'Siguenos en Trome',
  siteDescription:
    'Noticias de Perú y el mundo en Trome.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://publimetro.pe/f/i/pub_40.png',
  infoPagesDev: {
    termsAndConditions: '',
    guidingPrinciples: '',
    privacyPolicies: '',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: '',
    aboutUs: '',
    frequentQuestions: '',
  },
  infoPagesProd: {
    termsAndConditions: 'VYFDOX6VOZH7ZDDDA6ZRIW44ZM',
    guidingPrinciples: '',
    privacyPolicies: 'WIKWUFMBPBDGNCUTFZIKYO4MPE',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'Q3OMMN6EQBE3XCX46Q44NDNNRU',
    aboutUs: '',
    frequentQuestions: '',
  },

  assets: {
    seo: {
      logoAmp: 'logo-amp.png',
      width: 230,
      height: 60,
      widthAmp: 178,
      heightAmp: 44,
    },
    premium: {
      logo: 'favicon.png',
    },
    nav: {
      logoSomos: 'logo.png',
    },
  },

  messages: {
    errorTitle: '¡Oops! la pagina no fue encontrada en Trome',
    errorDescription:
      'La página que buscas no existe, probablemente el enlace que usaste es erróneo, intenta ubicarlo en la página principal o usa el buscador para encontrar la noticia que buscas:',
  },

  legalLinks: [
    {
      name: 'Términos y Condiciones',
      url: '/terminos-y-condiciones/',
    },
    {
      name: 'Políticas de Privacidad',
      url: '/politica-de-privacidad/',
    },
    {
      name: 'Politicas de Cookies',
      url: '/politica-de-cookies/',
    },
  ],

  socialNetworks: [
    {
      name: 'Twitter',
      url: 'https://twitter.com/tuittrome',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/trome.pe',
    },
    {
      name: 'Pinterest',
      url: 'https://www.pinterest.com/tromepe',
    },
    {
      name: 'RSS ',
      url: 'https://trome.com/arcio/rss',
    },
  ],
  social: {
    facebook: {
      user: '@trome.com',
      url: 'https://www.facebook.com/trome.pe',
    },
    twitter: {
      user: 'tuittrome',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
  },
  listUrlAdvertisings: [
    'https://d1r08wok4169a5.cloudfront.net/ads-trome/ads-fia-28253241-trm_ia_interna1-300x250-div-gpt-ad-8599377-46.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-trome/ads-fia-28253241-trm_ia_interna2-300x250-div-gpt-ad-8599377-47.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-trome/ads-fia-28253241-trm_ia_interna3-300x250-div-gpt-ad-8599377-48.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-trome/ads-fia-28253241-trm_ia_interna4-300x250-div-gpt-ad-8599377-49.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-trome/ads-fia-28253241-trm_ia_interna5-300x250-div-gpt-ad-8599377-50.html',
  ],
  activeSignwall: false,
  activePaywall: false,
  activeNewsletter: false,
  signwall: {
    mainColorBg: '#000000',
    mainColorTxt: '#ffffff',
    mainLogo: 'logo.png',
    mainColorBr: '#ffede5',
    mainColorLink: '#e06437',
    mainColorBtn: '#f15c23',
    authProviders: ['facebook'],
  },
  taboola: {
    dataModeAmp: 'thumbnails-e',
    mode: 'thumbnails-c',
  },
  isDfp: true,
  top: {
    prebid:{
      enabled: true,
        bids: [{
          bidder: 'rubicon',
          labels: ['desktop', 'phone'],
          params: {
              zoneId: `<::getAdsDisplay() === 'mobile' ? '1641896' : '1641280' ::>`,
              siteId: `<::getAdsDisplay() === 'mobile' ? '215766' : '215764' ::>`,
              accountId: '19186'
          }
        }, {
          bidder: 'appnexus',
          labels: ['desktop', 'phone'],
          params: {
              placementId: `<::getAdsDisplay() === 'mobile' ? '18935561' : '18935152' ::>`
          }
        }, {
          bidder: 'criteo',
          labels: ['desktop', 'phone'],
          params: {
              networkId: '7890'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920561'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop', 'phone'],
          params: {
              publisherId: '157414',
              adSlot: `<::getAdsDisplay() === 'mobile' ? '2920560' : '2920562' ::>`
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
              zoneId: '1641442',
              siteId: '215764',
              accountId: '19186'
          }
        }, {
          bidder: 'appnexus',
          labels: ['desktop'],
          params: {
              placementId: '18935156'
          }
        }, {
          bidder: 'criteo',
          labels: ['desktop'],
          params: {
              networkId: '7890'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920546'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920547'
          }
      }]
    }
  },
  caja2: {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop'],
        params: {
            zoneId: '1641526',
            siteId: '215764',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '18935157'
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920548'
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
            zoneId: '1644940',
            siteId: '215766',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '18935563'
        }
      }, {
        bidder: 'criteo',
        labels: ['phone'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920550'
        }
      }]
    }
  },
  caja4 : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['phone'],
        params: {
            zoneId: '1645014',
            siteId: '215766',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '18935564'
        }
      }, {
        bidder: 'criteo',
        labels: ['phone'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920552'
        }
      }]
    }
  },
  caja5 : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['phone'],
        params: {
            zoneId: '1645078',
            siteId: '215766',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '18935565'
        }
      }, {
        bidder: 'criteo',
        labels: ['phone'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920554'
        }
      }]
    }
  },
  laterall : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop'],
        params: {
            zoneId: '1641648',
            siteId: '215764',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '18935153'
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920555'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920556'
        }
      }]
    }
  },
  lateralr : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop'],
        params: {
            zoneId: '1641646',
            siteId: '215764',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '18935154'
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920557'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920558'
        }
      }]
    }
  },
  zocalo : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop', 'phone'],
        params: {
            zoneId: `<::getAdsDisplay() === 'mobile' ? '1645138' : '1641240' ::>`,
            siteId: `<::getAdsDisplay() === 'mobile' ? '215766' : '215764' ::>`,
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop', 'phone'],
        params: {
            placementId: `<::getAdsDisplay() === 'mobile' ? '18935562' : '18935155' ::>`
        }
      }, {
        bidder: 'criteo',
        labels: ['desktop', 'phone'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop', 'phone'],
        params: {
            publisherId: '157414',
            adSlot: `<::getAdsDisplay() === 'mobile' ? '2920564' : '2920565' ::>`
        }
      }]
    }
  }
}
