export default {
  siteName: 'Ojo',
  sitemapNewsName: 'Diario Ojo',
  googleFonts: 'Alfa+Slab+One|Titillium+Web:400,700',

  // colorPrimary: '#007d33',
  colorPrimary: '#5fbb46',
  siteDomain: 'ojo.pe',
  siteUrl: 'https://ojo.pe',
  linkTabloide: 'http://ediciondigital.ojo.pe/lima/',
  resizerUrl: 'https://ojo.pe/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    // 'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/Ojo_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/ojo/web/post/default/preroll&description_url=https%3A%2F%2Fojo.pe%2F&tfcd=0&npa=0&sz=640x480&cust_params=fuente%3Dweb%26publisher%3Dojo%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/ojo/amp/post/default/preroll&description_url=https%3A%2F%2Fojo.pe%2F&tfcd=0&npa=0&sz=640x480&cust_params=fuente%3Damp%26publisher%3Dojo%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
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
  },
  taboola: {
    dataModeAmp: 'thumbnails-e',
    mode: 'thumbnails-a',
  },
  isDfp: true,
}
