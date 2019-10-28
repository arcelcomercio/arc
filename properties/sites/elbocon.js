export default {
  siteName: 'El Bocón',
  sitemapNewsName: 'Diario El Bocón',
  // colorPrimary: '#8F071F',
  colorPrimary: '#444444',
  colorSecondary: '#F4E0D2',
  googleFonts: 'Judson:400,700|Roboto|Libre+Franklin:500,700',
  siteDomain: 'elbocon.pe',
  siteUrl: 'https://elbocon.pe',
  resizerUrl: 'https://elcomercio-elbocon-prod.cdn.arcpublishing.com/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/ELBOCON_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-KFQK83S',
  ampGoogleTagManagerId: 'UA-3055636-3',
  ampGoogleTagManagerName: 'elbocon',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-3',
  fbArticleStyle: 'LogoGestion',
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
    termsAndConditions: 'VD45IRL65ZGCDBGLHL4O6WVCJE',
    guidingPrinciples: '',
    privacyPolicies: 'YK7SFEAX3VD4HOYGEPH3Y6ZYNQ',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'QCNTLMKRZJGJTO2ZB5AQAO4ODE',
    aboutUs: '5LTW3MZOP5AA5NTJ4GHA7NDK4A',
    frequentQuestions: 'TGDG422JBNHYFMU563BFRZDDDI',
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
      name: '¿Quiénes somos?',
      url: '/quienes-somos/',
    },
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
      name: 'Preguntas Frecuentes',
      url: '/preguntas-frecuentes/',
    },
  ],

  footer: {
    siteLegal: [
      // TODO: DESCOMENTAR ESTO PARA LA SEGUNDA SALIDA DE GESTIÓN
      /* 'Director periodístico',
      'DIRECTOR DE EL BOCÓN', */
      '© Empresa Editora El Comercio S.A.',
      'Jr. Santa Rosa N° 300. Piso 2 Lima 1 ',
      'Copyright© | Gestion.pe | Grupo El Comercio | Todos los derechos reservados',
    ],
    story: [
      {
        position: 'Director Periodístico',
        name: 'DIRECTOR DE EL BOCÓN',
      },
      {
        position: 'Empresa Editora El Bocón',
        name: 'Jr. Santa Rosa #300 Lima 1 Perú',
      },
      {
        position: 'Copyright © elbocon.pe',
        name: 'Grupo El Comercio - Todos los derechos reservados',
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
        url: 'https://twitter.com/elboconpe',
      },
    ],

    contacts: [
      {
        position: 'Director Periodístico',
        name: 'DIRECTOR DE EL BOCÓN',
      },
      // {
      //   position: 'Editor Web',
      //   name: 'PARKER CHAVEZ JAVIER EDUARDO javier.parker@diariogestion.com.pe',
      // },
      {
        position: '',
        name: '',
      },
    ],
  },
  social: {
    facebook: {
      name: 'facebook',
      user: '@DiarioElBocon',
      url: 'https://www.facebook.com/DiarioElBocon',
    },
    twitter: {
      name: 'twitter',
      user: 'elbocononline',
      url: 'https://twitter.com/elbocononline',
    },
    youtube: {
      name: 'youtube',
      url: 'https://plus.google.com/u/0/+elcomerciope',
    },
    linkedin: {
      name: 'linkedin',
      url: 'https://www.linkedin.com/company/diario-el-bocon/',
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
  activeSignwall: false,
  activePaywall: false,
}
