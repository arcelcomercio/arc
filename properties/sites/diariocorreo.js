export default {
  siteName: 'Correo',
  sitemapNewsName: 'Diario Correo',
  siteTitle: 'Correo',
  newsletterBrand: 'correo',
  // colorPrimary: '#8F071F',
  colorPrimary: '#444444',
  colorSecondary: '#F4E0D2',
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
    dataTreatment: 'XBBPTZ6Z2VFJLADYUNYWOG6MV4',
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
    dataTreatment: 'SPUPTTDPTJB23N75FQ2QBMYCYA',
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
    fullAssets(contextPath, deployment = (path) => path) {
      return (image) => deployment(`${contextPath}${this.pwAssets(image)}`)
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
  activeSignwall: true,
  activeVerifyEmail: true,
  activeDataTreatment: true,
  activePhoneRegister: true,
  signwall: {
    mainColorBg: '#000000',
    mainColorTxt: '#ffffff',
    mainLogo: 'logo.png',
    mainColorBr: '#feabab',
    mainColorLink: '#c00000',
    mainColorBtn: '#d31e18',
    authProviders: ['facebook', 'google'],
  },
  taboola: {
    dataModeAmp: 'thumbnails-e',
    mode: 'thumbnails-c',
  },
  stick: {
    logo: 'logo-stick.png',
  },
  isDfp: true,
  archiveLimit: '2008-12-31',

  jwplayers: {
    gec: {
      playerAds: 'uR4oallO',
      player: '4p8sD5TM',
    },
  },
  jwplayersMatching: {
    playerId: 'uR4oallO',
    videoId: 'ppfqkcKN',
  },
}
