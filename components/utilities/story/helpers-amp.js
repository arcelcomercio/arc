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

import formatTime from '../date-time/format-time'

const createMarkup = html => {
  return {
    __html: html,
  }
}

export const formatDateStoryAmp = date => {
  const fecha = new Date(date)
  fecha.setHours(fecha.getHours() - 5)
  const day = fecha.getDate()
  const month = fecha.getMonth() + 1
  const formatDay = day < 10 ? `0${day}` : day
  const formatMonth = month < 10 ? `0${month}` : month
  return `Actualizado el ${formatDay}/${formatMonth}/${fecha.getFullYear()} a las ${formatTime(
    fecha
  )}`
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

  const matches = html.match(/<opta-widget(.*?)><\/opta-widget>/)
  const matchesResult = matches
    ? matches[1].replace(/="/g, '=').replace(/" /g, '&')
    : ''

  const ampTag = `<amp-iframe class="media" width="1" height="1" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="${OPTA_WIDGET}/optawidget?${matchesResult} ></amp-iframe>`
  const result = html.replace(/<opta-widget (.*?)><\/opta-widget>/g, ampTag)

  return result
}

export const playerHtml = html => {
  if (html.indexOf('player.performgroup.com/eplayer.js') === -1) return html

  const regex = /<script src="\/\/player.performgroup.com\/eplayer.js#(.*?)" async><\/script>/g
  const ampTag =
    '<amp-iframe width="1" height="1" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="https://player.performgroup.com/eplayer/eplayer.html#/$1"></amp-iframe>'
  const result = html.replace(regex, ampTag)

  return result
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
  const regexLegacy = /<twitter[-]?widget(?:.*)data-tweet-id="(.*)"><\/twitter[-]?widget>/g
  const regexScript = /<script.*?>.*?<\/script>/g
  const ampTag =
    '<amp-twitter class="media" width=1 height=1 layout="responsive" data-tweetid="$1" ></amp-twitter>'

  const result =
    html.indexOf('<blockquote') !== -1
      ? html.replace(regex, ampTag)
      : html.replace(regexLegacy, ampTag)

  return result.replace(regexScript, '')
}

export const instagramHtml = html => {
  if (html.indexOf('instagram.com') === -1) return html

  const regex = /<blockquote (?:.*)class="instagram-media"(?:.*)data-instgrm-permalink="https:\/\/www.instagram.com\/p\/(.*?)\/(?:.*?)<\/blockquote>/g
  const ampTag =
    '<amp-instagram data-shortcode="$1" width="1" height="1" layout="responsive"></amp-instagram>'
  const result = html.replace(regex, ampTag)

  return result
}

export const facebookHtml = html => {
  let resultHtml = html
  const replacePlugin =
    '<amp-facebook width="500" height="310" layout="responsive" data-embed-as="video" data-href="$1"></amp-facebook>'

  if (resultHtml.indexOf('facebook.com/plugins/video.php') !== -1) {
    const regexVideo = /<iframe(?:.*?)www.facebook.com\/plugins\/video.php\?href=(.*?)"(?:.*?)>(.*?)<\/iframe>/g
    resultHtml = resultHtml.replace(regexVideo, replacePlugin)
    return decodeURIComponent(resultHtml)
  }

  if (resultHtml.indexOf('facebook.com/plugins/post.php') !== -1) {
    const regexPost = /<iframe(?:.*?)www.facebook.com\/plugins\/post.php\?href=(.*?)&amp;(?:.*?)>(.*?)<\/iframe>/g
    resultHtml = resultHtml.replace(regexPost, replacePlugin)
    return decodeURIComponent(resultHtml)
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
    const replacePage =
      '<amp-facebook-page width="340" height="130" layout="fixed" data-hide-cover="$2" data-href="$1"></amp-facebook-page>'
    resultHtml = resultHtml.replace(regexPage, replacePage)
  }

  return resultHtml
}

export const youtubeHtml = html => {
  if (html.indexOf('youtu') === -1) return html

  /**
   * Si se quiere que el alto del video no sea 350 siempre,
   * reemplazar height="350" por height="$1" en ampTag.
   * @see regex example https://regex101.com/r/nQLJfq/1
   */
  const regex = /<iframe.*height="(.*?)".*(?:youtu\.be|youtube\.com)(?:\/(?:embed|v)\/|\/(?:watch|ytscreeningroom)\?v=|\/user\/\S+)([\w-]{10,12})(?:.*?)><\/iframe>/
  const ampTag =
    '<amp-youtube class="media" data-videoid="$2" layout="responsive" width="550" height="350"></amp-youtube>'
  const result = html.replace(regex, ampTag)

  return result
}

/* export const deporPlay = html => {
  const rplDeporPlay =
    '<amp-iframe class="media" src="https://w.soundcloud.com/player/$2"  height="400"  width="600"  frameborder="0"   title="Google map pin on Googleplex, Mountain View CA"    layout="responsive"     sandbox="allow-scripts allow-same-origin allow-popups"     frameborder="0"></amp-iframe>'

  const htmlDataDeporPlay = html.replace(
    /<iframe (.*) src="https:\/\/w.soundcloud.com\/player\/(.*)"><\/iframe>/g,
    rplDeporPlay
  )
  return htmlDataDeporPlay
} */

export const freeHtml = html => {
  if (html.indexOf('<html_free>') === -1) return html

  const regex = /<html_free>(.*?)<\/html_free>/g
  const result = html
    .replace(regex, '$1')
    .replace(/="&quot;http?(.*?)"/g, '="http$1"')

  return result
}

export const iframeMxm = html => {
  let result = html
  const ampTagPartido =
    '<amp-iframe class="media" width="1" height="3" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="https://img.elcomercio.pe/widgets/envivo/$1/$2"></amp-iframe>'

  if (html.indexOf('w.ecodigital.pe') !== -1) {
    const regexWidget = /<script src="https:\/\/w.ecodigital.pe\/widget.depor.v2.js?v4"><\/script>/g
    result = result.replace(regexWidget, '')
  }

  if (html.indexOf('ECO.Widget') !== -1) {
    const regexEcoWidget = /<script>var f = new ECO.Widget({width: 625,height: 900}).draw("depor\/wg-elcomercio\/(.*?)");<\/script>/g
    result = result.replace(regexEcoWidget, ampTagPartido)
  }

  if (html.indexOf('<mxm-partido') !== -1) {
    const regexPartido = /<mxm-partido code="(.*)" h="(.*)px"><\/mxm-partido>/g
    result = result.replace(regexPartido, ampTagPartido)
  }

  if (html.indexOf('<mxm-evento') !== -1) {
    const regexEvento = /<mxm-evento code="(.*)" h="(.*)px"><\/mxm>/g
    const ampTagEvento =
      '<amp-iframe class="media" width="1" height="3" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="https://img.elcomercio.pe/widgets/envivogeneral/$1/$2"></amp-iframe>'
    result = result.replace(regexEvento, ampTagEvento)
  }

  if (html.indexOf('<mxm') !== -1) {
    /**
     * comentario viejo
     * - pendiente de validacion enventos 485178
     */
    const regexFallback = /<mxm(.*?)><\/mxm(.*?)>/g
    result = result.replace(regexFallback, '')
  }

  return result
}

export const iframeHtml = (html, arcSite = '') => {
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
    const replaceUploads = 'https://img.trome.pe$1'
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

  if (result.indexOf('facebook-jssdk') !== -1) {
    // noticias viejas
    result = result
      .replace('var js, fjs = d.getElementsByTagName(s)[0];', '')
      .replace('if (d.getElementById(id)) return;', '')
      .replace('js = d.createElement(s); js.id = id;', '')
      .replace('(function(d, s, id) {', '')
      .replace('fjs.parentNode.insertBefore(js, fjs);', '')
      .replace("}(document, 'script', 'facebook-jssdk'));", '')
      .replace(/js.src = "\/\/connect.facebook.net\/en_US\/sdk.js.*";/g, '')
      .replace(/(function(.*\n)*.*'facebook-jssdk')\)\);/g, '')
  }

  if (result.indexOf('<iframe') !== -1) {
    const regexIframe = /<iframe.*?src=["|'](.*?)["|'].*?>.*?<\/iframe>/g
    const replaceIframeBasic =
      '<amp-iframe class="media" src="$1" height="400" width="600" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0"></amp-iframe>'
    result = result.replace(regexIframe, replaceIframeBasic)
  }

  /**
   * Para mejor performance:
   * 1. se eliminan elementos
   * 2. se eliminan etiquetas pero se conserva contenido
   * 3. se reemplazan elementos
   * ----------------------------
   * Bien:      RegExp robustas * pocos replace()
   * No tanto:  RegExp cortas * multiples replace()
   */
  result = result
    .replace(
      /<(?:style|[:]?script|form|twitterwidget|twitter|iframe|mxm-partido|embed).*?>.*?<\/(?:style|script[:]?|form|twitterwidget|twitter|iframe|mxm-partido|embed).*?>/g,
      ''
    )
    .replace(
      /(?:onclick="(.*)"|type="application\/ld\+json"|marked="[A-Za-z0-9]+"|imageanchor="1"|style="(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~; +#!-])+")/g,
      ''
    )
    .replace(/<(?:-?\/)?(?:object|html_free|blockquote)(?:-?.+)?>/g, '')
    .replace(
      /<(?:html_free><blockquote|p).*?>(.*?)<\/(?:blockquote><\/html_free|p)>/g,
      '$1'
    ) // noticias viejas
    .replace(/<noscript.*?>(.*)<\/noscript>[>]?/g, '<noscript>$1</noscript>')
    .replace(/<(?:font|hl2).*>(.*?)<\/(?:font|hl2)>/g, '$1') // noticias viejas
    .replace(
      /<(font|eqwql|nimfw|yt|st1)(.*)>(?:.*(?:))<\/(font|eqwql|nimfw|yt|st1)>/g,
      '$2'
    ) // no tiene sentido para mi lo que ocurre aqui
    .replace(/http:/g, 'https:')
    .replace(/src="\/\//g, 'src="https://')
    .replace(/target="blank"/g, 'target="_blank"')
    .replace(/(?:<span.*>|<.+:p>)/g, '<span>')
    .replace(/hreef=/g, 'href=') // noticias viejas

  return result
}

/* export const replaceHtmlMigracion = html => {
  return html.replace(/<figure(.*)http:\/\/cms.minoticia(.*)<\/figure>/g, '')
} */

export const ampHtml = (html = '', arcSite = '') => {
  let resultData = html

  // Opta Widget
  // Esta asignacion se esta sobreescribiendo con la que sigue.
  // resultData = replaceHtmlMigracion(html)

  // Opta Widget
  // resultData = deporPlay(html)

  if (arcSite !== SITE_ELCOMERCIOMAG) {
    // Opta Widget
    resultData = optaWidgetHtml(resultData)
    // Player
    resultData = playerHtml(resultData)
  }

  // imagenes
  resultData = imageHtml(resultData)

  // JWplayer JS version
  if (arcSite === SITE_ELBOCON || arcSite === SITE_DEPOR) {
    resultData = jwPlayerJS(resultData)
  }

  // twitter
  resultData = twitterHtml(resultData)

  // instagram
  resultData = instagramHtml(resultData)

  // facebook
  resultData = facebookHtml(resultData)

  // Youtube
  resultData = youtubeHtml(resultData)

  // HTML Free
  resultData = freeHtml(resultData)

  // Mxm Iframe
  if (arcSite === SITE_ELCOMERCIO) {
    resultData = iframeMxm(resultData)
  }

  resultData = iframeHtml(resultData, arcSite)
  return resultData
}
