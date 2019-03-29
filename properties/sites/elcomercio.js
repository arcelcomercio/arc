export default {
  siteName: 'El comercio',
  colorPrimary: '#f7c600',
  siteUrl: 'elcomercio.pe',
  resizerUrl: 'http://resizer.shared.arcpublishing.com',
  resizerSecretKeyEnvVar: 'Fmkgru2rZ2uPZ5wXs7B2HbVDHS2SZuA7',

  metaSitio: {
    favicon: 'https://sitio.pe/favicon.ico',
    appleIcon: 'https://sitio.pe/apple-touch-icon.png',
    canonical: 'https://sitio.pe/url-canonical-de-la-pagina',
    ldjson: `{
        "@context" : "http://schema.org",
        "@type" : "Organization",
        "name" : "Nombre Sitio",
        "url" : "https://sitio.pe/",
        "logo": "https://sitio.pe/[ruta_images]/logo-sitio.jpg",
        "sameAs" : [
          "https://www.facebook.com/nombresitio",
          "https://twitter.com/nombresitio",
          "https://www.youtube.com/user/nombresitio",
          "https://www.pinterest.es/nombresitio/"
        ]
      }`
  },

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
  },
}