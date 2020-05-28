export default {
  siteName: 'Depor',
  sitemapNewsName: 'Diario Depor',
  newsletterBrand: 'depor',
  /*   googleFonts: 'Noticia+Text:400,700|Roboto+Condensed:400,700|Roboto:400,700', */
  colorPrimary: '#007c31',
  siteDomain: 'depor.com',
  siteUrl: 'https://depor.com',
  resizerUrl: 'https://depor.com/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    //  'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/DEPOR_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/depor/web/post/default/preroll&description_url=https%3A%2F%2Fdepor.com%2F&tfcd=0&npa=0&sz=640x480|640x360|400x300&cust_params=fuente%3Dweb%26publisher%3Ddepor%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/depor/amp/post/default/preroll&description_url=https%3A%2F%2Fdepor.com%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Damp%26publisher%3Ddepor%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  fbAppId: 'fbappidDEEEEEPOR',
  googleTagManagerId: 'GTM-PFPMXLF',
  ampGoogleTagManagerId: 'UA-3055636-8',
  ampGoogleTagManagerName: 'depor',
  charbeatAccountNumber: 99999,
  idGoogleAnalitics: 'UA-3055636-8',
  fbArticleStyle: 'LogoDepor',
  nameStoryRelated: 'RELACIONADAS',
  mobileHeaderFollowing: 'Siguenos en Depor',
  siteDescription:
    'Noticias de Perú y el mundo en Depor.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
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
    termsAndConditions: 'GKC4YH3FBZGGJNFEPGO7KMPN7U',
    guidingPrinciples: '',
    privacyPolicies: 'NJZXERE3WVG5DB65JP7PGTLCV4',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: '5ORUCK2RHBCH5CUYD4XIAVLQ2E',
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
    errorTitle: '¡Oops! la pagina no fue encontrada en Depor',
    errorDescription:
      'La página que buscas no existe, probablemente el enlace que usaste es erróneo, intenta ubicarlo en la página principal o usa el buscador para encontrar la noticia que buscas:',
  },

  legalLinks: [
    {
      name: 'Términos y Condiciones',
      url: '/terminos-servicio/',
    },
    {
      name: 'Políticas de Privacidad',
      url: '/politicas-privacidad/',
    },
    {
      name: 'Politicas de Cookies',
      url: '/politicas-cookies/',
    },
  ],

  socialNetworks: [
    {
      name: 'Twitter',
      url: 'https://twitter.com/tuitdepor',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/deporperu',
    },
    {
      name: 'Pinterest',
      url: 'https://www.pinterest.com/deporpe',
    },
    {
      name: 'RSS ',
      url: 'https://depor.com/arcio/rss',
    },
  ],
  social: {
    facebook: {
      user: '@deporperu',
      url: 'https://www.facebook.com/deporperu',
    },
    twitter: {
      user: 'tuitdepor',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
  },
  listUrlAdvertisings: [
    'https://d1r08wok4169a5.cloudfront.net/ads-depor/ads-fia-28253241-dep_ia_interna1-300x250-div-gpt-ad-8599377-11.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-depor/ads-fia-28253241-dep_ia_interna2-300x250-div-gpt-ad-8599377-12.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-depor/ads-fia-28253241-dep_ia_interna3-300x250-div-gpt-ad-8599377-13.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-depor/ads-fia-28253241-dep_ia_interna4-300x250-div-gpt-ad-8599377-14.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-depor/ads-fia-28253241-dep_ia_interna5-300x250-div-gpt-ad-8599377-15.html',
  ],
  activeSignwall: true,
  activePaywall: false,
  activeNewsletter: false,
  signwall: {
    mainColorBg: '#007c31',
    mainColorTxt: '#ffffff',
    mainLogo: 'alternate-logo.png',
    mainColorBr: '#d5d945',
    mainColorLink: '#007c31',
    mainColorBtn: '#007c31',
    authProviders: ['facebook'],
  },
  isDfp: true,
  top: {
    prebid:{
      enabled: true,
        bids: [
          {
            bidder: 'appnexus', labels: ['desktop', 'phone'],
            params: {placementId: `<::getAdsDisplay() === 'mobile' ? '19294436' : '19294314' ::>`}
          },
          {
            bidder: 'rubicon', labels: ['desktop', 'phone'],
            params: {
              accountId: '19186', 
              siteId : `<::getAdsDisplay() === 'mobile' ? '215762' : '215760' ::>`,
              zoneId : `<::getAdsDisplay() === 'mobile' ? '1704488' : '1704496' ::>`
            }
          },
          {
            bidder: 'criteo', labels: ['desktop', 'phone'], params: { networkId: '7890' }
          },
          {
            bidder: 'smartadserver', labels: ['desktop', 'phone'],
            params: {
              siteId : `<::getAdsDisplay() === 'mobile' ? '353418' : '283399' ::>`,
              pageId : '1237243',
              formatId :'74156'
            }
          },
          {
            bidder: 'pubmatic',
            labels: ['desktop'],
            params: {
                publisherId: '157414',
                adSlot: '2920421'
            }
          }, {
            bidder: 'pubmatic',
            labels: ['desktop', 'phone'],
            params: {
                publisherId: '157414',
                adSlot: `<::getAdsDisplay() === 'mobile' ? '2920420' : '2920422' ::>`
            }
          },
          {
            bidder: 'adpone',labels: ['desktop'],params: { placementId: '1204171840339'}
          }
        ]
    }
  },
  caja1 : {
    prebid:{
      enabled: true,
        bids: [
          {
            bidder: 'appnexus', labels: ['desktop'],
            params: { placementId: '19294320' }
          },
          {
            bidder: 'rubicon',
            labels: ['desktop'],
            params: {
              accountId: '19186',
              siteId : '215760',
              zoneId : '1704492',
            }
          },
          {
            bidder: 'criteo',
            labels: ['desktop'],
            params: {
              networkId: '7890' 
            }
          },
          {
            bidder: 'smartadserver',
            labels: ['desktop'],
            params: {
              siteId : '283399',
              pageId : '1237243',
              formatId : '90175'
            }
          },
          {
            bidder: 'pubmatic',
            labels: ['desktop'],
            params: {
                publisherId: '157414',
                adSlot: '2920406'
            }
          }, {
            bidder: 'pubmatic',
            labels: ['desktop'],
            params: {
                publisherId: '157414',
                adSlot: '2920407'
            }
          },
          {
            bidder: 'adpone',
            labels: ['desktop'],
            params: {
              placementId: '12041718424252'
            }
          }
        ]
    }
  },
  caja2: {
    prebid:{
      enabled: true,
      bids: [
        {
          bidder: 'appnexus',
          labels: ['desktop'],
          params: {
            placementId: '19294321'
          }
        },
        {
          bidder: 'rubicon',
          labels: ['desktop'],
          params: {
            accountId: '19186',
            siteId : '215760',
            zoneId : '1704494',
          }
        },
        {
          bidder: 'criteo',
          labels: ['desktop'],
          params: {
            networkId: '7890' 
          }
        },
        {
          bidder: 'smartadserver',
          labels: ['desktop'],
          params: { 
            siteId : '283399',
            pageId : '1237243',
            formatId : '90176'
          }
        },
        {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920408'
          }
        },
        {
          bidder: 'adpone',
          labels: ['desktop'],
          params: {
            placementId: '120417184450199'
          }
        }
      ]
    }
  },
  caja3 : {
    prebid:{
      enabled: true,
      bids: [
        {
          bidder: 'appnexus',
          labels: ['phone'],
          params: {
            placementId: '19294438'
          }
        },
        {
          bidder: 'rubicon',
          labels: ['phone'],
          params: {
            accountId: '19186',
            siteId : '215762',
            zoneId : '1704482',
          }
        },
        {
          bidder: 'criteo',
          labels: ['phone'],
          params: {
            networkId: '7890' 
          }
        },
        {
          bidder: 'smartadserver',
          labels: ['phone'],
          params: {
            siteId : '353418',
            pageId : '1237243',
            formatId : '90177'
          }
        },
        {
          bidder: 'pubmatic',
          labels: ['phone'],
          params: {
              publisherId: '157414',
              adSlot: '2920410'
          }
        },
        {
          bidder: 'adpone',
          labels: ['phone'],
          params: {
            placementId: '12041718460820'
          }
        }
      ]
    }
  },
  caja4 : {
    prebid:{
      enabled: true,
      bids: [
        {
          bidder: 'appnexus',
          labels: ['phone'],
          params: {
            placementId: '19294439'
          }
        },
        {
          bidder: 'rubicon',
          labels: ['phone'],
          params: {
            accountId: '19186',
            siteId : '215762',
            zoneId : '1704484',
          }
        },
        {
          bidder: 'criteo',
          labels: ['phone'],
          params: {
            networkId: '7890' 
          }
        },
        {
          bidder: 'smartadserver',
          labels: ['phone'],
          params: {
            siteId : '353418',
            pageId : '1237243',
            formatId : '90178'
          }
        },{
          bidder: 'pubmatic',
          labels: ['phone'],
          params: {
              publisherId: '157414',
              adSlot: '2920412'
          }
        },
        {
          bidder: 'adpone',
          labels: ['phone'],
          params: {
            placementId: '12041718471768'
          }
        }
      ]
    }
  },
  caja5 : {
    prebid:{
      enabled: true,
      bids: [
        {
          bidder: 'appnexus',
          labels: ['phone'],
          params: {
            placementId: '19294440'
          }
        },
        {
          bidder: 'rubicon',
          labels: ['phone'],
          params: {
            accountId: '19186',
            siteId : '215762',
            zoneId : '1704486',
          }
        },
        {
          bidder: 'criteo',
          labels: ['phone'],
          params: {
            networkId: '7890' 
          }
        },
        {
          bidder: 'smartadserver',
          labels: ['phone'],
          params: {
            siteId : '353418',
            pageId : '1237243',
            formatId : '90179'
          }
        },{
          bidder: 'pubmatic',
          labels: ['phone'],
          params: {
              publisherId: '157414',
              adSlot: '2920414'
          }
        },
        {
          bidder: 'adpone',
          labels: ['phone'],
          params: {
            placementId: '120417184834766'
          }
        }
      ]
    }
  },
  laterall : {
    prebid:{
      enabled: true,
      bids: [
        {
          bidder: 'appnexus',
          labels: ['desktop'],
          params: {
            placementId: '19294317'
          }
        },
        {
          bidder: 'rubicon',
          labels: ['desktop'],
          params: {
            accountId: '19186',
            siteId : '215760',
            zoneId : '1704500',
          }
        },
        {
          bidder: 'criteo',
          labels: ['desktop'],
          params: {
            networkId: '7890' 
          }
        },
        {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920415'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920416'
          }
        },
        {
          bidder: 'smartadserver',
          labels: ['desktop'],
          params: {
            siteId : '283399',
            pageId : '1237243',
            formatId : '90173'
          }
        }
      ]
    }
  },
  lateralr : {
    prebid:{
      enabled: true,
      bids: [
        {
          bidder: 'appnexus',
          labels: ['desktop'],
          params: {
            placementId: '19294319'
          }
        },
        {
          bidder: 'rubicon',
          labels: ['desktop'],
          params: {
            accountId: '19186',
            siteId : '215760',
            zoneId : '1704502',
          }
        },
        {
          bidder: 'criteo',
          labels: ['desktop'],
          params: {
            networkId: '7890' 
          }
        },
        {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920417'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920418'
          }
        },
        {
          bidder: 'smartadserver',
          labels: ['desktop'],
          params: {
            siteId : '283399',
            pageId : '1237243',
            formatId : '90174'
          }
        }
      ]
    }
  },
  zocalo : {
    prebid:{
      enabled: true,
      bids: [
        {
          bidder: 'appnexus',
          labels: ['desktop', 'phone'],
          params: {
            placementId: `<::getAdsDisplay() === 'mobile' ? '19294437' : '19294316' ::>`
          }
        },
        {
          bidder: 'rubicon',
          labels: ['desktop', 'phone'],
          params: {
            accountId: '19186',
            siteId : `<::getAdsDisplay() === 'mobile' ? '215762' : '215760' ::>`,
            zoneId : `<::getAdsDisplay() === 'mobile' ? '1704490' : '1704498' ::>`,
          }
        },
        {
          bidder: 'criteo',
          labels: ['desktop', 'phone'],
          params: {
            networkId: '7890' 
          }
        },
        {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920425'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['phone'],
          params: {
              publisherId: '157414',
              adSlot: '2920424'
          }
        },
        {
          bidder: 'smartadserver',
          labels: ['desktop', 'phone'],
          params: {
            siteId : `<::getAdsDisplay() === 'mobile' ? '353418' : '283399' ::>`,
            pageId : '1237243',
            formatId :'74162'
          }
        },
        {
          bidder: 'adpone',
          labels: ['desktop'],
          params: {
            placementId: '120417184140495'
          }
        }
      ]
    }
  }
}
