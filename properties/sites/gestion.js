export default {
  siteName: 'Gestion',
  colorPrimary: '#8F071F',
  colorSecondary: '#F4E0D2',
  googleFonts: 'Judson:400,700|Roboto|Libre+Franklin:400,700',
  siteDomain: 'gestion.pe',
  siteUrl: 'https://gestion.pe',
  resizerUrl: 'https://elcomercio-gestion-prod.cdn.arcpublishing.com/resizer',
  resizerSecretKeyEnvVar: '',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/ECO_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
  fbAppId: '1667917060088448',
  googleTagManagerId: 'GTM-WGPJNC',
  ampGoogleTagManagerId: 'UA-3055636-3',
  ampGoogleTagManagerName: 'gestion',
  charbeatAccountNumber: 57773,
  idGoogleAnalitics: 'UA-3055636-3',
  fbArticleStyle: 'LogoGestion',
  siteDescription:
    'Noticias de Perú y el mundo en Gestion.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
  googleNewsImage: 'https://publimetro.pe/f/i/pub_40.png',
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
    termsAndConditions: '',
    guidingPrinciples: '',
    privacyPolicies: 'YK7SFEAX3VD4HOYGEPH3Y6ZYNQ',
    integratedManagementPolicy: '',
    arcoProcedure: '',
    cookiesPolicy: '',
    aboutUs: '',
  },

  assets: {
    path: `/resources/dist/gestion/`,
    paywall() {
      return `${this.path}${this.logo}`
    },
    logo: `images/logo.svg`,
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
}
