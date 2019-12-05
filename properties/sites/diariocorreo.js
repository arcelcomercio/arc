export default {
  siteName: 'Correo',
  sitemapNewsName: 'Diario Correo',
  // colorPrimary: '#8F071F',
  colorPrimary: '#444444',
  colorSecondary: '#F4E0D2',
  googleFonts: 'Titillium+Web:400,600,700,900|Roboto+Slab:400,700',
  siteDomain: 'diarriocorreo.pe',
  siteUrl: 'https://diariocorreo.pe',
  resizerUrl:
    'https://elcomercio-diariocorreo-prod.cdn.arcpublishing.com/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/Correo_Preroll&description_url=https%3A%2F%2Fdiariocorreo.pe&tfcd=0&npa=0&sz=640x360&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
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
      width: 246,
      height: 60,
      widthAmp: 178,
      heightAmp: 47,
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
    }
  ],

  footer: {
    siteLegal: [
      // TODO: DESCOMENTAR ESTO PARA LA SEGUNDA SALIDA DE GESTIÓN
      /* 'Director periodístico',
      'DIRECTOR DE Correo', */
      '© Empresa Editora El Comercio S.A.',
      'Jirón Jorge Salazar Araoz 171',
      'Lima 13 - Perú',
      'Copyright© | diariocorreo.pe | Todos los derechos reservados',
    ],
    story: [
      {
        position: 'Director Periodístico',
        name: 'DIRECTOR DE Correo',
      },
      {
        position: 'Empresa Editora Correo',
        name: 'Jr. Santa Rosa #300 Lima 1 Perú',
      },
      {
        position: 'Copyright © diariocorreo.pe',
        name: 'Grupo El Comercio - Todos los derechos reservados',
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

    contacts: [
      {
        position: 'Contacto Administrativo',
        name: 'contacto@prensmart.pe',
      },
      {
        position: 'Publicidad Online',
        name: 'fonoavisos@comercio.com.pe',
      },
      {
        position: 'Call Center',
        name: '+51 1708 9999',
      },
      {
        position: 'Temas periodísticos',
        name: '+51 1 631 1111',
      },
    ],
  },
  social: {
    facebook: {
      name: 'facebook',
      user: '@CorreoPeru',
      url: 'https://www.facebook.com/CorreoPeru/',
    },
    twitter: {
      name: 'twitter',
      user: 'diariocorreo',
      url: 'https://twitter.com/diariocorreo',
    },
    youtube: {
      name: 'youtube',
      url: 'https://www.youtube.com/user/DiarioCorreoPeru',
    },
    linkedin: {
      name: 'linkedin',
      url: 'https://www.linkedin.com/',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
    movil1: 15011739,
    movil2: 15011740,
    movil3: 15011741,
    movil4: 15011742,
    movil5: 15011744,
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
  taboola: {
    dataModeAmp: 'thumbnails-e',
    mode: 'thumbnails-c',
  },
  stick: {
    logo: 'logo-stick.png',
  },
}
