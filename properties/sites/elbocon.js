export default {
  siteName: 'El Bocón',
  sitemapNewsName: 'El Bocón',
  siteTitle: 'El Bocón',
  colorPrimary: '#444444',
  colorSecondary: '#F4E0D2',
  siteDomain: 'elbocon.pe',
  siteUrl: 'https://elbocon.pe',
  resizerUrl: 'https://elbocon.pe/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    // 'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/Bocon_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/elbocon/web/post/default/preroll&description_url=https%3A%2F%2Felbocon.pe%2F&tfcd=0&npa=0&sz=640x480|640x360|400x300&cust_params=fuente%3Dweb%26publisher%3Delbocon%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/elbocon/amp/post/default/preroll&description_url=https%3A%2F%2Felbocon.pe%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Damp%26publisher%3Delbocon%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-WB49SJD',
  ampGoogleTagManagerId: 'UA-15667156-1',
  ampGoogleTagManagerName: 'elbocon',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-15667156-1',
  fbArticleStyle: 'default',
  nameStoryRelated: 'VEA TAMBIÉN',

  siteDescription:
    'Noticias de Perú y el mundo en Elbocon.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://elbocon.pe/f/i/pub_40.png',
  theme: {
    color: '#8F071F',
  },
  infoPagesDev: {
    termsAndConditions: '',
    guidingPrinciples: '',
    privacyPolicies: '',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: '',
    aboutUs: 'AH524OO2XFEE3CZBDR3VZTXN6A',
    frequentQuestions: 'TAKBHA5E4JBONGF5UAWFDAU2GM',
  },
  infoPagesProd: {
    termsAndConditions: 'HZEXCT3K3RFM5EJXLMK3TBD3YU',
    guidingPrinciples: '',
    privacyPolicies: 'DUHIZXS5GJHDNBVRMBLFLKLB6E',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: '4V3RWECMVVAY7AIQQZCBXFSCUM',
    aboutUs: '',
    frequentQuestions: '',
  },
  paywall: {
    title: 'El Bocón | Suscripciones Digitales',
  },
  assets: {
    nav: {
      logoSomos: 'logo.png',
    },
    seo: {
      logoAmp: 'logo-amp.png',
      width: 246,
      height: 60,
      widthAmp: 178,
      heightAmp: 47,
    },
    path: `/resources/dist/elbocon/`,
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
  ],

  socialNetworks: [
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/company/diario-el-bocon/',
    },
    {
      name: 'facebook',
      url: 'https://www.facebook.com/DiarioElBocon',
    },
    {
      name: 'twitter',
      url: 'https://twitter.com/elbocononline',
    },
  ],
  social: {
    facebook: {
      user: '@DiarioElBocon',
      url: 'https://www.facebook.com/DiarioElBocon',
    },
    twitter: {
      user: 'elbocononline',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
  },
  listUrlAdvertisings: [
    'https://d1r08wok4169a5.cloudfront.net/ads-elbocon/ads-fia-28253241-boc_ia_interna1-300x250-div-gpt-ad-8599377-1.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-elbocon/ads-fia-28253241-boc_ia_interna2-300x250-div-gpt-ad-8599377-2.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-elbocon/ads-fia-28253241-boc_ia_interna3-300x250-div-gpt-ad-8599377-3.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-elbocon/ads-fia-28253241-boc_ia_interna4-300x250-div-gpt-ad-8599377-4.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-elbocon/ads-fia-28253241-boc_ia_interna5-300x250-div-gpt-ad-8599377-5.html',
  ],
  activeSignwall: false,
  activePaywall: false,
  activeRulesCounter: false,
  activeNewsletter: false,
  signwall: {
    mainColorBg: '#333333',
    mainColorTxt: '#ffffff',
    mainLogo: 'logo.png',
    mainColorBr: '#feabab',
    mainColorLink: '#c2080e',
    mainColorBtn: '#d20100',
    authProviders: ['facebook'],
  },
  taboola: {
    dataModeAmp: 'thumbs-feed-01',
    mode: 'thumbnails-c',
  },
  isDfp: true,
  archiveLimit: '2008-12-31',
}
