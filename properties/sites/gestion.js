export default {
  siteName: 'Gestión',
  colorPrimary: '#8F071F',
  colorSecondary: '#F4E0D2',
  googleFonts: 'Judson:400,700|Roboto|Libre+Franklin:500,700',
  siteDomain: 'gestion.pe',
  siteUrl: 'https://gestion.pe',
  resizerUrl: 'https://publimetro.pe/resizer', // Temporal hasta que activen el resizer para gestión
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/ECO_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-KFQK83S',
  ampGoogleTagManagerId: 'UA-3055636-3',
  ampGoogleTagManagerName: 'gestion',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-3',
  fbArticleStyle: 'LogoGestion',
  nameStoryRelated: 'VEA TAMBIÉN',

  siteDescription:
    'Noticias de Perú y el mundo en Gestion.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://publimetro.pe/f/i/pub_40.png',
  imagenNewsLetter: {
    thumbnail_max:
      'https://img.elcomercio.pe/files/servicio_newsletter_648x364/uploads/2017/05/16/591b34b2c9508.jpeg',
    thumbnail_min:
      'https://img.elcomercio.pe/files/servicio_newsletter_214x135/uploads/2017/05/16/591b34b2c9508.jpeg',
    thumbnail_250x366:
      'https://img.elcomercio.pe/files/servicio_newsletter_250x366/uploads/2017/05/16/591b34b2c9508.jpeg',
    thumbnail_148x83:
      'https://img.elcomercio.pe/files/servicio_newsletter_148x83/uploads/2017/05/16/591b34b2c9508.jpeg',
    thumbnail_210x118:
      'https://img.elcomercio.pe/files/servicio_newsletter_210x118/uploads/2017/05/16/591b34b2c9508.jpeg',
    thumbnail_403x227:
      'https://img.elcomercio.pe/files/servicio_newsletter_403x227/uploads/2017/05/16/591b34b2c9508.jpeg',
    thumbnail_241x136:
      'https://img.elcomercio.pe/files/servicio_newsletter_241x136/uploads/2017/05/16/591b34b2c9508.jpeg',
    thumbnail_grande:
      'https://img.elcomercio.pe/files/ec_content_newslatter_grande/uploads/2017/05/16/591b34b2c9508.jpeg',
    thumbnail_flujo:
      'https://img.elcomercio.pe/files/ec_content_newslatter_flujo/uploads/2017/05/16/591b34b2c9508.jpeg',
  },
  infoPagesDev: {
    termsAndConditions: '',
    guidingPrinciples: '',
    privacyPolicies: '',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: '',
    aboutUs: 'AH524OO2XFEE3CZBDR3VZTXN6A',
  },
  infoPagesProd: {
    termsAndConditions: 'VD45IRL65ZGCDBGLHL4O6WVCJE',
    guidingPrinciples: '',
    privacyPolicies: 'YK7SFEAX3VD4HOYGEPH3Y6ZYNQ',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: 'QCNTLMKRZJGJTO2ZB5AQAO4ODE',
    aboutUs: '',
  },

  assets: {
    nav: {
      logo: 'white-logo.png',
      logoSomos: 'white-logo.png',
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
  legalLinks: [
    {
      name: 'Términos y condiciones',
      url: '/terminos-servicio',
    },
    {
      name: 'Políticas de Privacidad',
      url: '/politicas-privacidad',
    },
    {
      name: 'Politicas de Cookies',
      url: '/politicas-cookies',
    },
  ],

  footer: {
    siteLegal: [
      'Empresa Editora El Comercio',
      'Jr. Santa Rosa #300 Lima 1 Perú',
      'Copyright © Elcomercio.pe',
      'Grupo El Comercio - Todos los derechos reservados',
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
      {
        name: 'google+',
        url: 'https://plus.google.com/u/0/+elcomerciope',
      },
    ],

    contacts: [
      {
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
      user: '@elcomercio.pe',
      url: 'https://www.facebook.com/elcomercio.pe',
    },
    twitter: {
      name: 'twitter',
      user: '@Gestion.pe',
      url: 'https://twitter.com/elcomercio_peru',
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
}
