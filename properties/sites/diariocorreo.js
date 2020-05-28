export default {
  siteName: 'Correo',
  sitemapNewsName: 'Diario Correo',
  newsletterBrand: 'correo',
  // colorPrimary: '#8F071F',
  colorPrimary: '#444444',
  colorSecondary: '#F4E0D2',
  googleFonts: 'Titillium+Web:400,600,700,900|Roboto+Slab:400,700',
  siteDomain: 'diariocorreo.pe',
  siteUrl: 'https://diariocorreo.pe',
  resizerUrl: 'https://diariocorreo.pe/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    // 'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/Correo_Preroll&description_url=https%3A%2F%2Fdiariocorreo.pe&tfcd=0&npa=0&sz=640x360&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/diariocorreo/web/post/default/preroll&description_url=https%3A%2F%2Fdiariocorreo.pe%2F&tfcd=0&npa=0&sz=640x480|640x360|400x300&cust_params=fuente%3Dweb%26publisher%3Ddiariocorreo%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/diariocorreo/amp/post/default/preroll&description_url=https%3A%2F%2Fdiariocorreo.pe%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Damp%26publisher%3Ddiariocorreo%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  fbAppId: '1390081201315241',
  googleTagManagerId: 'GTM-TD2GS9Q',
  ampGoogleTagManagerId: 'UA-22221683-1',
  ampGoogleTagManagerName: 'correo',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-22221683-1',
  fbArticleStyle: 'default',
  nameStoryRelated: 'VEA TAMBIÉN',

  siteDescription:
    'Noticias de Perú y el mundo en Diario Correo.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://diariocorreo.pe/f/i/pub_40.png',
  theme: {
    color: '#8F071F',
  },
  infoPagesDev: {
    termsAndConditions: 'HWBJLS7YVZBSJJHEW565456ZQQ',
    guidingPrinciples: '',
    privacyPolicies: 'TOXYYYXS75HG5FLUT32PIZIFKM',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'LNDHYOVT3FBTLCKME4EKQQMNLM',
    aboutUs: 'AH524OO2XFEE3CZBDR3VZTXN6A',
    frequentQuestions: 'TAKBHA5E4JBONGF5UAWFDAU2GM',
  },
  infoPagesProd: {
    termsAndConditions: '2NBNX77YV5CG3PQOMD4RPZSYJE',
    guidingPrinciples: '',
    privacyPolicies: 'OVE4XRC7VNETHHOBC64JISOG7U',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'FAZESR2JTBBTZLBSEKCUR42DRA',
    aboutUs: '',
    frequentQuestions: '',
  },
  paywall: {
    title: 'Diario Correo | Suscripciones Digitales',
  },
  assets: {
    nav: {
      logoSomos: 'logo.png',
    },
    seo: {
      logoAmp: 'logo-amp.png',
      width: 214,
      height: 60,
      widthAmp: 35,
      heightAmp: 40,
    },
    path: `/resources/dist/diariocorreo/`,
    paywall: {
      icon: `images/favicon.png`,
      apple_icon: 'images/apple-touch-icon.png',
      apple_icon_76: 'images/apple-touch-icon-76x76.png',
      apple_icon_120: 'images/apple-touch-icon-120x120.png',
      apple_icon_144: 'images/apple-touch-icon-144x144.png',
      apple_icon_152: 'images/apple-touch-icon-152x152.png',
      apple_icon_180: 'images/apple-touch-icon-180x180.png',
      logo: `images/logo.svg`,
      lector: `images/img_lector.png`,
      confirmation: `images/img_confirmation.jpg`,
      confirmation_webp: `images/img_confirmation_1.webp`,
      support: `images/img_soporte.png`,
      contact_form_left: 'images/adult-attire-blazer-173125@2x.jpg',
      support_webp: `images/img_soporte.webp`,
      backgroundx1: `images/bg-planes-10.png`,
    },
    fullAssets(contextPath, deployment = path => path) {
      return image => deployment(`${contextPath}${this.pwAssets(image)}`)
    },
    pwAssets(image = 'logo') {
      return `${this.path}${this.paywall[image]}`
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
      name: 'Politica de Cookies',
      url: '/politica-de-cookies/',
    },
    {
      name: 'Oficinas Concesionarias',
      url: '/oficinas-concesionarias/',
    },
  ],
  socialNetworks: [
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/',
    },
    {
      name: 'facebook',
      url: 'https://www.facebook.com/CorreoPeru/',
    },
    {
      name: 'twitter',
      url: 'https://twitter.com/diariocorreo',
    },
  ],
  social: {
    facebook: {
      user: '@CorreoPeru',
      url: 'https://www.facebook.com/CorreoPeru/',
    },
    twitter: {
      user: 'diariocorreo',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
  },
  listUrlAdvertisings: [
    'https://d1r08wok4169a5.cloudfront.net/ads-diariocorreo/ads-fia-28253241-cor_ia_interna1-300x250-div-gpt-ad-8599377-6.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-diariocorreo/ads-fia-28253241-cor_ia_interna2-300x250-div-gpt-ad-8599377-7.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-diariocorreo/ads-fia-28253241-cor_ia_interna3-300x250-div-gpt-ad-8599377-8.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-diariocorreo/ads-fia-28253241-cor_ia_interna4-300x250-div-gpt-ad-8599377-9.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-diariocorreo/ads-fia-28253241-cor_ia_interna5-300x250-div-gpt-ad-8599377-10.html',
  ],
  activeSignwall: false,
  activePaywall: false,
  activeNewsletter: false,
  signwall: {
    mainColorBg: '#000000',
    mainColorTxt: '#ffffff',
    mainLogo: 'logo.png',
    mainColorBr: '#feabab',
    mainColorLink: '#c00000',
    mainColorBtn: '#d31e18',
    authProviders: ['facebook'],
  },
  taboola: {
    dataModeAmp: 'thumbnails-e',
    mode: 'thumbnails-c',
  },
  stick: {
    logo: 'logo-stick.png',
  },
  isDfp: true,
  top: {
    prebid:{
      enabled: true,
        bids: [{
          bidder: 'rubicon',
          labels: ['desktop', 'phone'],
          params: {
              zoneId: `<::getAdsDisplay() === 'mobile' ? '1717076' : '1716942' ::>`,
              siteId: `<::getAdsDisplay() === 'mobile' ? '215778' : '215776' ::>`,
              accountId: '19186'
          }
        }, {
          bidder: 'appnexus',
          labels: ['desktop', 'phone'],
          params: {
              placementId: `<::getAdsDisplay() === 'mobile' ? '19311952' : '19311946' ::>`
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
              siteId: '316985',
              pageId: `<::getAdsDisplay() === 'mobile' ? '1239542' : '1239541' ::>`,
              formatId: '74156'
          }
        },{
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920401'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop', 'phone'],
          params: {
              publisherId: '157414',
              adSlot: `<::getAdsDisplay() === 'mobile' ? '2920400' : '2920402' ::>`
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
              zoneId: '1716936',
              siteId: '215776',
              accountId: '19186'
          }
        }, {
          bidder: 'appnexus',
          labels: ['desktop'],
          params: {
              placementId: '19311954'
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
              siteId: '316985',
              pageId: '1239541',
              formatId: '90175'
          }
        },{
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920386'
          }
        }, {
          bidder: 'pubmatic',
          labels: ['desktop'],
          params: {
              publisherId: '157414',
              adSlot: '2920387'
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
            zoneId: '1716940',
            siteId: '215776',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19311955'
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
            siteId: '316985',
            pageId: '1239541',
            formatId: '90176'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920388'
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
            zoneId: '1717084',
            siteId: '215778',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19311961'
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
            siteId: '316985',
            pageId: '1239542',
            formatId: '90177'
        }
      },{
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920390'
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
            zoneId: '1717086',
            siteId: '215778',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19311962'
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
            siteId: '316985',
            pageId: '1239542',
            formatId: '90178'
        }
      },{
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920392'
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
            zoneId: '1717088',
            siteId: '215778',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['phone'],
        params: {
            placementId: '19311963'
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
            siteId: '316985',
            pageId: '1239542',
            formatId: '90179'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['phone'],
        params: {
            publisherId: '157414',
            adSlot: '2920394'
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
            zoneId: '1716948',
            siteId: '215776',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19311950'
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
            siteId: '316985',
            pageId: '1239541',
            formatId: '90173'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920395'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920396'
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
            zoneId: '1716952',
            siteId: '215776',
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop'],
        params: {
            placementId: '19311951'
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
            siteId: '316985',
            pageId: '1239541',
            formatId: '90174'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920397'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop'],
        params: {
            publisherId: '157414',
            adSlot: '2920398'
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
            zoneId: `<::getAdsDisplay() === 'mobile' ? '1717082' : '1716944' ::>`,
            siteId: `<::getAdsDisplay() === 'mobile' ? '215778' : '215776' ::>`,
            accountId: '19186'
        }
      }, {
        bidder: 'appnexus',
        labels: ['desktop', 'phone'],
        params: {
            placementId: `<::getAdsDisplay() === 'mobile' ? '19311953' : '19311948' ::>`
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
            siteId: '316985',
            pageId: `<::getAdsDisplay() === 'mobile' ? '1239542' : '1239541' ::>`,
            formatId: '74162'
        }
      }, {
        bidder: 'pubmatic',
        labels: ['desktop', 'phone'],
        params: {
            publisherId: '157414',
            adSlot: `<::getAdsDisplay() === 'mobile' ? '2920404' : '2920405' ::>`
        }
      }]
    }
  }
}
