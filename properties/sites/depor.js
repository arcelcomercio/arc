export default {
  siteName: 'Depor',
  colorPrimary: '#007c31',
  siteDomain: 'depor.com',
  siteUrl: 'https://depor.com',
  resizerUrl: 'http://resizer.shared.arcpublishing.com',
  resizerSecretKeyEnvVar: 'Fmkgru2rZ2uPZ5wXs7B2HbVDHS2SZuA7',
  urlPreroll:
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/DEPOR_Preroll&description_url=[placeholder]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&unviewed_position_start=1',
  fbAppId: 'fbappidDEEEEEPOR',
  googleTagManagerScript: `(function (w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    })
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', 'GTM-KKXTKGP')`,
  googleTagManagerId: 'GTM-KKXTKGP',
  sfAccountNumber: 99999,

  footer: {
    siteLegal: [
      'Empresa Editora Depor',
      'Jr. Santa Rosa #300 Lima 1 Perú',
      'Copyright © Depor.pe',
      'Grupo Depor - Todos los derechos reservados',
    ],

    socialNetworks: [
      {
        name: 'facebook',
        url: 'https://www.facebook.com/depor.pe',
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/depor_peru',
      },
      {
        name: 'google+',
        url: 'https://plus.google.com/u/0/+deporpe',
      },
    ],
  },
  social: {
    facebook: {
      name: 'facebook',
      user: '@depor.com',
      url: 'https://www.facebook.com/depor.com',
    },
    twitter: {
      name: 'twitter',
      user: '@depor_peru',
      url: 'https://twitter.com/depor_peru',
    },
    youtube: {
      name: 'youtube',
      url: 'https://plus.google.com/u/0/+deporcom',
    },
  },
}