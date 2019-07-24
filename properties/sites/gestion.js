export default {
  siteName: 'Gestión',
  colorPrimary: '#8F071F',
  colorSecondary: '#F4E0D2',
  googleFonts: 'Judson:400,700|Roboto|Libre+Franklin:500,700',
  siteDomain: 'gestion.pe',
  siteUrl: 'https://gestion.pe',
  linkTabloide: 'https://peruquiosco.pe/',
  resizerUrl: 'https://publimetro.pe/resizer', // Temporal hasta que activen el resizer para gestión
  resizerSecretKeyEnvVar: '',
  urlPreroll: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/GESTION_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-KFQK83S',
  ampGoogleTagManagerId: 'UA-3055636-3',
  ampGoogleTagManagerName: 'gestion',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-3',
  fbArticleStyle: 'LogoGestion',
  nameStoryRelated: 'VEA TAMBIÉN',

  siteDescription: 'Noticias de Perú y el mundo en Gestion.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://publimetro.pe/f/i/pub_40.png',
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
    termsAndConditions: 'VD45IRL65ZGCDBGLHL4O6WVCJE',
    guidingPrinciples: '',
    privacyPolicies: 'YK7SFEAX3VD4HOYGEPH3Y6ZYNQ',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'QCNTLMKRZJGJTO2ZB5AQAO4ODE',
    aboutUs: '5LTW3MZOP5AA5NTJ4GHA7NDK4A',
    frequentQuestions: 'TGDG422JBNHYFMU563BFRZDDDI',
  },

  assets: {
    nav: {
      logo: 'white-logo.png',
      logoSomos: 'white-logo.png',
    },
    seo: {
      logoAmp: 'logo-gestion-amp.png',
      width: 118,
      height: 26,
    },
    path: `/resources/dist/gestion/`,
    paywall: {
      logo: `images/logo.svg`,
      confirmation: `images/adult-attire-blazer-173125.jpg`,
      confirmationx2: `images/adult-attire-blazer-173125@2x.jpg`,
      lector: `images/img_lector.png`,
    },
    fullAssets(contextPath, deployment = path => path) {
      return image => deployment(`${contextPath}${this.pwAssets(image)}`)
    },
    pwAssets(image = 'logo') {
      return `${this.path}${this.paywall[image]}`
    },
  },
  legalLinks: [{
      name: '¿Quiénes somos?',
      url: '/quienes-somos',
    },
    {
      name: 'Términos de uso',
      url: '/terminos-y-condiciones',
    },
    {
      name: 'Políticas de Privacidad',
      url: '/politica-de-privacidad',
    },
    {
      name: 'Politicas de Cookies',
      url: '/politica-de-cookies',
    },
    {
      name: 'Preguntas Frecuentes',
      url: '/preguntas-frecuentes',
    },
  ],

  footer: {
    siteLegal: [
      'Director periodístico',
      'JULIO LIRA SEGURA',
      '© Empresa Editora El Comercio S.A.',
      'Jr. Santa Rosa N° 300. Piso 2 Lima 1 ',
      'Copyright© | Gestion.pe | Grupo El Comercio | Todos los derechos reservados',
    ],

    socialNetworks: [{
        name: 'linkedin',
        url: 'https://www.linkedin.com/company/diario-gestión/',
      },
      {
        name: 'facebook',
        url: 'https://www.facebook.com/Gestionpe',
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/gestionpe',
      },
    ],

    contacts: [{
        position: 'Director Periodístico',
        name: 'Luis Carlos Arias Schreiber (redaccion@publimetro.pe)',
      },
      {
        position: 'Editor Web',
        name: 'Christian Lengua Solís (christian.lengua@publimetro.pe)',
      },
      {
        position: 'Contacto comercial',
        name: 'ventaspublimetro@publimetro.pe',
      },
    ],
  },
  social: {
    facebook: {
      name: 'facebook',
      user: '@Gestionpe',
      url: 'https://www.facebook.com/Gestionpe',
    },
    twitter: {
      name: 'twitter',
      user: 'Gestionpe',
      url: 'https://twitter.com/gestionpe',
    },
    youtube: {
      name: 'youtube',
      url: 'https://plus.google.com/u/0/+elcomerciope',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
    movil1: 14971944,
    movil2: 14971945,
    movil3: 14971947,
    movil4: 14971953,
    movil5: 14971957,
  },
  listUrlAdvertisings: [
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-21.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-22.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-23.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-24.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-25.html',
  ],
  activeSignwall: true
}