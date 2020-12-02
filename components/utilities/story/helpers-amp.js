import { OPTA_WIDGET } from '../constants/opta'
import {
  SITE_PERU21,
  SITE_ELCOMERCIO,
  SITE_TROME,
  SITE_DEPOR,
  SITE_ELBOCON,
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIOMAG,
} from '../constants/sitenames'

const createMarkup = html => {
  return {
    __html: html,
  }
}

// TODO: hacer que sea una sola funcion con la de helpers.js y dates.js
export const formatDateTime = date => {
  const newDate = new Date(date)
  const dateTime = new Intl.DateTimeFormat('es-419-u-hc-h12', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'America/Lima',
    hour12: true,
  })

  return dateTime.format(newDate)
}

export const publicidadAmp = ({
  dataSlot,
  width,
  height,
  primarySectionLink = '/peru',
  movil1 = '',
  arcSite = '',
  size = '300x600,300x250,320x100,320x50,300x100,300x50',
}) => {
  const secctionPrimary = primarySectionLink.split('/')
  let resultData = ''
  const json =
    (SITE_PERU21 === arcSite &&
      `json='{"targeting":{"invent_type":["AMP"]}}'`) ||
    ''
  const nuevoScript =
    (movil1 &&
      `data-multi-size="${size}"
  data-multi-size-validation="false"`) ||
    ''

  if (secctionPrimary[1] !== 'respuestas') {
    resultData = `
  <amp-ad width="${width}" height="${height}" type="doubleclick"
  data-slot="${dataSlot}" ${nuevoScript}  ${json}></amp-ad>`
  }
  return createMarkup(resultData)
}
export const publicidadAmpAd = ({
  dataSlot,
  width,
  height,
  primarySectionLink = '/peru',
  movil1 = '',
  arcSite = '',
  size = '300x250,320x100,320x50,300x100,300x50',
}) => {
  const secctionPrimary = primarySectionLink.split('/')
  let resultData = ''
  const json =
    (SITE_PERU21 === arcSite &&
      `json='{"targeting":{"invent_type":["AMP"]}}'`) ||
    ''

  const flying1 =
    (movil1 === false && `<amp-fx-flying-carpet height="600px">`) || ''
  const flying2 = (movil1 === false && `</amp-fx-flying-carpet>`) || ''

  const height2 = (movil1 === false && '600') || height

  const nuevoScript =
    (movil1 &&
      `data-multi-size="${size}"
  data-multi-size-validation="false"`) ||
    `data-multi-size="1x1"
    data-multi-size-validation="false"`

  if (secctionPrimary[1] !== 'respuestas') {
    resultData = `${flying1}
  <amp-ad width="${width}" height="${height2}" type="doubleclick"
  data-slot="${dataSlot}" ${nuevoScript}  ${json}></amp-ad>${flying2}`
  }
  return createMarkup(resultData)
}
export const publicidadAmpMovil0 = ({ dataSlot, arcSite = '' }) => {
  let resultData = ''
  const json =
    (SITE_PERU21 === arcSite &&
      `json='{"targeting":{"invent_type":["AMP"]}}'`) ||
    ''
  resultData = `<amp-ad
    width="320"
    height="50"
    type="doubleclick"
    data-slot="${dataSlot}"
    data-multi-size="fluid,728x90,320x50"
    data-multi-size-validation="false"
    ${json}
  />`
  return createMarkup(resultData)
}

export const optaWidgetHtml = html => {
  if (html.indexOf('<opta-widget') === -1) return html
  const matches = html.match(/<opta-widget (.*?)>(.*)<\/opta-widget>/)
  const matchesResult = matches
    ? matches[1].replace(/="| = "| =/g, '=').replace(/"/g, '&')
    : ''
  const ampTag = `<amp-iframe class="media" width="1" height="1" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="${OPTA_WIDGET}/optawidget?${matchesResult}" ></amp-iframe>`
  const result = html.replace(/<opta-widget (.*?)>(.*)<\/opta-widget>/g, ampTag)
  return result
}

export const imageHtmlMxm = html => {
  let resHtml = html

  const rplImageCde =
    '<amp-img class="media 1" src="$2" layout="responsive" width="304" height="200"></amp-img>'

  resHtml = resHtml
    .replace(
      /<img class="([A-Za-z0-9-]*[A-Za-z0-9-])" src="((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?)">/gm,
      rplImageCde
    )
    .replace(/:icon:/g, '')
    .replace(
      /:fijado:/g,
      '<div class="fijado"><div class="icon-compartir"><svg xmlns="http://www.w3.org/2000/svg" class="icon-compartir" width="20" height="20" viewBox="0 0 475 475"><path d="M380 247c-15-19-32-28-51-28V73c10 0 19-4 26-11 7-7 11-16 11-26 0-10-4-18-11-26C347 4 339 0 329 0H146c-10 0-18 4-26 11-7 7-11 16-11 26 0 10 4 19 11 26 7 7 16 11 26 11v146c-19 0-36 9-51 28-15 19-22 40-22 63 0 5 2 9 5 13 4 4 8 5 13 5h115l22 139c1 5 4 8 9 8h0c2 0 4-1 6-2 2-2 3-4 3-6l15-138h123c5 0 9-2 13-5 4-4 5-8 5-13C402 287 395 266 380 247zM210 210c0 3-1 5-3 7-2 2-4 3-7 3-3 0-5-1-7-3-2-2-3-4-3-7V82c0-3 1-5 3-7 2-2 4-3 7-3 3 0 5 1 7 3 2 2 3 4 3 7V210z" data-original="#000000"/></svg></div></div>'
    )

  return resHtml
}

export const imageHtml = html => {
  if (html.indexOf('<img') === -1) return html

  /**
   * @TODO hacer que capture el atributo alt
   * @see regexp example: https://regex101.com/r/k8a9iF/1
   */
  const regex = /(?:<figure(?:.*?)>)?<img(?:.*?)src="(.*?)"(?:.*?)\/?>(?:<\/figure>)?/gi
  const ampTag =
    '<amp-img class="media 1" src="$1" layout="responsive" width="304" height="200"></amp-img>'
  const result = html.replace(regex, ampTag)

  return result
}

/**
 * @deprecated esta funcion ahora esta debidamente optimizada en
 * imageHtml. Funciona para notas MIGRADAS y NUEVAS.
 */
export const imageHtmlLegacy = html => {
  let resHtml = ''
  resHtml = html.replace('<figure>', '').replace('</figure>', '')

  const rplImageCde =
    '<amp-img class="media 1" src="$2" layout="responsive" width="304" height="200"></amp-img>'
  const rplImageCde1 =
    '<amp-img class="media 2" src="$1" layout="responsive" width="304" height="200"></amp-img>'

  resHtml = resHtml
    .replace(/<img (.*) src="(.*)" width="(.*?)" (.*)\/>/g, rplImageCde)
    .replace(/<img (.*)src="(.+?)" alt="(.+?)">/g, rplImageCde)
  resHtml = resHtml.replace(
    /<div class="nota-media"><img src="(.*?)" border="0" width="(.+)"(.*)><\/div>/g,
    rplImageCde1
  )
  resHtml = resHtml
    .replace(/<img (.*)src="(.*)" width="(.*?)" (.*)\/>/g, rplImageCde)
    .replace(/<img (.*)src="(.*)" width="(.*?)" (.*)>/g, rplImageCde)

  resHtml = resHtml.replace(/<img (.*)src="(.*)" (.*)\/>/g, rplImageCde)
  resHtml = resHtml
    .replace(/<img (.*)src="(.*)" style="(.*);">/g, rplImageCde)
    .replace(/:<script(.*)>(.*)<\/script>:/gm, '')
  resHtml = resHtml.replace(
    /<img class="([A-Za-z0-9-]*[A-Za-z0-9-])" src="((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?)">/gm,
    rplImageCde
  )
  resHtml = resHtml.replace(
    /<img (.*)src="([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~;+#!-])">/g,
    rplImageCde
  )
  resHtml = resHtml.replace(/<img (.*)src="(.*)" (.*)>/g, rplImageCde)
  resHtml = resHtml.replace(/<img src="(.*?)">/g, rplImageCde1)
  resHtml = resHtml
    .replace(/<img src="(.*?)"\/>/g, rplImageCde1)
    .replace(/<img src=(.*?)\/>/g, rplImageCde1)
  resHtml = resHtml
    .replace(/<img src="(.*?)" width="(.+)"(.*)>/g, rplImageCde1)
    .replace(/<IMG (.*)SRC="(.*)"alt(.*) WIDTH=([0-9])\w+>/g, rplImageCde)
    .replace(/<IMG (.*)SRC="(.*)" WIDTH=([0-9])\w+>/g, rplImageCde)
    .replace('<FONT', '<font')

  return resHtml
}

export const playerHtml = html => {
  if (html.indexOf('player.performgroup.com/eplayer.js') === -1) return html

  const regex = /<script src="\/\/player.performgroup.com\/eplayer.js#(.*?)" async><\/script>/g
  const ampTag =
    '<amp-iframe width="1" height="1" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="https://player.performgroup.com/eplayer/eplayer.html#/$1"></amp-iframe>'
  const result = html.replace(regex, ampTag)

  return result
}

export const jwPlayerJS = html => {
  if (html.indexOf('cdn.jwplayer.com') === -1) return html

  const regex = /^(?:.+)cdn.jwplayer.com\/players\/(.+)-(.+).js(?:.+)/
  const ampTag =
    '<amp-jwplayer data-player-id="$2" data-media-id="$1" layout="responsive" width="16" height="9"></amp-jwplayer>'
  const result = html.replace(regex, ampTag)

  return result
}

export const twitterHtml = html => {
  if (html.indexOf('twitter.com') === -1) return html

  const regex = /<blockquote class="twitter-tweet"(?:.*)<a href="https:\/\/twitter.com\/(?:.*)\/status\/(.*)">(?:.*)<\/blockquote>/g
  const regexLegacy = /<twitter[-]?widget.*data-tweet-id="(.*?)".*><\/twitter[-]?widget>/g
  const regexEmpty = /<script.*?>.*?<\/script>|<\/?center>/g
  const ampTag =
    '<amp-twitter class="media" width=1 height=1 layout="responsive" data-tweetid="$1" ></amp-twitter>'

  const result =
    html.indexOf('<blockquote') !== -1
      ? html.replace(regex, ampTag)
      : html.replace(regexLegacy, ampTag)

  return result.replace(regexEmpty, '')
}

/**
 * @deprecated esta funcion por ahora no se esta usando
 */
export const deporPlay = html => {
  const rplDeporPlay =
    '<amp-iframe class="media" src="https://w.soundcloud.com/player/$2"  height="400"  width="600"  frameborder="0"   title="Google map pin on Googleplex, Mountain View CA"    layout="responsive"     sandbox="allow-scripts allow-same-origin allow-popups"     frameborder="0"></amp-iframe>'

  const htmlDataDeporPlay = html.replace(
    /<iframe (.*) src="https:\/\/w.soundcloud.com\/player\/(.*)"><\/iframe>/g,
    rplDeporPlay
  )
  return htmlDataDeporPlay
}

export const uploadsUrls = (html, arcSite) => {
  let result = html
  const regexMedia = /(\/media\/[\w-]+)/g
  const regexUploads = /(\/uploads\/(?:.*)\/(?:.*)\/(?:.*)\/(?:.*)(?:jpeg|jpg|png|gif|mp4|mp3))/g

  if (arcSite === SITE_ELCOMERCIO) {
    const replaceUploads = 'https://img.elcomercio.pe$1'
    result = result.replace(regexMedia, replaceUploads)
    result = result.replace(regexUploads, replaceUploads)
  } else if (arcSite === SITE_DEPOR) {
    const replaceUploads = 'https://img.depor.com$1'
    const regexSoundcould = /<iframe(?:.*) src="(?:.*)soundcloud.com\/playlists\/([0-9]*[0-9])(?:.+)">(?:.*)<\/iframe>/g
    const ampTagSoundcloud = `<amp-soundcloud width="480" height="480" layout="responsive" data-playlistid="$1" data-visual="true" ></amp-soundcloud>`

    result = result.replace(regexMedia, replaceUploads)
    result = result
      .replace(regexUploads, replaceUploads)
      .replace(regexSoundcould, ampTagSoundcloud)
  } else if (arcSite === SITE_TROME) {
    const replaceUploads = 'https://opta.minoticia.pe$1'
    result = result.replace(regexMedia, replaceUploads)
    result = result.replace(regexUploads, replaceUploads)
  } else if (arcSite === SITE_DIARIOCORREO) {
    const replaceUploads = 'https://cdne.diariocorreo.pe$1'
    result = result.replace(regexMedia, replaceUploads)
    result = result.replace(regexUploads, replaceUploads)
  } else if (arcSite === SITE_PERU21) {
    const replaceUploads = 'https://img.peru21.pe$1'
    result = result.replace(regexMedia, replaceUploads)
    result = result.replace(regexUploads, replaceUploads)
  }

  return result
}

export const iframeHtml = html => {
  let result = html

  if (result.indexOf('<iframe') !== -1) {
    const regexIframe = /<iframe.*?src=["|'](.*?)["|'].*?>.*?<\/iframe>/g
    const replaceIframeBasic =
      '<amp-iframe class="media" src="$1" height="400" width="600" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0"></amp-iframe>'
    result = result.replace(regexIframe, replaceIframeBasic)
  }

  result = result
    .replace(
      /<(?:style|[:]?script|form|twitterwidget|twitter|iframe|mxm-partido|embed).*?>.*?<\/(?:style|script[:]?|form|twitterwidget|twitter|iframe|mxm-partido|embed).*?>/gs,
      ''
    )
    .replace(/http:/g, 'https:')
    .replace(/src="\/\//g, 'src="https://')
    .replace(/target="blank"/g, 'target="_blank"')
  return result
}

export const iframeHtmlLegacy = (html, arcSite = '') => {
  let result = html

  if (arcSite === SITE_ELCOMERCIO) {
    result = result.replace(
      /(\/media\/([0-9-a-z-A-Z])\w+)/g,
      'https://img.elcomercio.pe$1'
    )

    result = result.replace(
      /https:\/\/elcomercio.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.elcomercio.pe$1'
    )
  } else if (arcSite === SITE_DEPOR) {
    result = result.replace(
      /(https:\/\/depor.com\/media\/([0-9-a-z-A-Z])\w+)/g,
      '$1'
    )
    const replaceTwitter = `<amp-soundcloud width="480" height="480" layout="responsive" data-playlistid="$3" data-visual="true" ></amp-soundcloud>`
    result = result
      .replace(
        /https:\/\/depor.com(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
        'https://img.depor.com$1'
      )
      .replace(
        /<iframe(.*) src="(.*)soundcloud.com\/playlists\/([0-9]*[0-9])(.+)">(.*)<\/iframe>/g,
        replaceTwitter
      )
  } else if (arcSite === SITE_TROME) {
    result = result.replace(
      /(\/media\/([0-9-a-z-A-Z])\w+)/g,
      'https://opta.minoticia.pe$1'
    )

    result = result.replace(
      /https:\/\/trome.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://opta.minoticia.pe$1'
    )
  } else if (arcSite === SITE_DIARIOCORREO) {
    result = result.replace(
      /http:\/\/diariocorreo.pe(\/media\/([0-9-a-z-A-Z])\w+)/g,
      'https://cdne.diariocorreo.pe$1'
    )
    result = result.replace(
      /https:\/\/diariocorreo.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://cdne.diariocorreo.pe$1'
    )
  } else {
    result = result.replace(
      /(\/media\/([0-9-a-z-A-Z])\w+)/g,
      'https://img.peru21.pe$1'
    )
    result = result.replace(
      /https:\/\/peru21.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.peru21.pe$1'
    )
  }

  if (result.indexOf('<iframe') !== -1) {
    const regexIframe = /<iframe.*?src=["|'](.*?)["|'].*?>.*?<\/iframe>/g
    const replaceIframeBasic =
      '<amp-iframe class="media" src="$1" height="400" width="600" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0"></amp-iframe>'
    result = result.replace(regexIframe, replaceIframeBasic)
  }

  result = result
    .replace(/(<script.*?>).*?(<\/script>)/g, '')
    .replace(/:<script(.*)>(.*)<\/script>:/gm, '')
    .replace(/<html_free><blockquote (.*)">/g, '')
    .replace(/<\/blockquote><\/html_free>/g, '')
    .replace('</p>', '')
    .replace('<p>', '')
    .replace('http://', 'https://')
    .replace('src="//', 'src="https://')
    .replace(/<(-?\/)?html_free>/g, '')
    .replace(/<(-?\/)?object(-?.+)?>/g, '')
    .replace(/<embed(.*)><\/embed>/g, '')
    .replace('target="blank"', 'target="_blank"')
    .replace(/<(-?\/)?blockquote(-?.+)?>/g, '')
    .replace(/onclick="(.*)"/g, '')
    .replace(/<mxm-partido (.+)<\/mxm-partido>/g, '')
    .replace(/<span (.*)>/g, '<span>')
    .replace(/<(.+):p>/g, '<span>')
    .replace(/<font(-?(.+?))>(.+?)<\/font>/g, '$3')
    .replace(/<font(.*)>(?:.*(?:))<\/font>/g, '$2')
    .replace(
      /<(font|eqwql|nimfw|yt|st1)(.*)>(?:.*(?:))<\/(font|eqwql|nimfw|yt|st1)>/g,
      '$2'
    )
    .replace(/<hl2>(.+)<\/hl2>/g, '$1')
    .replace(/(function(.*\n)*.*'facebook-jssdk')\)\);/g, '')

    // .replace(/<script>(.*\n)+.*<\/script>/gm, '')
    .replace(/<(style|script)(.*)>(.*\n)*.*<\/(style|script)(.*)>/g, '')
    .replace(/script/gm, 'noscript')
    .replace(/<noscript(.*)>/gm, '<noscript>')
    .replace(/<\/noscript/gm, '</noscript>')
    .replace(/<\/noscript>>/gm, '</noscript>')
    .replace(/type="application\/ld\+json"/gm, '')
    // .replace(/<(-?\/)?script>/gm, '')
    .replace(/<form (.*)>(.*\n)*.*<\/form>/g, '')

    .replace('var js, fjs = d.getElementsByTagName(s)[0];', '')
    .replace('if (d.getElementById(id)) return;', '')
    .replace('js = d.createElement(s); js.id = id;', '')
    .replace('(function(d, s, id) {', '')
    .replace('fjs.parentNode.insertBefore(js, fjs);', '')
    .replace("}(document, 'script', 'facebook-jssdk'));", '')
    .replace(/js.src = "\/\/connect.facebook.net\/en_US\/sdk.js.*";/g, '')
    .replace(/(style="([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~; +#!-])+")/g, '')
    .replace(
      /<(twitterwidget|twitter|iframe|font)(?:.*(?:))>(?:.*(?:))<\/(twitterwidget|twitter|iframe|font)>/g,
      ''
    )
    .replace(/<iframe(.*)>\s*\n<\/iframe>/gm, '')
    .replace(/(hreef=)/g, 'href=')
    .replace(/(marked="([A-Za-z0-9]+)")/g, '')
    .replace('imageanchor="1"', '')
    .replace('allow-noscripts', 'allow-scripts') // temporal, para revertir .replace(/script/gm, 'noscript')
  return result
}

export const facebookHtml = html => {
  let resultHtml = html

  if (resultHtml.indexOf('facebook.com/plugins/video.php') !== -1) {
    const regexVideo = /<iframe.*www.facebook.com\/plugins\/video.php\?href=(.*?)".*>.*<\/iframe>/g
    const replacePlugin =
      '<amp-facebook width="500" height="310" layout="responsive" data-embed-as="video" data-href="$1"></amp-facebook>'
    resultHtml = resultHtml.replace(regexVideo, replacePlugin)

    try {
      resultHtml = decodeURIComponent(resultHtml).replace(
        /<iframe(.+?)(https?:\/\/www\.facebook\.com\/(?:video\.php\?v=\d+|.*?href=))((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?)"(.+?)><\/iframe>/g,
        '<amp-facebook width="500" height="310" layout="responsive" data-embed-as="video" data-href="$3"></amp-facebook>'
      )
    } catch (error) {
      //  console.log(error)
    }
    return resultHtml
  }

  if (resultHtml.indexOf('facebook.com/plugins/post.php') !== -1) {
    const regexPost = /<iframe.*www.facebook.com\/plugins\/post.php\?href=(.*?)&.*>.*<\/iframe>/g
    const replacePlugin =
      '<amp-facebook width="500" height="310" layout="responsive" data-href="$1"></amp-facebook>'
    resultHtml = resultHtml.replace(regexPost, replacePlugin)
    try {
      resultHtml = decodeURIComponent(resultHtml)
    } catch (error) {
      //  console.log(error)
    }
    return resultHtml
  }

  // fallback para iframes de facebook
  if (resultHtml.indexOf('<iframe src=') !== -1) {
    const regexIframe = /<iframe src="(.*?)&width=500"><\/iframe>/g
    const replaceIframe =
      '<amp-facebook class="media" width=1 height=1 layout="responsive" data-href="$1"></amp-facebook>'
    return resultHtml.replace(regexIframe, replaceIframe)
  }

  if (resultHtml.indexOf('fb-root') !== -1) {
    const regexRoot = /<div id="fb-root"><\/div>/g
    resultHtml = resultHtml.replace(regexRoot, '')
  }

  if (resultHtml.indexOf('class="fb-page"') !== -1) {
    const regexPage = /<div class="fb-page" data-href="(.*?)" data-width="(?:.*?)" data-small-header="(?:.*?)" data-adapt-container-width="(?:.*?)" data-hide-cover="(.*?)" data-show-facepile="(?:.*?)" data-show-posts="(?:.*?)"><div class="fb-xfbml-parse-ignore"><blockquote cite="(?:.*?)"><a href="(?:.*?)">(?:.*?)<\/a><\/blockquote><\/div><\/div>/g
    /* const replacePage =
      '<amp-facebook-page width="340" height="130" layout="fixed" data-hide-cover="$2" data-href="$1"></amp-facebook-page>' */
    resultHtml = resultHtml.replace(regexPage, '')
  }

  return resultHtml
}

export const youtubeHtml = html => {
  const youtubeExists = /<iframe.+youtu\.be|youtube\.com/.test(html)
  if (!youtubeExists) return html

  /**
   * Si se quiere que el alto del video no sea 350 siempre,
   * usar la expresion regular de ejemplo en el enlace y
   * modificar ampTag para que reciba los parametros $1 y $2
   * adecuadamente.
   * @see regex example https://regex101.com/r/nQLJfq/1
   */
  const regex = /<iframe.*(?:youtu\.be|youtube\.com)(?:\/(?:embed|v)\/|\/(?:watch|ytscreeningroom)\?v=|\/user\/\S+)([\w-]{10,12})(?:.*?)><\/iframe>/
  const ampTag =
    '<amp-youtube class="media" data-videoid="$1" layout="responsive" width="550" height="350"></amp-youtube>'
  const result = html.replace(regex, ampTag)

  return result
}

/**
 * @deprecated esta funcion ahora esta debidamente optimizada en
 * youtubeHtml. Funciona para notas MIGRADAS y NUEVAS.
 */
export const youtubeHtmlLegacy = html => {
  const rplYoutube =
    '<amp-youtube class="media" data-videoid="$3" layout="responsive" width="550" height="$2"></amp-youtube>'
  const rplYoutube1 =
    '<amp-youtube class="media" data-videoid="$3" layout="responsive" width="550" height="350"></amp-youtube>'

  return html
    .replace(
      /<iframe width="(.*?)" src="(.+)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{10,12})(.*)><\/iframe>/g,
      rplYoutube1
    )
    .replace(
      /<iframe width="(.*?)" height="(.*?)" src="https:\/\/www.youtube.com\/embed\/(.*?)"(.*)><\/iframe>/g,
      rplYoutube
    )
    .replace(
      /<iframe width="(.*?)" height="(.*?)" src="\/\/www.youtube.com\/embed\/(.*?)"(.*)><\/iframe>/g,
      rplYoutube
    )
    .replace(
      /<iframe (.*) src="(.+)?youtube.com\/embed\/([A-Za-z0-9 _]*[A-Za-z0-9])(.*)" (.*)><\/iframe>/g,
      rplYoutube1
    )
    .replace(
      /<iframe (.*) src="(.+)?youtube.com\/embed\/(.*?)" (.*)>\s*\n<\/iframe>/gm,
      rplYoutube1
    )
    .replace(
      /<iframe (.*) src="(.+)?youtube.com\/embed\/(.*?)" (.*)><\/iframe>/g,
      rplYoutube1
    )
    .replace(/videoid="(.+?)\?list=(.+) layout/g, 'videoid="$1" layout')
}

/**
 * @deprecated esta funcion por ahora no se esta usando
 */
export const replaceHtmlMigracion = html => {
  return html.replace(/<figure.*http:\/\/cms.minoticia.*<\/figure>/g, '')
}

export const instagramHtml = html => {
  if (html.indexOf('instagram.com') === -1) return html

  const regex = /<blockquote (?:.*)class="instagram-media(?:.*)="https:\/\/www.instagram.com\/(?:p|tv)\/(.*?)\/(?:.*?)<\/blockquote>/g
  const ampTag =
    '<amp-instagram data-shortcode="$1" width="1" height="1" layout="responsive"></amp-instagram>'
  const result = html.replace(regex, ampTag)

  return result
}

/**
 * @deprecated esta funcion ahora esta debidamente optimizada en
 * instagramHtml. Funciona para notas MIGRADAS y NUEVAS.
 */
export const instagramHtmlLegacy = html => {
  const rplInstagram =
    '<amp-instagram data-shortcode="$3" width="1" height="1" layout="responsive"></amp-instagram>'

  return html.replace(
    /<blockquote (.*)class="instagram-media"(.*)data-instgrm-permalink="https:\/\/www.instagram.com\/p\/(.*?)\/(.*?)<\/blockquote>/g,
    rplInstagram
  )
}

export const freeHtml = html => {
  if (html.indexOf('<html_free>') === -1) return html

  const regex = /<html_free>(.*?)<\/html_free>/g
  const result = html
    .replace(regex, '$1')
    .replace(/="&quot;http?(.*?)"/g, '="http$1"')

  return result
}

export const iframeMxm = (html, arcSite) => {
  let resHtml = html
  const strWidgetVivo =
    '/<script src="https://w.ecodigital.pe/widget.depor.v2.js?v4"></script>/g'
  const rplWidgetVivo = ''
  const strWidgetVivo2 = `<script>var f = new ECO.Widget({width: 625,height: 900}).draw("depor/wg-${arcSite}/(.*?)");</script>/g`

  const rplWidgetVivo3 =
    '<amp-iframe class="media" width="1" height="3" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="https://img.elcomercio.pe/widgets/envivo/$1/$2"></amp-iframe>'
  const rplWidgetVivo4 =
    '<amp-iframe class="media" width="1" height="3" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="https://img.elcomercio.pe/widgets/envivogeneral/$1/$2"></amp-iframe>'

  resHtml = resHtml
    .replace(strWidgetVivo, rplWidgetVivo)
    .replace(strWidgetVivo2, rplWidgetVivo3)
    .replace(
      /<mxm-partido code="(.*)" h="(.*)px"><\/mxm-partido>/g,
      rplWidgetVivo3
    )
    .replace(/<mxm-evento code="(.*)" h="(.*)px"><\/mxm>/g, rplWidgetVivo4)
    .replace(/<mxm id="(.*)"><\/mxm>/gm, '')

  // pendiente de validacion enventos 485178
  return resHtml.replace(/<mxm-(.*) (.*)><\/mxm>/g, '')
}

export const mxmDelete = html => {
  if (html.indexOf('<mxm-') === -1) return html
  return html.replace(/<mxm-event (.*)><\/mxm-event>/gm, '')
}

export const ampHtml = (html = '', arcSite = '', migrated = false) => {
  let resultData = html
  const isModernMag = arcSite === SITE_ELCOMERCIOMAG && !migrated
  // Opta Widget
  // Esta asignacion se esta sobreescribiendo con la que sigue.
  // resultData = replaceHtmlMigracion(html)

  // Opta Widget
  // resultData = deporPlay(html)

  // Opta Widget
  resultData = optaWidgetHtml(resultData)

  if (arcSite !== SITE_ELCOMERCIOMAG) {
    // Player
    resultData = playerHtml(resultData)
  }
  if (resultData.includes('mxm-')) {
    resultData = imageHtmlMxm(resultData, arcSite)
  }
  // imagenes
  resultData = isModernMag ? imageHtml(resultData) : imageHtmlLegacy(resultData)

  // JWplayer JS version
  if (arcSite === SITE_ELBOCON || arcSite === SITE_DEPOR) {
    resultData = jwPlayerJS(resultData)
  }
  // twitter
  resultData = twitterHtml(resultData)

  // instagram
  resultData = isModernMag
    ? instagramHtml(resultData)
    : instagramHtmlLegacy(resultData)

  // facebook
  resultData = facebookHtml(resultData)

  // Youtube
  resultData = isModernMag
    ? youtubeHtml(resultData)
    : youtubeHtmlLegacy(resultData)

  // HTML Free
  resultData = freeHtml(resultData)

  if (isModernMag) {
    resultData = uploadsUrls(resultData, arcSite)
    resultData = iframeHtml(resultData)
  } else if (!resultData.includes('mxm-')) {
    resultData = iframeHtmlLegacy(resultData, arcSite)
  }

  // Mxm Iframe
  if (arcSite === SITE_ELCOMERCIO) {
    resultData = iframeMxm(resultData)
  }

  resultData = mxmDelete(resultData)
  return resultData
}
