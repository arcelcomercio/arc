export default {
  siteName: 'Ojo',
  sitemapNewsName: 'Diario Ojo',
  googleFonts: 'Roboto|Alfa+Slab+One|Titillium+Web:400,700',

  // colorPrimary: '#007d33',
  colorPrimary: '#5fbb46',
  siteDomain: 'ojo.pe',
  siteUrl: 'https://ojo.pe',
  linkTabloide: 'http://ediciondigital.ojo.pe/lima/',
  resizerUrl: 'https://ojo.pe/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    // 'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/Ojo_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/ojo/web/post/default/preroll&description_url=https%3A%2F%2Fojo.pe%2F&tfcd=0&npa=0&sz=640x480|640x360|400x300&cust_params=fuente%3Dweb%26publisher%3Dojo%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/ojo/amp/post/default/preroll&description_url=https%3A%2F%2Fojo.pe%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Damp%26publisher%3Dojo%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  fbAppId: '1579310032347237',
  googleTagManagerId: 'GTM-KZX7JN3',
  ampGoogleTagManagerId: 'UA-15668535-1',
  ampGoogleTagManagerName: 'ojo',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-15668535-1',
  fbArticleStyle: 'default',
  nameStoryRelated: 'VEA TAMBIÉN',
  siteDescription:
    'Noticias de Perú y el mundo en ojo.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://ojo.pe/f/i/pub_40.png',
  infoPagesDev: {
    termsAndConditions: 'ND7742VX7JAILGYP7NTCU3P45Q',
    guidingPrinciples: '',
    privacyPolicies: 'MBDXL6S4PJEDRJUL7BDV5SWYY4',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'FKYQXTQVJBBIXGT6P22O6E24OE',
    aboutUs: '',
    frequentQuestions: '',
  },
  infoPagesProd: {
    termsAndConditions: 'OX3HQTTGGNGEFO6X2MH7OM2ZMI',
    guidingPrinciples: '',
    privacyPolicies: 'WLQC74SD7RFMRHO45HGKQRG7AU',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'NH3NHETIQBEUDKMEVTH5KW576Q',
    aboutUs: '',
    frequentQuestions: '',
  },
  assets: {
    seo: {
      logoAmp: 'logo-amp.png',
      width: 246,
      height: 60,
      widthAmp: 65,
      heightAmp: 40,
    },
  },
  legalLinks: [
    {
      name: 'Términos y Condiciones',
      url: '/terminos-y-condiciones/',
    },
    {
      name: 'Política de Privacidad',
      url: '/politica-de-privacidad/',
    },
    {
      name: 'Política de Cookies',
      url: '/politica-de-cookies/',
    },
  ],

  socialNetworks: [
    {
      name: 'facebook',
      url: 'https://www.facebook.com/DiarioOjo',
    },
    {
      name: 'twitter',
      url: 'https://twitter.com/diarioojo',
    },
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/company/ojo/',
    },
  ],

  social: {
    facebook: {
      user: '@DiarioOjo',
      url: 'https://www.facebook.com/DiarioOjo',
    },
    twitter: {
      user: 'diarioojo',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
  },
  listUrlAdvertisings: [
    'https://d1r08wok4169a5.cloudfront.net/ads-ojo/ads-fia-28253241-ojo_ia_interna1-300x250-div-gpt-ad-8599377-26.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-ojo/ads-fia-28253241-ojo_ia_interna2-300x250-div-gpt-ad-8599377-27.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-ojo/ads-fia-28253241-ojo_ia_interna3-300x250-div-gpt-ad-8599377-28.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-ojo/ads-fia-28253241-ojo_ia_interna4-300x250-div-gpt-ad-8599377-29.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-ojo/ads-fia-28253241-ojo_ia_interna5-300x250-div-gpt-ad-8599377-30.html',
  ],
  activeSignwall: false,
  activePaywall: false,
  activeNewsletter: false,
  signwall: {
    mainColorBg: '#333333',
    mainColorTxt: '#ffffff',
    mainLogo: 'logo.png',
    mainColorBr: '#e7fced',
    mainColorLink: '#008929',
    mainColorBtn: '#008929',
    authProviders: ['facebook'],
  },
  taboola: {
    dataModeAmp: 'thumbnails-e',
    mode: 'thumbnails-a',
  },
  isDfp: true,
  top : {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop', 'phone'],
        params: {
            zoneId: `<::getAdsDisplay() === 'mobile' ? '1717064' : '1716054' ::>` ,
            siteId: `<::getAdsDisplay() === 'mobile' ? '215782' : '215748' ::>`,
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop', 'phone'],
        params: {
            placementId: `<::getAdsDisplay() === 'mobile' ? '19311488' : '19311475' ::>`
        }
      },{
        bidder: 'criteo',
        labels: ['desktop', 'phone'],
        params: {
            networkId: '7890'
        }
      }, {
        bidder: 'smartadserver',
        labels: ['desktop', 'phone'],
        params: {
            siteId: '316986',
            pageId: `<::getAdsDisplay() === 'mobile' ? '1239538' : '1239537' ::>`,
            formatId: '74156'
        }
      },{
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920501'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop', 'phone'],
        params: {
            publisherId: '157414',
            adSlot: `<::getAdsDisplay() === 'mobile' ? '2920500' : '2920502' ::>`
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
            zoneId: '1716050',
            siteId: '215748',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19311479'
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
            siteId: '316986',
            pageId: '1239537',
            formatId: '90175'
        }
      },{
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920486'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920487'
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
            zoneId: '1716052',
            siteId: '215748',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19311480'
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
            siteId: '316986',
            pageId: '1239537',
            formatId: '90176'
        }
      },{
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920488'
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
            zoneId: '1716080',
            siteId: '215782',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19311490'
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
            siteId: '316986',
            pageId: '1239538',
            formatId: '90177'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920490'
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
            zoneId: '1717072',
            siteId: '215782',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19311491'
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
            siteId: '316986',
            pageId: '1239538',
            formatId: '90178'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920492'
        }
      }]
    }
  },
  caja5: {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['phone'],
        params: {
            zoneId: '1717074',
            siteId: '215782',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19311492'
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
            siteId: '316986',
            pageId: '1239538',
            formatId: '90179'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920494'
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
            zoneId: '1716992',
            siteId: '215748',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19311476'
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
            siteId: '316986',
            pageId: '1239537',
            formatId: '90173'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920495'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920496'
        }
      }]
    }
  },
  lateralr: {
    prebid:{
      enabled: true,
      bids: [{
        bidder: 'rubicon',
        labels: ['desktop'],
        params: {
            zoneId: '1716994',
            siteId: '215748',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19311477'
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
            siteId: '316986',
            pageId: '1239537',
            formatId: '90174'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920497'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920498'
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
            zoneId: `<::getAdsDisplay() === 'mobile' ? '1717070' : '1716056' ::>`,
            siteId: `<::getAdsDisplay() === 'mobile' ? '215782' : '215748' ::>`,
            accountId: '19186'
        }
      },{
        bidder: 'appnexus',
        labels: ['desktop', 'phone'],
        params: {
            placementId: `<::getAdsDisplay() === 'mobile' ? '19311489' : '19311478' ::>` 
        }
      },{
        bidder: 'criteo',
        labels: ['desktop', 'phone'],
        params: {
            networkId: '7890'
        }
      },{
        bidder: 'smartadserver',
        labels: ['desktop', 'phone'],
        params: {
            siteId: '316986',
            pageId: `<::getAdsDisplay() === 'mobile' ? '1239538' : '1239537' ::>`,
            formatId: '74162'
        }
      },{
        bidder: 'pubmatic',
        labels: ['desktop', 'phone'],
        params: {
            publisherId: '157414',
            adSlot: `<::getAdsDisplay() === 'mobile' ? '2920504' : '2920505' ::>`
        }
      }]
    }
  }
}
