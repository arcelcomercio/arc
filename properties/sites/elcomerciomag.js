export default {
  siteName: 'Mag.',
  sitemapNewsName: 'El Comercio Mag',

  googleFonts: 'Fira+Sans:400,600,700|Noto+Serif:400,700',

  colorPrimary: '#262627',
  siteDomain: 'elcomercio.pe',
  siteUrl: 'https://mag.elcomercio.pe',
  resizerUrl: 'https://elcomercio.pe/resizer',
  siteUrlAlternate: 'https://m.mag.elcomercio.pe',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/elcomerciomag/web/post/default/preroll&description_url=https%3A%2F%2Fmag.elcomercio.pe%2F&tfcd=0&npa=0&sz=640x480|640x360|400x300&cust_params=fuente%3Dweb%26publisher%3Delcomerciomag%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/elcomerciomag/amp/post/default/preroll&description_url=https%3A%2F%2Fmag.elcomercio.pe%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Damp%26publisher%3Delcomerciomag%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-PFFL5R9',
  ampGoogleTagManagerId: 'UA-3055636-11',
  ampGoogleTagManagerName: 'elcomercio',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-11',
  fbArticleStyle: 'LogoElcomercio',
  nameStoryRelated: 'VEA TAMBIÉN',
  siteDescription:
    'Noticias de Perú y el mundo en Elcomercio.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://publimetro.pe/f/i/pub_40.png',
  infoPagesDev: {
    termsAndConditions: '',
    guidingPrinciples: 'EBRJ4RIQHRAODCY4G5ML4IZNUU',
    privacyPolicies: '',
    integratedManagementPolicy: 'SWL33JT6F5CDFD6457MFG76J3I',
    arcoProcedure: 'ZJVJVIL7MJGJBCZMD3YELB7PWA',
    cookiesPolicy: '',
    aboutUs: '',
    frequentQuestions: '',
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

  assets: {
    path: `/resources/dist/elcomerciomag/`,
    paywall() {
      return `${this.path}${this.aniversario}`
    },
    aniversario: `images/aniversario.svg`,
    nav: {
      logo: 'white-logo.png',
    },
    header: {
      logo: 'white-logo.png',
      inverted: 'logo.png',
    },
    footer: {
      logo: 'logo.png',
    },
    seo: {
      logoAmp: 'logo-143x60.png',
      width: 143,
      height: 60,
      widthAmp: 81,
      heightAmp: 37,
    },
    premium: {
      logo: 'premium-logo.png',
    },
  },

  legalLinks: [
    {
      name: 'Términos y condiciones de uso',
      url: 'https://elcomercio.pe/terminos-y-condiciones/',
    },
    {
      name: 'Políticas de Privacidad',
      url: 'https://elcomercio.pe/politicas-privacidad/',
    },
    {
      name: 'Politicas de Cookies',
      url: 'https://elcomercio.pe/politica-de-cookies/',
    },
  ],
  socialNetworks: [
    {
      name: 'facebook',
      url: 'https://www.facebook.com/elcomercio.pe',
    },
    {
      name: 'twitter',
      url: 'https://twitter.com/elcomercio_peru',
    },
  ],
  social: {
    facebook: {
      user: '@elcomercio.pe',
      url: 'https://www.facebook.com/elcomercio.pe',
    },
    twitter: {
      user: '@elcomercio_peru',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
  },
  listUrlAdvertisings: [
    'https://d1r08wok4169a5.cloudfront.net/ads-elcomercio/ads-fia-28253241-eco_ia_interna1-300x250-div-gpt-ad-8599377-16.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-elcomercio/ads-fia-28253241-eco_ia_interna2-300x250-div-gpt-ad-8599377-17.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-elcomercio/ads-fia-28253241-eco_ia_interna3-300x250-div-gpt-ad-8599377-18.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-elcomercio/ads-fia-28253241-eco_ia_interna4-300x250-div-gpt-ad-8599377-19.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-elcomercio/ads-fia-28253241-eco_ia_interna5-300x250-div-gpt-ad-8599377-20.html',
  ],
  activeSignwall: false,
  activePaywall: false,
  activeNewsletter: false,
  signwall: {
    mainColorBg: '#000000',
    mainColorTxt: '#ffffff',
    mainLogo: 'white-logo.png',
    mainColorBr: '#cccccc',
    mainColorLink: '#1c75c9',
    mainColorBtn: '#000000',
    authProviders: ['facebook'],
  },
  gda: true, // Grupo Diarios de America
  taboola: {
    dataModeAmp: 'thumbnails-a-amp',
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
              zoneId: `<::getAdsDisplay() === 'mobile' ? '1720442' : '1717038' ::>`,
              siteId: `<::getAdsDisplay() === 'mobile' ? '329886' : '329632' ::>`,
              accountId: '19186'
          }
        }, {
          bidder: 'appnexus',
          labels: ['desktop', 'phone'],
          params: {
              placementId: `<::getAdsDisplay() === 'mobile' ? '19312188' : '19312181' ::>`
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
              siteId: '354249',
              pageId: `<::getAdsDisplay() === 'mobile' ? '1239552' : '1239551' ::>`,
              formatId: '74156'
          }
        },{
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920481'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop', 'phone'],
          params: {
              publisherId: '157414',
              adSlot: `<::getAdsDisplay() === 'mobile' ? '2920480' : '2920482' ::>`
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
              zoneId: '1717032',
              siteId: '329632',
              accountId: '19186'
          }
        }, {
          bidder: 'appnexus',
          labels: ['desktop'],
          params: {
              placementId: '19312186'
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
              siteId: '354249',
              pageId: '1239551',
              formatId: '90175'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920466'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920467'
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
            zoneId: '1717034',
            siteId: '329632',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19312187'
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
            siteId: '354249',
            pageId: '1239551',
            formatId: '90176'
        }
      },{
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920468'
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
            zoneId: '1720446',
            siteId: '329886',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19312191'
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
            siteId: '354249',
            pageId: '1239552',
            formatId: '90177'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920470'
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
            zoneId: '1720448',
            siteId: '329886',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19312192'
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
            siteId: '354249',
            pageId: '1239552',
            formatId: '90178'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920472'
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
            zoneId: '1720450',
            siteId: '329886',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19312193'
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
            siteId: '354249',
            pageId: '1239552',
            formatId: '90179'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920474'
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
            zoneId: '1717050',
            siteId: '329632',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19312184'
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
            siteId: '354249',
            pageId: '1239551',
            formatId: '90173'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920475'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920476'
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
            zoneId: '1717052',
            siteId: '329632',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19312185'
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
            siteId: '354249',
            pageId: '1239551',
            formatId: '90174'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920477'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920478'
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
            zoneId: `<::getAdsDisplay() === 'mobile' ? '1720444' : '1717046' ::>`,
            siteId: `<::getAdsDisplay() === 'mobile' ? '329886' : '329632' ::>`,
            accountId: '19186'
        }
      },{
        bidder: 'appnexus',
        labels: ['desktop', 'phone'],
        params: {
            placementId: `<::getAdsDisplay() === 'mobile' ? '19312189' : '19312183' ::>`
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
            siteId: '354249',
            pageId: `<::getAdsDisplay() === 'mobile' ? '1239552' : '1239551' ::>`,
            formatId: '74162'
        }
      },{
        bidder: 'pubmatic',
        labels: ['desktop', 'phone'],
        params: {
            publisherId: '157414',
            adSlot: `<::getAdsDisplay() === 'mobile' ? '2920484' : '2920485' ::>`
        }
      }]
    }
  }
}
