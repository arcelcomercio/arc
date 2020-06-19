export default {
  siteName: 'El Comercio Perú',
  sitemapNewsName: 'El Comercio',
  siteTitle: 'Noticias El Comercio Perú',
  newsletterBrand: 'comercio',
  api: {
    blog: 'https://svc-blogs.elcomercio.pe/apiblogs.php',
  },
  googleFonts: '',

  colorPrimary: '#f7c600',
  siteDomain: 'elcomercio.pe',
  siteUrl: 'https://elcomercio.pe',
  resizerUrl: 'https://elcomercio.pe/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/elcomercio/web/post/default/preroll&description_url=https%3A%2F%2Felcomercio.pe%2F&tfcd=0&npa=0&sz=640x480|640x360|400x300&cust_params=fuente%3Dweb%26publisher%3Delcomercio%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/elcomercio/amp/post/default/preroll&description_url=https%3A%2F%2Felcomercio.pe%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Damp%26publisher%3Delcomercio%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-PFFL5R9',
  ampGoogleTagManagerId: 'UA-3055636-11',
  ampGoogleTagManagerName: 'elcomercio',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-11',
  fbPixelId: '1252229265121278',
  fbArticleStyle: 'LogoElcomercio',
  nameStoryRelated: 'VEA TAMBIÉN',
  googleTagManagerMobile: 'GTM-NNX4LXF',
  siteDescription:
    'Noticias de Perú y el mundo en Elcomercio.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://publimetro.pe/f/i/pub_40.png',
  infoPagesDev: {
    termsAndConditions: 'FXTBX3HGGNBQXES37OMYK4WRIE',
    guidingPrinciples: 'F6HHZ5WAAZC3BMG6DTBJO2BBKQ',
    privacyPolicies: '5UF5KAARPRBMFNQP6VRVBRYYZ4',
    integratedManagementPolicy: 'N4VEGF2LFBBVHCLSAYRBUDGAR4',
    arcoProcedure: 'UC67Q5OE7VHQTEGKQYFE5SNVOQ',
    cookiesPolicy: 'SB5QBFQPGBBDZBRR27WHIGKQOQ',
    aboutUs: '',
    frequentQuestions: '',
  },
  infoPagesProd: {
    termsAndConditions: 'SYLZ4HYTXRHATFNSHG2ZJQTNQI',
    guidingPrinciples: 'L5AULXOGCRECFAMNYVWLGTV4MI',
    privacyPolicies: 'OLR5KJAABVCV5G3ZQTGXKETJNU',
    integratedManagementPolicy: 'OFZJ4STKNRDHLPEIQJ5X24L6UE',
    arcoProcedure: 'L64SNU32AFD6LMRCKJTNY3M3KY',
    cookiesPolicy: 'IBXQQAQRGVAURMCAIB7MRN34WE',
    aboutUs: '',
    frequentQuestions: '',
  },

  assets: {
    path: `/resources/dist/elcomercio/`,
    aniversario: `images/aniversario.svg`,
    nav: {
      logo: 'white-logo.png',
    },
    header: {
      logo: 'logo.png',
      inverted: 'logo.png',
      special: 'white-logo.svg',
    },
    footer: {
      logo: 'logo.png',
    },
    seo: {
      logoAmp: 'logo-elcomercio-388x60.png',
      width: 388,
      height: 60,
      widthAmp: 156,
      heightAmp: 25,
    },
    premium: {
      logo: 'premium-logo.png',
    },
  },

  paywall: {
    title: 'Suscripciones Digitales | El Comercio',
    description:
      'Noticias de Perú y el mundo en Elcomercio.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',

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
      eventsRegexp:                      `eventos\\/(\\w+)`,
      corporateSuscription:              `{{contextPath}}/suscripcionesdigitales/empresa/{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      faqs:                              `{{contextPath}}/suscripcionesdigitales/faqs/{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      digitalSubscriptions:              `{{contextPath}}/suscripcionesdigitales/{{#isEvent}}eventos/{{event}}/{{/isEvent}}{{#isCheckingSubscriptor}}{{documentType}}/{{documentNumber}}/{{attemptToken}}/{{/isCheckingSubscriptor}}{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      digitalSubscriptionsHome:          `{{contextPath}}/suscripciones/{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      arcEntitlements:                   `/sales/public/v1/entitlements`,

      // URLS
      canonical:                         `https://elcomercio.pe/suscripcionesdigitales/`,
      image:                             `https://elcomercio.pe/pf/resources/dist/elcomercio/images/logo_fb.jpg?d=158`,
      reviewVideo:                       `https://pub.minoticia.pe/elcomercio/el_comercio.mp4`,
      clickToCall:                       `https://pe-eca.grupodigitex.com/C2C_Comercio/Ventas/Ventas.aspx?utm_source=web-suscripciones&utm_medium=boton&utm_campaign=C2C&utm_term=ayuda-llamar&utm_content=suscripciones-portada`,
      pwaDomain:                         `https://pwa{{^isProd}}.dev{{/isProd}}.elcomercio.pe`,
      originApi:                         `https://api{{^isProd}}-sandbox{{/isProd}}.elcomercio.pe`,
      originIdentitySdk:                 `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-identity.min.js?v=1`,
      originSalesSdk:                    `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-sales.min.js`,
      originPayuSdk:                     `https://{{#isProd}}d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/{{/isProd}}{{^isProd}}signwall-test.e3.pe/static/{{/isProd}}payu-sdk.js`,
      originPayuTags:                    `https://maf.pagosonline.net/ws/fp/tags.js?id={{deviceSessionId}}80200`,
      originPaymentTraker:               `https://{{#isProd}}su3l9d6w10{{/isProd}}{{^isProd}}72q176wl1l{{/isProd}}.execute-api.us-east-1.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}dev{{/isProd}}/v1/service/arc/paywall/tracking`,
      originSubscriptionCorpApi:         `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subs-corporativa/`,
      originSubscriptionOnlineToken:     `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscription-online/token/`,
      originSubscriptions:               `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/elcomercio/{{#hasParams}}?{{/hasParams}}{{#isCheckingSubscriptor}}doctype={{documentType}}&docnumber={{documentNumber}}&token={{attemptToken}}{{/isCheckingSubscriptor}}{{#isEvent}}{{#isCheckingSubscriptor}}&{{/isCheckingSubscriptor}}event={{event}}{{/isEvent}}{{#fromFia}}from_fia=true{{/fromFia}}`,
      originSubscriptionsBundles:        `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/elcomercio/bundle/`,
      originSubsPrinted:                 `{{#isProd}}https://suscripciones.elcomercio.pe/payment/9/101/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.elcomercio.pe/payment/9/101/{{/isProd}}`,
      originSubsDigitalPrinted:          `{{#isProd}}https://suscripciones.elcomercio.pe/payment/10/103/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.elcomercio.pe/payment/10/103/{{/isProd}}`,
      privacyPolicy:                     `https://elcomercio.pe/politicas-privacidad/`,
      disclaimer:                        `http://ecomedia.pe/libro/registrar/elcomercio/`,
      terms:                             `https://suscripciones.elcomercio.pe/terminos/`,
      originSubsOnline:                  `https://suscripciones.elcomercio.pe/?ref=Boton_suscrip_imp`,
      contactEmailRef:                   `mailto:atencionalcliente@comercio.com.pe`,
      contactPhoneRef:                   `tel:+5113115100`,
      androidAppDownload:                `https://play.google.com/store/apps/details?id=com.gec.elcomercio&referrer=email_footer`,
      iosAppDownload:                    `https://apps.apple.com/es/app/el-comercio-peru/id793178800?ct=email_footer`,
      facebook:                          `https://www.facebook.com/elcomercio.pe`,
      twitter:                           `https://twitter.com/elcomercio_peru`,
      instagram:                         `https://www.instagram.com/elcomercio/?hl=es`,
      codeCxense:                        `{{#isProd}}8msiqbaswc5u{{/isProd}}
                                          {{^isProd}}8n3ltuopvlh1{{/isProd}}`,
      profileSignwall:                    `{{contextPath}}/mi-perfil/?outputType=signwall`,
    },
    // prettier-ignore
    images: {
      pixel:                             `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`,
      icon:                              `{{contextPath}}/resources/dist/elcomercio/images/favicon.png`,
      apple_icon:                        `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon.png`,
      apple_icon_76:                     `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-76x76.png`,
      apple_icon_120:                    `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-120x120.png`,
      apple_icon_144:                    `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-144x144.png`,
      apple_icon_152:                    `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-152x152.png`,
      apple_icon_180:                    `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-180x180.png`,
      lector:                            `{{contextPath}}/resources/dist/elcomercio/images/img_lector.{{ext}}`,
      corporativo:                       `{{contextPath}}/resources/dist/elcomercio/images/img_corporativo.{{ext}}`,
      confirmation:                      `{{contextPath}}/resources/dist/elcomercio/images/img_confirmation.{{ext}}`,
      support:                           `{{contextPath}}/resources/dist/elcomercio/images/img_soporte.{{ext}}`,
      backgroundx1:                      `{{contextPath}}/resources/dist/elcomercio/images/bg_planes_10.jpg`,
      backgroundReview:                  `{{contextPath}}/resources/dist/elcomercio/images/bg_video.jpg`,
      reviewPoster:                      `{{contextPath}}/resources/dist/elcomercio/images/review_poster.jpg`,
      mainLogo:                          `{{contextPath}}/resources/dist/elcomercio/images/white-logo.png`, 
    }
  },

  legalLinks: [
    {
      name: 'TÉRMINOS Y CONDICIONES DE USO',
      url: '/terminos-y-condiciones/',
    },
    {
      name: 'OFICINAS CONCESIONARIAS',
      url: '/oficinas-concesionarias/',
      external: true,
    },
    {
      name: 'PRINCIPIOS RECTORES',
      url: '/principios-rectores/',
    },
    {
      name: 'BUENAS PRÁCTICAS',
      url: '/buenas-practicas/',
    },
    {
      name: 'PROYECTO CONFIANZA',
      url: '/proyecto-confianza/',
    },
    {
      name: 'POLÍTICAS DE PRIVACIDAD',
      url: '/politicas-privacidad/',
    },
    {
      name: 'POLÍTICA INTEGRADA DE GESTIÓN',
      url: '/politica-integrada-de-gestion/',
    },
    {
      name: 'DERECHOS ARCO',
      url: '/procedimiento-arco/',
    },
    {
      name: 'POLÍTICA DE COOKIES',
      url: '/politica-de-cookies/',
    },
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
      name: 'instagram',
      url: 'https://www.instagram.com/elcomercio/?hl=es',
    },
    {
      name: 'youtube',
      url: 'https://www.youtube.com/channel/UCLtGUPjKLqa3zgdmhKCZONg',
    },
  ],
  social: {
    facebook: {
      user: '@elcomercio.pe',
      url: 'https://www.facebook.com/elcomercio.pe',
    },
    twitter: {
      user: 'elcomercio_peru',
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
  activeSignwall: true,
  activePaywall: true,
  activeNewsletter: true,
  signwall: {
    mainColorBg: '#f7c600',
    mainColorTxt: '#000000',
    mainLogo: 'logo.png',
    mainColorBr: '#efdb96',
    mainColorLink: '#008eff',
    mainColorTitle: '#008eff',
    mainColorBtn: '#008eff',
    primaryFont: 'Noto Serif SC',
    authProviders: ['facebook', 'google'],
  },
  urlSubsOnline: '/suscripciones/',
  gda: true, // Grupo Diarios de America
  taboola: {
    dataModeAmp: 'thumbnails-a-amp',
    mode: 'thumbnails-c',
  },
  isDfp: true,
}
