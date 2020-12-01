export default {
  siteName: 'Gestión',
  sitemapNewsName: 'Diario Gestión',
  siteTitle: 'Gestión',
  newsletterBrand: 'gestion',
  api: {
    blog: 'https://svc-blogs.gestion.pe/apiblogs.php',
  },
  // colorPrimary: '#8F071F',
  colorPrimary: '#444444',
  colorSecondary: '#F4E0D2',
  siteDomain: 'gestion.pe',
  siteUrl: 'https://gestion.pe',
  resizerUrl: 'https://gestion.pe/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    // 'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/GESTION_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/gestion/web/post/default/preroll&description_url=https%3A%2F%2Fgestion.pe%2F&tfcd=0&npa=0&sz=640x480|640x360|400x300&cust_params=fuente%3Dweb%26publisher%3Dgestion%26seccion%3Ddefault%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  urlPrerollAmp:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/gestion/amp/post/default/preroll&description_url=https%3A%2F%2Fgestion.pe%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Damp%26publisher%3Dgestion%26tipoplantilla%3Dpost&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-KFQK83S',
  ampGoogleTagManagerId: 'UA-3055636-3',
  ampGoogleTagManagerName: 'gestion',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-3',
  fbPixelId: '192820708803212',
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
      'Suscríbete al Plan Digital y accede a contenido exclusivo ilimitadamente desde todos tus dispositivos. Gestión El diario de Economía y Negocios.',
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
      corporateSuscription:              `{{contextPath}}/suscripcionesdigitales/empresa/?ref=HomeSuscripciones{{^isProd}}&_website=gestion&outputType=paywall{{/isProd}}`,
      faqs:                              `{{contextPath}}/suscripcionesdigitales/faqs/{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,
      digitalSubscriptions:              `{{contextPath}}/suscripcionesdigitales/{{#isEvent}}eventos/{{event}}/{{/isEvent}}{{#isCheckingSubscriptor}}{{documentType}}/{{documentNumber}}/{{attemptToken}}/{{/isCheckingSubscriptor}}{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,
      digitalSubscriptionsHome:          `{{contextPath}}/suscripciones/{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,
      arcEntitlements:                   `/sales/public/v1/entitlements`,

      // URLS
      canonical:                         `https://gestion.pe/suscripcionesdigitales/`,
      image:                             `https://gestion.pe/pf/resources/dist/gestion/images/logo_fb.jpg?d=158`,
      clickToCall:                       `https://pe-eca.grupodigitex.com/C2C_Comercio/Gestion/Gestion.aspx?utm_source=web-suscripciones&utm_medium=boton&utm_campaign=C2C&utm_term=ayuda-llamar&utm_content=suscripciones-portada`,
      pwaDomain:                         `https://pwa{{^isProd}}.dev{{/isProd}}.gestion.pe`,
      originApi:                         `https://api{{^isProd}}-sandbox{{/isProd}}.gestion.pe`,
      originIdentitySdk:                 `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-identity.min.js?v=1`,
      originSalesSdk:                    `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-sales.min.js`,
      originPayuSdk:                     `https://{{#isProd}}d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/{{/isProd}}{{^isProd}}signwall-test.e3.pe/static/{{/isProd}}payu-sdk.js`,
      originPayuTags:                    `https://maf.pagosonline.net/ws/fp/tags.js?id={{deviceSessionId}}80200`,
      originPaymentTraker:               `https://{{#isProd}}su3l9d6w10{{/isProd}}{{^isProd}}72q176wl1l{{/isProd}}.execute-api.us-east-1.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}dev{{/isProd}}/v1/service/arc/paywall/tracking`,
      originSubscriptionCorpApi:         `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subs-corporativa/`,
      originSubscriptionOnlineToken:     `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscription-online/token/`,
      originSubscriptions:               `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/{{#hasParams}}?{{/hasParams}}{{#isCheckingSubscriptor}}doctype={{documentType}}&docnumber={{documentNumber}}&token={{attemptToken}}{{/isCheckingSubscriptor}}{{#isEvent}}{{#isCheckingSubscriptor}}&{{/isCheckingSubscriptor}}event={{event}}{{/isEvent}}{{#fromFia}}from_fia=true{{/fromFia}}`,
      originSubscriptionsBundles:        `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/bundle/`,
      originSubsPrinted:                 `{{#isProd}}https://suscripciones.gestion.pe/payment/7/96/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.gestion.pe/payment/7/96/{{/isProd}}`,
      originSubsDigitalPrinted:          `{{#isProd}}https://suscripciones.gestion.pe/payment/8/98/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.gestion.pe/payment/8/97/{{/isProd}}`,
      privacyPolicy:                     `https://gestion.pe/politica-de-privacidad`,
      disclaimer:                        `http://ecomedia.pe/libro/registrar/gestion/`,
      terms:                             `https://suscripciones.gestion.pe/terminos/`,
      originSubsOnline:                  `https://suscripciones.gestion.pe/`,
      contactEmailRef:                   `mailto:atencionalcliente@comercio.com.pe`,
      contactPhoneRef:                   `tel:+5113115100`,
      androidAppDownload:                `https://play.google.com/store/apps/details?id=com.eeec.gestion&referrer=email_footer`,
      iosAppDownload:                    `https://apps.apple.com/es/app/gestion/id991224096?ct=email_footer`,
      facebook:                          `https://www.facebook.com/Gestionpe`,
      twitter:                           `https://twitter.com/gestionpe`,
      instagram:                         `https://www.instagram.com/diariogestion/?hl=es`,
      fbSubscriptionsSync:               `https://graph.facebook.com/v2.10/{{subscriptionNodeId}}/subscriptions`,
      codeCxense:                        `{{#isProd}}8n3linhnzos6{{/isProd}}
                                          {{^isProd}}8msif5r9dikx{{/isProd}}`,
      profileSignwall:                    `{{contextPath}}/mi-perfil/?outputType=signwall`,
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
      lector:                            `{{contextPath}}/resources/dist/gestion/images/img_lector.{{ext}}`,
      corporativo:                       `{{contextPath}}/resources/dist/gestion/images/img_corporativo.{{ext}}`,
      confirmation:                      `{{contextPath}}/resources/dist/gestion/images/img_confirmation.{{ext}}`,
      support:                           `{{contextPath}}/resources/dist/gestion/images/img_soporte.{{ext}}`,
      backgroundx1:                      `{{contextPath}}/resources/dist/gestion/images/bg_planes_10.jpg`,
      mainLogo:                          `{{contextPath}}/resources/dist/gestion/images/logo_gestion_30.png`,
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
  social: {
    facebook: {
      user: '@Gestionpe',
      url: 'https://www.facebook.com/Gestionpe',
    },
    twitter: {
      user: 'Gestionpe',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
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
  activeRulesCounter: true,
  activeNewsletter: true,
  activeVerifyEmail: true,
  signwall: {
    mainColorBg: '#8f071f',
    mainColorTxt: '#ffffff',
    mainLogo: 'white-logo.png',
    mainColorBr: '#f4e0d2',
    mainColorLink: '#0e6dc1',
    mainColorTitle: '#d64445',
    mainColorBtn: '#0179af',
    primaryFont: 'Judson',
    authProviders: ['facebook', 'google'],
  },
  urlSubsOnline: '/suscripciones/',
  stick: {
    logo: 'logo-gestion-stick.png',
  },
  isDfp: true,
  archiveLimit: '2012-03-28',

  jwplayers: {
    gec: { playerAds: '239Bw0FV', player: 'J7KXWQ8Q' },
  },
}
