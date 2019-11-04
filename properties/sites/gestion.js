export default {
  siteName: 'Gestión',
  sitemapNewsName: 'Diario Gestión',
  newsletterBrand: 'gestion',
  api: {
    blog: 'https://svc-blogs.gestion.pe/apiblogs.php',
  },
  // colorPrimary: '#8F071F',
  colorPrimary: '#444444',
  colorSecondary: '#F4E0D2',
  googleFonts: 'Judson:400,700|Roboto|Libre+Franklin:500,700',
  siteDomain: 'gestion.pe',
  siteUrl: 'https://gestion.pe',
  resizerUrl: 'https://gestion.pe/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/GESTION_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
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
  googleNewsImage: 'https://gestion.pe/f/i/pub_40.png',
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
    title: 'Suscripciones Digitales | Gestión',
    description:
      'Suscríbete al Plan Digital y accede a contenido exclusivo ilimitadamente desde todos tus dispositivos.Gestión El diario de Economía y Negocios.',
    /**
     * Las rutas se definen como plantillas "mustachejs" y estas se resuelven utilizando
     * la libreria templayed que es una implementacion ligera de mustache. Recomiendo
     * crear una funcion utilitaria que añada las siguientes variables implicitas
     *    - contextPath: Path del contexto de publicacion de fusion
     *    - isProd:      Verdadero si se esta en produccion
     *    - hasParams:   Verdadero si se pasan parametros extra
     *
     * Ejemplo:  resolverUrl( '{{contextPath}}/{{param1}}', { param1: 'somePath' } );  // return: '/pf/somePath'
     */
    // prettier-ignore
    urls: {
      // PATHS
      corporateSuscription:              `{{contextPath}}/suscripcionesdigitales/empresa/?ref=HomeSuscripciones{{^isProd}}&_website=gestion&outputType=paywall{{/isProd}}`,
      faqs:                              `{{contextPath}}/suscripcionesdigitales/faqs/{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,
      digitalSubscriptions:              `{{contextPath}}/suscripcionesdigitales/{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,
      digitalSubscriptionsHome:          `{{contextPath}}/suscripciones/{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,
      validateSubscriptor:               `{{contextPath}}/suscripcionesdigitales/{{documentType}}/{{documentNumber}}/{{attemptToken}}/{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,

      // URLS
      canonical:                         `https://gestion.pe/suscripcionesdigitales/`,
      image:                             `https://gestion.pe/pf/resources/dist/gestion/images/logo_fb.jpg?d=158`,
      clickToCall:                       `https://c2c.kontactame.com/call/?id=162`,
      pwaDomain:                         `https://pwa{{^isProd}}.dev{{/isProd}}.gestion.pe`,
      originApi:                         `https://api{{^isProd}}-sandbox{{/isProd}}.gestion.pe`,
      originIdentitySdk:                 `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-identity.min.js?v=1`,
      originSalesSdk:                    `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-sales.min.js`,
      originPayuSdk:                     `https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js`,
      originPayuTags:                    `https://maf.pagosonline.net/ws/fp/tags.js?id={{deviceSessionId}}80200`,
      originSubscriptionCorpApi:         `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subs-corporativa/`,
      originSubscriptionOnlineToken:     `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscription-online/token/`,
      originSubscriptions:               `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/{{#hasParams}}?doctype={{documentType}}&docnumber={{documentNumber}}&token={{attemptToken}}{{/hasParams}}`,
      originSubscriptionsBundles:        `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/bundle/`,
      originSubsPrinted:                 `{{#isProd}}https://suscripciones.gestion.pe/payment/7/96/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.gestion.pe/payment/7/96/{{/isProd}}`,
      originSubsDigitalPrinted:          `{{#isProd}}https://suscripciones.gestion.pe/payment/8/98/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.gestion.pe/payment/8/97/{{/isProd}}`,
      privacyPolicy:                     `https://gestion.pe/politica-de-privacidad`,
      disclaimer:                        `http://ecomedia.pe/libro/registrar/elcomercio/`,
      terms:                             `https://suscripciones.gestion.pe/terminos/`,
      originSubsOnline:                  `https://suscripciones.gestion.pe/`,
      contactEmailRef:                   `mailto:suscriptores@diariogestion.com.pe`,
      contactPhoneRef:                   `tel:+5113115100`,
      androidAppDownload:                `https://play.google.com/store/apps/details?id=com.eeec.gestion&referrer=email_footer`,
      iosAppDownload:                    `https://apps.apple.com/es/app/gestion/id991224096?ct=email_footer`,
      facebook:                          `https://www.facebook.com/Gestionpe`,
      twitter:                           `https://twitter.com/gestionpe`,
      instagram:                         `https://www.instagram.com/diariogestion/?hl=es`,
    },
    // prettier-ignore
    images: {
      pixel:                             `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`,
      icon:                              `{{contextPath}}/resources/dist/gestion/images/favicon.png`,
      apple_icon:                        `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon.png`,
      apple_icon_76:                     `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-76x76.png`,
      apple_icon_120:                    `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-120x120.png`,
      apple_icon_144:                    `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-144x144.png`,
      apple_icon_152:                    `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-152x152.png`,
      apple_icon_180:                    `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-180x180.png`,
      cyberday_badge:                    `{{contextPath}}/resources/dist/elcomercio/images/cyberday-sello.{{ext}}`,
      lector:                            `{{contextPath}}/resources/dist/gestion/images/img_lector.{{ext}}`,
      corporativo:                       `{{contextPath}}/resources/dist/gestion/images/img_corporativo.{{ext}}`,
      confirmation:                      `{{contextPath}}/resources/dist/gestion/images/img_confirmation.{{ext}}`,
      support:                           `{{contextPath}}/resources/dist/gestion/images/img_soporte.{{ext}}`,
      backgroundx1:                      `{{contextPath}}/resources/dist/gestion/images/bg_planes_10.jpg`,
    }
  },
  assets: {
    nav: {
      logo: 'white-logo.png',
      logoSomos: 'white-logo.png',
    },
    seo: {
      logoAmp: 'logo-amp.png',
      width: 246,
      height: 60,
    },
    path: `/resources/dist/gestion/`,
    premium: {
      logo: 'plusg.png',
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
      'Director periodístico',
      'JULIO LIRA SEGURA',
      '© Empresa Editora El Comercio S.A.',
      'Jr. Santa Rosa N° 300. Piso 2 Lima 1 ',
      'Copyright© | Gestion.pe | Grupo El Comercio | Todos los derechos reservados',
    ],
    story: [
      {
        position: 'Director Periodístico',
        name: 'JULIO LIRA SEGURA',
      },
      {
        position: 'Empresa Editora Gestión',
        name: 'Jr. Santa Rosa #300 Lima 1 Perú',
      },
      {
        position: 'Copyright © gestion.pe',
        name: 'Grupo El Comercio - Todos los derechos reservados',
      },
    ],
    socialNetworks: [
      {
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

    contacts: [
      {
        position: 'Director Periodístico',
        name: 'JULIO LIRA SEGURA',
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
    linkedin: {
      name: 'linkedin',
      url: 'https://www.linkedin.com/company/diario-gestión/',
    },
    instagram: {
      name: 'instagram',
      url: 'https://www.instagram.com/elcomercio/?hl=es',
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
  activeSignwall: true,
  activePaywall: true,
  urlSubsOnline: 'https://gestion.pe/suscripciones/',
  stick: {
    logo: 'logo-gestion-stick.png',
  },
}
