export default {
  siteName: 'Publimetro Perú',
  sitemapNewsName: 'Publimetro Perú',
  // googleFonts: 'Roboto', // corpidbold, corpidregular

  colorPrimary: '#265922',
  siteDomain: 'publimetro.pe',
  siteUrl: 'https://publimetro.pe',
  resizerUrl: 'https://publimetro.pe/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    // 'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/Publimetro_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/publimetro/web/post/default/preroll&description_url=https%3A%2F%2Fpublimetro.pe%2F&tfcd=0&npa=0&sz=640x360&cust_params=fuente%3Dweb%26publisher%3Dpublimetro%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/publimetro/amp/post/default/preroll&description_url=https%3A%2F%2Fpublimetro.pe%2F&tfcd=0&npa=0&sz=640x360&cust_params=fuente%3Damp%26publisher%3Dpublimetro%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  fbAppId: '189362231408765',
  googleTagManagerId: 'GTM-NSWLD37',
  ampGoogleTagManagerId: 'UA-3055636-18',
  ampGoogleTagManagerName: 'publimetro',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-18',
  fbArticleStyle: 'LogoPublimetro',
  nameStoryRelated: 'Relacionadas',
  siteDescription:
    'Noticias de Perú y el mundo en Publimetro.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://publimetro.pe/f/i/pub_40.png',
  infoPagesDev: {
    termsAndConditions: 'H64O2THIKJA6XADJ5SZ5H45TNQ',
    guidingPrinciples: '',
    privacyPolicies: 'GIHRVZFK3NCAZCLXDCANNMMFQY',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'KDOVTQJPQZCYXGUP2FEU6SPBFU',
    aboutUs: '',
    frequentQuestions: '',
  },
  infoPagesProd: {
    termsAndConditions: '7LCOBEFUC5ASBM6VZ5AEOMDNEA',
    guidingPrinciples: '',
    privacyPolicies: 'TTLUI7EEDFGFJOPXCNAT6RVUDU',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: '7IZ6FX7Q6BAZ5OIEA5YVIYL6NQ',
    aboutUs: '',
    frequentQuestions: '',
  },
  assets: {
    nav: {
      logo: 'logo.png',
      logoSomos: 'white-logo.png',
    },
    header: {
      logo: 'logo.png',
    },
    footer: {
      logo: 'logo.png',
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

  footer: {
    socialNetworks: [
      {
        name: 'facebook',
        url: 'https://www.facebook.com/publimetrope',
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/publimetrope',
      },
    ],
  },
  social: {
    facebook: {
      name: 'facebook',
      user: '@publimetrope',
      url: 'http://facebook.com/publimetrope',
    },
    twitter: {
      name: 'twitter',
      user: 'publimetrope',
      url: 'http://twitter.com/publimetrope',
    },
    youtube: {
      name: 'youtube',
      url: '/',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
  },
  listUrlAdvertisings: [
    'https://d1r08wok4169a5.cloudfront.net/ads-publimetro/ads-fia-28253241-pub_ia_interna1-300x250-div-gpt-ad-8599377-41.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-publimetro/ads-fia-28253241-pub_ia_interna2-300x250-div-gpt-ad-8599377-42.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-publimetro/ads-fia-28253241-pub_ia_interna3-300x250-div-gpt-ad-8599377-43.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-publimetro/ads-fia-28253241-pub_ia_interna4-300x250-div-gpt-ad-8599377-44.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-publimetro/ads-fia-28253241-pub_ia_interna5-300x250-div-gpt-ad-8599377-45.html',
  ],
  activeSignwall: false,
  activePaywall: false,
  activeNewsletter: false,
  signwall: {
    mainColorBg: '#265922',
    mainColorTxt: '#ffffff',
    mainLogo: 'logo.png',
    mainColorBr: '#c3d1c2',
    mainColorLink: '#265922',
    mainColorBtn: '#265922',
  },
  isDfp: true,
  taboola: {
    dataModeAmp: 'thumbnails-e',
    mode: 'thumbnails-a',
  },
}
