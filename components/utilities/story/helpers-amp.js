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
  const matches = html.match(/<opta-widget (.*?)>(.*)<\/opta-widget>/)
  const matchesResult = matches
    ? matches[1].replace(/="| = "| =/g, '=').replace(/"/g, '&')
    : ''
  const ampTag = `<amp-iframe class="media" width="1" height="1" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="${OPTA_WIDGET}/optawidget?${matchesResult}" ></amp-iframe>`
  const result = html.replace(/<opta-widget (.*?)>(.*)<\/opta-widget>/g, ampTag)
  return result
}

export const imageHtml = html => {
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
  const rplEplayer =
    '<amp-iframe width="1" height="1" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="https://player.performgroup.com/eplayer/eplayer.html#/$1"></amp-iframe>'

  return html.replace(
    /<script src="\/\/player.performgroup.com\/eplayer.js#(.*?)" async><\/script>/g,
    rplEplayer
  )
}

export const jwPlayerJS = html => {
  const existJwPlayer = /cdn.jwplayer.com/.test(html)
  if (!existJwPlayer) return html
  const rplPlayer =
    '<amp-jwplayer data-player-id="$2" data-media-id="$1" layout="responsive" width="16" height="9"></amp-jwplayer>'

  return html.replace(
    /^(?:.+)cdn.jwplayer.com\/players\/(.+)-(.+).js(?:.+)/,
    rplPlayer
  )
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

export const deporPlay = html => {
  const rplDeporPlay =
    '<amp-iframe class="media" src="https://w.soundcloud.com/player/$2"  height="400"  width="600"  frameborder="0"   title="Google map pin on Googleplex, Mountain View CA"    layout="responsive"     sandbox="allow-scripts allow-same-origin allow-popups"     frameborder="0"></amp-iframe>'

  const htmlDataDeporPlay = html.replace(
    /<iframe (.*) src="https:\/\/w.soundcloud.com\/player\/(.*)"><\/iframe>/g,
    rplDeporPlay
  )
  return htmlDataDeporPlay
}

export const iframeHtml = (html, arcSite = '') => {
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
    return decodeURIComponent(resultHtml)
  }

  if (resultHtml.indexOf('facebook.com/plugins/post.php') !== -1) {
    const regexPost = /<iframe.*www.facebook.com\/plugins\/post.php\?href=(.*?)&.*>.*<\/iframe>/g
    const replacePlugin =
      '<amp-facebook width="500" height="310" layout="responsive" data-href="$1"></amp-facebook>'
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
    /* const replacePage =
      '<amp-facebook-page width="340" height="130" layout="fixed" data-hide-cover="$2" data-href="$1"></amp-facebook-page>' */
    resultHtml = resultHtml.replace(regexPage, '')
  }

  return resultHtml
}

export const youtubeHtml = html => {
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

export const replaceHtmlMigracion = html => {
  return html.replace(/<figure(.*)http:\/\/cms.minoticia(.*)<\/figure>/g, '')
}

export const instagramHtml = html => {
  const rplInstagram =
    '<amp-instagram data-shortcode="$3" width="1" height="1" layout="responsive"></amp-instagram>'

  return html.replace(
    /<blockquote (.*)class="instagram-media"(.*)data-instgrm-permalink="https:\/\/www.instagram.com\/p\/(.*?)\/(.*?)<\/blockquote>/g,
    rplInstagram
  )
}
export const freeHtml = html => {
  const strHtmlFree = '/<html_free>(.*?)</html_free>/g'
  return html
    .replace(strHtmlFree, '$1')
    .replace(/<html_free><\/html_free>/g, '')
    .replace(/<icon><\/icon>/g, '')
    .replace(/="&quot;http?(.*?)"/g, '="http$1"')
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
    .replace(/<mxm-event (.*)><\/mxm-event>/gm, '')
    .replace(/<mxm id="(.*)"><\/mxm>/gm, '')

  // pendiente de validacion enventos 485178
  return resHtml.replace(/<mxm-(.*) (.*)><\/mxm>/g, '')
}

export const ampHtml = (html = '', arcSite = '') => {
  let resultData = html
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

  resultData = iframeHtml(resultData, arcSite)

  // Mxm Iframe
  if (arcSite === SITE_ELCOMERCIO) {
    resultData = iframeMxm(resultData)
  }

  return resultData
}
