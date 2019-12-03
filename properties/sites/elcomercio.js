export default {
  siteName: 'El Comercio Perú',
  sitemapNewsName: 'El Comercio',
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
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/ECO_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-PFFL5R9',
  ampGoogleTagManagerId: 'UA-3055636-11',
  ampGoogleTagManagerName: 'elcomercio',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-11',
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
      corporateSuscription:              `{{contextPath}}/suscripcionesdigitales/empresa/{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      faqs:                              `{{contextPath}}/suscripcionesdigitales/faqs/{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      digitalSubscriptions:              `{{contextPath}}/suscripcionesdigitales/{{#isEvent}}eventos/{{event}}/{{/isEvent}}{{#isCheckingSubscriptor}}{{documentType}}/{{documentNumber}}/{{attemptToken}}/{{/isCheckingSubscriptor}}{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      digitalSubscriptionsHome:          `{{contextPath}}/suscripciones/{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,

      // URLS
      canonical:                         `https://elcomercio.pe/suscripcionesdigitales/`,
      image:                             `https://elcomercio.pe/pf/resources/dist/elcomercio/images/logo_fb.jpg?d=158`,
      clickToCall:                       `https://c2c.kontactame.com/call/?id=161`,
      pwaDomain:                         `https://pwa{{^isProd}}.dev{{/isProd}}.elcomercio.pe`,
      originApi:                         `https://api{{^isProd}}-sandbox{{/isProd}}.elcomercio.pe`,
      originIdentitySdk:                 `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-identity.min.js?v=1`,
      originSalesSdk:                    `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-sales.min.js`,
      originPayuSdk:                     `https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js`,
      originPayuTags:                    `https://maf.pagosonline.net/ws/fp/tags.js?id={{deviceSessionId}}80200`,
      originSubscriptionCorpApi:         `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subs-corporativa/`,
      originSubscriptionOnlineToken:     `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscription-online/token/`,
      originSubscriptions:               `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/elcomercio/{{#hasParams}}?{{/hasParams}}{{#isCheckingSubscriptor}}doctype={{documentType}}&docnumber={{documentNumber}}&token={{attemptToken}}{{/isCheckingSubscriptor}}{{#isEvent}}{{#isCheckingSubscriptor}}&{{/isCheckingSubscriptor}}event={{event}}{{/isEvent}}`,
      originSubscriptionsBundles:        `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/elcomercio/bundle/`,
      originSubsPrinted:                 `{{#isProd}}https://suscripciones.elcomercio.pe/payment/9/101/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.elcomercio.pe/payment/9/101/{{/isProd}}`,
      originSubsDigitalPrinted:          `{{#isProd}}https://suscripciones.elcomercio.pe/payment/10/103/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.elcomercio.pe/payment/10/103/{{/isProd}}`,
      privacyPolicy:                     `https://elcomercio.pe/politicas-privacidad/`,
      disclaimer:                        `http://ecomedia.pe/libro/registrar/elcomercio/`,
      terms:                             `https://suscripciones.elcomercio.pe/terminos/`,
      originSubsOnline:                  `https://suscripciones.elcomercio.pe/?ref=Boton_suscrip_imp`,
      contactEmailRef:                   `mailto:suscripciones@comercio.com.pe`,
      contactPhoneRef:                   `tel:+5113115100`,
      androidAppDownload:                `https://play.google.com/store/apps/details?id=com.gec.elcomercio&referrer=email_footer`,
      iosAppDownload:                    `https://apps.apple.com/es/app/el-comercio-peru/id793178800?ct=email_footer`,
      facebook:                          `https://www.facebook.com/elcomercio.pe`,
      twitter:                           `https://twitter.com/elcomercio_peru`,
      instagram:                         `https://www.instagram.com/elcomercio/?hl=es`,
      codeCxense:                        `{{#isProd}}8msiqbaswc5u{{/isProd}}
                                          {{^isProd}}8n3ltuopvlh1{{/isProd}}`,
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
    }
  },

  legalLinks: [
    {
      name: 'TÉRMINOS Y CONDICIONES DE USO',
      url: '/terminos-y-condiciones',
    },
    {
      name: 'LIBRO DE RECLAMACIONES',
      url: 'http://ecomedia.pe/libro/inicio/elcomercio/',
      external: true,
    },
    {
      name: 'OFICINAS CONCESIONARIAS',
      url: '/oficinas-concesionarias',
      external: true,
    },
    {
      name: 'PRINCIPIOS RECTORES',
      url: '/principios-rectores',
    },
    {
      name: 'BUENAS PRÁCTICAS',
      url: '/buenas-practicas',
    },
    {
      name: 'PROYECTO CONFIANZA',
      url: '/proyecto-confianza',
    },
    {
      name: 'POLÍTICAS DE PRIVACIDAD',
      url: '/politicas-privacidad',
    },
    {
      name: 'POLÍTICA INTEGRADA DE GESTIÓN',
      url: '/politica-integrada-de-gestion',
    },
    {
      name: 'DERECHOS ARCO',
      url: '/procedimiento-arco',
    },
    {
      name: 'POLÍTICA DE COOKIES',
      url: '/politica-de-cookies',
    },
  ],

  footer: {
    siteLegal: [
      'Empresa Editora El Comercio',
      'Jr. Santa Rosa #300 Lima 1 Perú',
      'Copyright © Elcomercio.pe',
      'Grupo El Comercio - Todos los derechos reservados',
    ],
    story: [
      {
        position: 'DIRECTOR PERIODÍSTICO:',
        name: 'Juan José Garrido Koechlin',
      },
      {
        position: 'Empresa Editora El Comercio',
        name: 'Jr. Santa Rosa #300 Lima 1 Perú',
      },
      {
        position: 'Copyright © elcomercio.pe',
        name:
          '© Empresa Editora El Comercio - Grupo El Comercio - Todos los derechos reservados.',
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
        name: 'youtube',
        url: 'https://plus.google.com/u/0/+elcomerciope',
      },
    ],

    directors: [
      {
        position: 'Director Periodístico',
        names: ['JUAN JOSÉ GARRIDO KOECHLIN'],
      },
      {
        position: 'Directores Fundadores',
        names: [
          'Manuel Amunátegui [1839-1875] y',
          'Alejandro Villota [1839-1861]',
        ],
      },
      {
        position: 'Directores',
        names: [
          'Francisco Miró Quesada Cantuarias',
          'Luis Carranza [1875-1898]',
          'José Antonio Miró Quesada [1875-1905]',
          'Antonio Miró Quesada de la Guerra [1905-1935]',
          'Aurelio Miró Quesada de la Guerra [1935-1950]',
          'Luis Miró Quesada de la Guerra [1935-1974]',
          'Óscar Miró Quesada de la Guerra [1980-1981]',
          'Aurelio Miró Quesada Sosa [1980-1998]',
          'Alejandro Miró Quesada Garland [1980-2011]',
          'Alejandro Miró Quesada Cisneros [1999-2008]',
          'Francisco Miró Quesada Rada [2008-2013]',
          'Fritz Du Bois Freund [2013-2014]',
          'Fernando Berckemeyer Olaechea [2014-2018]',
        ],
      },
    ],

    contacts: [
      {
        position: 'Suscripciones',
        name: 'suscriptores@comercio.com.pe',
      },
      {
        position: 'Publicidad',
        name: 'fonoavisos@comercio.com.pe',
      },
      {
        position: 'Club El Comercio',
        name: 'clubelcomercio@comercio.com.pe',
        link: {
          name: 'Compromiso de Autorregulación Comercial',
          url: 'https://elcomercio.pe/compromiso-autoregulacion-comercial.pdf',
        },
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
      user: 'elcomercio_peru',
      url: 'https://twitter.com/elcomercio_peru',
    },
    youtube: {
      name: 'youtube',
      url: 'https://plus.google.com/u/0/+elcomerciope',
    },
    instagram: {
      name: 'instagram',
      url: 'https://www.instagram.com/elcomercio/?hl=es',
    },
  },
  adsAmp: {
    dataSlot: 28253241,
    movil1: 15011632,
    movil2: 15011649,
    movil3: 15011662,
    movil4: 15011668,
    movil5: 15011680,
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
  urlSubsOnline: 'https://elcomercio.pe/suscripciones/',
  gda: true, // Grupo Diarios de America
  taboola: {
    dataModeAmp: 'thumbnails-a-amp',
    mode: 'thumbnails-c',
  },
}
