export default {
  siteName: 'El Comercio',
  api: {
    blog: 'https://svc-blogs.elcomercio.pe/apiblogs.php'
  },
  googleFonts:
    'Noto+Serif:400,700|Open+Sans:400,600,700|Libre+Franklin:500,700',

  colorPrimary: '#f7c600',
  siteDomain: 'elcomercio.pe',
  siteUrl: 'https://elcomercio.pe',
  resizerUrl:
    'https://elcomercio-elcomercio-prod.cdn.arcpublishing.com/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/ECO_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-KKXTKGP_',
  ampGoogleTagManagerId: 'UA-3055636-11',
  ampGoogleTagManagerName: 'elcomercio',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-11',
  fbArticleStyle: 'LogoElcomercio',
  nameStoryRelated: 'VEA TAMBIÉN',
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
    paywall() {
      return `${this.path}${this.aniversario}`
    },
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
      logoAmp: 'logo-elcomercio-316x60.png',
      width: 316,
      height: 60,
    },
    premium: {
      logo: 'premium-logo.png',
    },
  },

  legalLinks: [
    {
      name: 'Términos y condiciones de uso',
      url: '/terminos-y-condiciones',
    },
    {
      name: 'Trabaja para Grupo El Comercio',
      url: 'https://elcomercio.aptitus.com/',
      external: true,
    },
    {
      name: 'Libro de Reclamaciones',
      url: 'http://ecomedia.pe/libro/inicio/elcomercio/',
      external: true,
    },
    {
      name: 'Oficinas Concesionarias',
      url: '/oficinas-concesionarias',
      external: true,
    },
    {
      name: 'Principios Rectores',
      url: '/principios-rectores',
    },
    {
      name: 'Políticas de Privacidad',
      url: '/politicas-privacidad',
    },
    {
      name: 'Política integrada de gestión',
      url: '/politica-integrada-de-gestion',
    },
    {
      name: 'Derechos Arco',
      url: '/procedimiento-arco',
    },
    {
      name: 'Politicas de Cookies',
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
        position: 'Copyright © ojo.pe',
        name:
          '© Empresa Editora El Comercio - Copyright © Elcomercio.pe - Grupo El Comercio - Todos los derechos reservados.',
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
        position: 'Director General',
        names: ['FRANCISCO MIRÓ QUESADA CANTUARIAS'],
      },
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
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-21.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-22.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-23.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-24.html',
    'https://d1r08wok4169a5.cloudfront.net/ads-gestion/ads-fia-28253241-ges_ia_interna1-300x250-div-gpt-ad-8599377-25.html',
  ],
  activeSignwall: true,
  activePaywall: true,
  gda: true, // Grupo Diarios de America
}
