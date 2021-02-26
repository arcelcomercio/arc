export default {
  siteName: 'Mag.',
  sitemapNewsName: 'MAG.',
  siteTitle: 'Mag.',
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
  googleNewsUrl:
    'https://news.google.com/publications/CAAqBwgKMPjjnQswie61Aw?hl=es-419&gl=PE&ceid=PE:es-419',
  googleNewsImage: 'https://elcomercio.pe/f/i/pub_40.png',
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
      logoAmp: 'white-logo.png',
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
      url: 'https://www.facebook.com/magelcomercio',
    },
    {
      name: 'twitter',
      url: 'https://twitter.com/Mag_ECpe',
    },
  ],
  social: {
    facebook: {
      user: '@magelcomercio',
      url: 'https://www.facebook.com/magelcomercio',
    },
    twitter: {
      user: 'Mag_ECpe',
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
  activeRulesCounter: false,
  activeNewsletter: false,
  activeVerifyEmail: false,
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
  archiveLimit: '2018-09-18',

  jwplayers: {
    gec: { playerAds: '51OUP8bN', player: '14qtfOVT' },
  },
  jwplayersMatching: {
    playerId: '51OUP8bN',
    videoId: 'aMo3zM1h',
  },
}
