import { addResizedUrlItem } from './thumbs'
import ConfigParams, { sizeImg, sizeImgNewsLetter } from './config-params'

export const reduceWord = (word, len = 145, finalText = '...') => {
  return word.length > len ? word.slice(0, len).concat(finalText) : word
}

export const appendScript = (code, position = 'body') => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.textContent = code
  if (position === 'head') return document.head.append(script)
  return document.body.append(script)
}

export const formatAMPM = _date => {
  const date = new Date(_date)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours %= 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes
  const strTime = `${hours}:${minutes} ${ampm}`
  return strTime
}

export const formatDate = date => {
  const actual = new Date()
  const day = actual.getDate()
  const month = actual.getMonth() + 1
  const year = actual.getFullYear()

  const formatDay = day < 10 ? `0${day}` : day
  const formatMonth = month < 10 ? `0${month}` : month
  const fechaGenerada = `${year}-${formatMonth}-${formatDay}`

  const fechaEntrante = date.slice(0, 10)
  const fecha =
    fechaEntrante === fechaGenerada
      ? date.slice(date.indexOf('T') + 1, 16)
      : fechaEntrante
  return fecha
}

export const formattedTime = date => {
  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

  return `${hours}:${minutes}`
}

export const getYYYYMMDDfromISO = date =>
  date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]

export const getActualDate = () => {
  const today = new Date()
  today.setHours(today.getHours() - 5)
  return getYYYYMMDDfromISO(today)
}

export const formatDateLocalTimeZone = (publishDateString, delimiter = '-') => {
  const publishDate = new Date(publishDateString)
  publishDate.setHours(publishDate.getHours() - 5)

  const today = new Date()
  today.setHours(today.getHours() - 5)

  let formattedDate = ''

  if (getYYYYMMDDfromISO(publishDate) === getYYYYMMDDfromISO(today))
    formattedDate = formattedTime(publishDate)
  else {
    // eslint-disable-next-line prefer-destructuring
    formattedDate = publishDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
    formattedDate = formattedDate.replace(/-/g, delimiter)
  }
  return formattedDate
}

export const arrayMonths = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]

export const arrayDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]

export const formatDayMonthYear = (
  currentDate,
  showTime = true,
  isStatic = false
) => {
  const date = new Date(currentDate)

  if (isStatic) date.setHours(date.getHours() - 5)

  const formattedDate = `${arrayDays[date.getDay()]} ${date.getDate()} de ${
    arrayMonths[date.getMonth()]
  } del ${date.getFullYear()}`
  return showTime ? `${formattedDate}, ${formattedTime(date)}` : formattedDate
}

// ex: 2019-04-29 22:34:13 or 2019/04/29T22:34:13
export const getFullDateIso8601 = (
  fullDate,
  delimiterFullDate = ' ',
  separatorDate = '-',
  separatorTime = ':'
) => {
  if (fullDate === '' || fullDate === undefined) return false

  const [date, time] = fullDate.split(delimiterFullDate)
  const [fullYear, month, day] = date.split(separatorDate)
  const [hours, minutes, seconds] = time.split(separatorTime)
  return {
    day,
    month,
    fullYear,
    hours,
    minutes,
    seconds,
  }
}

export const isEmpty = val => {
  // test results
  //---------------
  // []        true, empty array
  // {}        true, empty object
  // null      true
  // undefined true
  // ""        true, empty string
  // ''        true, empty string
  // 0         false, number
  // true      false, boolean
  // false     false, boolean
  // Date      false
  // function  false

  if (val === undefined) return true

  if (
    typeof val === 'function' ||
    typeof val === 'number' ||
    typeof val === 'boolean' ||
    Object.prototype.toString.call(val) === '[object Date]'
  )
    return false

  if (val == null || val.length === 0)
    // null or 0 length array
    return true

  if (typeof val === 'object') {
    // empty object
    // eslint-disable-next-line no-restricted-syntax
    for (const f in val) {
      if (Object.prototype.hasOwnProperty.call(val, f)) return false
    }
    return true
  }

  return false
}

export const getIcon = type => {
  switch (type) {
    case 'basic_gallery':
      return 'img'
    case 'basic_video':
      return 'video'
    default:
      return ''
  }
}

// Simplificación de la función addResizedUrlItem, ej: ratio = "16:9" resolution = "400x400"
export const ResizeImageUrl = (arcSite, imgUrl, ratio, resolution) => {
  if (imgUrl) {
    const test = addResizedUrlItem(arcSite, imgUrl, [`${ratio}|${resolution}`])
      .resized_urls[ratio]

    return test
  }
  return imgUrl
}

export const metaPaginationUrl = (
  pageNumber,
  patternPagination,
  requestUri,
  siteUrl
) => {
  return requestUri.match(patternPagination) !== null
    ? `${siteUrl}${requestUri.replace(patternPagination, `/${pageNumber}/`)}`
    : `${siteUrl}${requestUri.split('?')[0]}/${pageNumber}/${
        requestUri.split('?')[1] ? `?${requestUri.split('?')[1]}` : ''
      }`
}

export const getMetaPagesPagination = (
  requestUri,
  globalContent,
  patternPagination
) => {
  const { next, previous } = globalContent || {}
  const pages = {
    current: requestUri.match(patternPagination)
      ? parseInt(requestUri.match(patternPagination)[0].split('/')[1], 10)
      : 1,
    next: false,
    prev: false,
  }

  if (next !== undefined)
    pages.next = pages.current === 0 ? pages.current + 2 : pages.current + 1
  if (previous !== undefined) pages.prev = pages.current - 1

  return pages
}

export const popUpWindow = (url, title, w, h) => {
  const left = window.screen.width / 2 - w / 2
  const top = window.screen.height / 2 - h / 2
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  )
}

// TODO: Agregar parámetro para que soporte links variables por marca, así cmo el twitter de la marca
export const socialMediaUrlShareList = (
  siteUrl,
  postPermaLink,
  postTitle,
  siteNameRedSocial = 'Gestionpe'
) => {
  return {
    facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}${postPermaLink}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      postTitle
    )}&url=${siteUrl}${postPermaLink}&via=${siteNameRedSocial}`,
    linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}${postPermaLink}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}${postPermaLink}`,
    whatsapp: `whatsapp://send?text=${siteUrl}${postPermaLink}`,
    fbmsg: `fb-messenger://share/?link=${siteUrl}${postPermaLink}`,
  }
}

export const socialMediaUrlShareListBlog = (
  siteUrl,
  postPermaLink,
  postTitle,
  siteNameRedSocial = 'Gestionpe'
) => {
  return {
    facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}blog/${postPermaLink}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      postTitle
    )}&url=${siteUrl}blog/${postPermaLink}&via=${siteNameRedSocial}`,
    linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}blog/${postPermaLink}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}blog/${postPermaLink}`,
    whatsapp: `whatsapp://send?text=${siteUrl}blog/${postPermaLink}`,
    fbmsg: `fb-messenger://share/?link=${siteUrl}blog/${postPermaLink}`,
  }
}

export const createMarkup = html => {
  return {
    __html: html,
  }
}

export const setSurveyCookie = (surveyId, days) => {
  const date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = `idpoll${surveyId}=1;path=/;expires=${date.toGMTString()}`
}

export const getCookie = cookieName => {
  const cookieValue = document.cookie.match(`(^|;) ?${cookieName}=([^;]*)(;|$)`)
  return cookieValue ? cookieValue[2] : null
}

export const formatSlugToText = (text = '', length = 0) => {
  if (!text) return null
  const splitText = text.slice(1).includes('/')
    ? text.slice(1).split('/')
    : text.split('/')
  const lastSection = length
    ? splitText[length - 1]
    : splitText[splitText.length - 1]
  return length
    ? lastSection
    : lastSection
        .charAt(0)
        .toUpperCase()
        .concat(lastSection.slice(1))
        .replace(/-/, ' ')
}

export const formatHtmlToText = (html = '') => {
  const htmlData = html.toString()
  return htmlData.replace(/<[^>]*>/g, '').replace(/"/g, '“')
}

export const removeLastSlash = (url = '') => {
  if (url === '/' || !url.endsWith('/')) return url
  return url && url.endsWith('/') ? url.slice(0, url.length - 1) : url
}

export const addSlashToEnd = (url = '') => {
  const urlString = `${url}`
  if (url && urlString.trim() === '/') return url
  return url && !urlString.endsWith('/') ? `${url}/` : url
}

export const addParamToEndPath = (path, param) => {
  const getPathAndString = (pathData, symbol = '?') => {
    const index = pathData.indexOf(symbol)
    let onlyPath = pathData
    let queryString = ''
    let haveQueryString = false
    if (index !== -1) {
      onlyPath = pathData.substr(0, index)
      queryString = pathData.substr(index)
      haveQueryString = true
    }
    return {
      onlyPath,
      queryString,
      haveQueryString,
    }
  }
  const addParam = (onlyPath, variable, queryString = '') => {
    return `${addSlashToEnd(onlyPath)}${addSlashToEnd(variable)}${queryString}`
  }
  let data = getPathAndString(path)
  if (data.haveQueryString)
    return addParam(data.onlyPath, param, data.queryString)
  data = getPathAndString(path, '#')
  if (data.haveQueryString)
    return addParam(data.onlyPath, param, data.queryString)
  data = getPathAndString(path, '&')
  if (data.haveQueryString)
    return addParam(data.onlyPath, param, data.queryString)
  return addParam(path, param)
}

export const defaultImage = ({
  deployment,
  contextPath,
  arcSite,
  size = 'lg',
}) => {
  if (size !== 'lg' && size !== 'md' && size !== 'sm') return ''
  return deployment(
    `${contextPath}/resources/dist/${arcSite}/images/default-${size}.png`
  )
}

export const createScript = ({ src, async, defer, textContent = '' }) => {
  const node = document.createElement('script')
  if (src) {
    node.type = 'text/javascript'
    node.src = src
  }
  if (async) {
    node.async = true
  }
  if (defer) {
    node.defer = true
  }
  node.textContent = textContent
  return node
}

export const createLink = url => {
  const node = document.createElement('link')
  node.rel = 'stylesheet'
  node.href = url
  return node
}

export const appendToBody = node => {
  document.body.append(node)
}

export const appendToId = (id, node) => {
  id.append(node)
}

export const breadcrumbList = (url, siteUrl) => {
  const arrayData = []
  if (url) {
    const dataSeccion = url.split('/')
    dataSeccion.forEach((element, i) => {
      if (i === 1 || (i === 2 && dataSeccion.length === 4)) {
        const separator = '/'
        arrayData[i] = {
          name:
            element.charAt(0).toUpperCase() +
            element.slice(1).replace('-', ' '),
          url: siteUrl + separator + element,
        }
      }
    })
  }

  return arrayData.filter(String)
}

export const getUrlParameter = () => {
  const { location: { href: loc } = {} } = window || {}
  const getString = loc.split('?')[1] || ''
  const tmp = getString.split('foto=') || []
  return parseInt(tmp[1], 0) || 1
}

export const getMultimediaIcon = multimediaType => {
  let icon = ''
  switch (multimediaType) {
    case ConfigParams.VIDEO:
      icon = 'icon-video'
      break
    case ConfigParams.GALLERY:
      icon = 'icon-img'
      break
    default:
      return ''
  }
  return icon
}

export const optaWidgetHtml = html => {
  const matches = html.match(/<opta-widget(.*?)><\/opta-widget>/)
  const matchesResult = matches
    ? matches[1].replace(/="/g, '=').replace(/" /g, '&')
    : ''

  const rplOptaWidget = `<amp-iframe class="media" width="1" height="1" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen frameborder="0" src="${
    ConfigParams.OPTA_WIDGET
  }/optawidget?${matchesResult} ></amp-iframe>`
  return html.replace(/<opta-widget (.*?)><\/opta-widget>/g, rplOptaWidget)
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
  resHtml = resHtml.replace(
    /<img (.*)src="(.*)" width="(.*?)" (.*)\/>/g,
    rplImageCde
  )
  resHtml = resHtml.replace(/<img (.*)src="(.*)" (.*)\/>/g, rplImageCde)
  resHtml = resHtml.replace(/<img (.*)src="(.*)" style="(.*);">/g, rplImageCde)
  resHtml = resHtml.replace(/<img (.*)src="(.*)" (.*)>/g, rplImageCde)
  resHtml = resHtml.replace(/<img src="(.*?)">/g, rplImageCde1)
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

export const twitterHtml = html => {
  const rplTwitter =
    '<amp-twitter class="media" width=1 height=1 layout="responsive" data-tweetid="$3" ></amp-twitter>'

  const htmlDataTwitter = html.replace(
    /<blockquote class="twitter-tweet"(.*)<a href="https:\/\/twitter.com\/(.*)\/status\/(.*)">(.*)<\/blockquote>/g,
    rplTwitter
  )

  return htmlDataTwitter.replace(/(<script.*?>).*?(<\/script>)/g, '')
}

export const iframeHtml = (html, arcSite = '') => {
  let htmlDataTwitter = html
  htmlDataTwitter = htmlDataTwitter.replace(
    /(\/media\/([0-9-a-z-A-Z])\w+)/g,
    'https://img.peru21.pe$1'
  )

  const rplTwitter =
    '<amp-iframe class="media" src="http$2"  height="400"  width="600"  frameborder="0"   title="Google map pin on Googleplex, Mountain View CA"    layout="responsive"     sandbox="allow-scripts allow-same-origin allow-popups"     frameborder="0"></amp-iframe>'

  const rplIframe =
    '<amp-iframe class="media" src="http$2"  height="1"  width="1"       layout="responsive"    sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen   frameborder="0"></amp-iframe>'
  const rplIframe1 =
    '<amp-iframe class="media" src="$1"  height="1"  width="1"       layout="responsive"    sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen   frameborder="0"></amp-iframe>'
  const rplIframe2 =
    '<amp-iframe class="media" src="$2"  height="1"  width="1"       layout="responsive"    sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen   frameborder="0"></amp-iframe>'

  htmlDataTwitter = htmlDataTwitter
    .replace(/<iframe (.*)src="http(.*?)" (.*)><\/iframe>/g, rplTwitter)
    .replace(/<iframe (.*)src="http(.+?)"><\/iframe>/g, rplIframe) //
    .replace(/<iframe (.*)src="http(.*?)"(.*)><\/iframe>/g, rplTwitter)

  return htmlDataTwitter
    .replace(/(<script.*?>).*?(<\/script>)/g, '')
    .replace(/<html_free><blockquote (.*)">/g, '')
    .replace(/<\/blockquote><\/html_free>/g, '')
    .replace('</p>', '')
    .replace('<p>', '')
    .replace('http://', 'https://')
    .replace(/<iframe src="(.*)" width="(.*?)" (.*)><\/iframe>/g, rplIframe1)
    .replace('src="//', 'src="https://')
    .replace(/<iframe (.*) src='(.*)' (.*)><\/iframe>/g, rplIframe2)
    .replace(/<iframe (.*) src="(.*)" type=(.*)><\/iframe>/g, rplIframe2)
    .replace(/<iframe (.*) src="(.*)" (.*)><\/iframe>/g, rplIframe2)
    .replace(/<iframe src='(.*)' width='(.+)' (.*)><\/iframe>/g, rplIframe1)
    .replace(/<(-?\/)?html_free>/g, '')
    .replace(/<(-?\/)?object(-?.+)?>/g, '')
    .replace(/<embed(.*)><\/embed>/g, '')
    .replace('target="blank"', 'target="_blank"')
    .replace(/<(-?\/)?blockquote(-?.+)?>/g, '')
    .replace(/onclick="(.*)"/g, '')
    .replace(/<mxm-partido (.+)<\/mxm-partido>/g, '')
    .replace(/<span (.*)>/g, '<span>')
    .replace(/<(.+):p>/g, '<span>')
    .replace(/<font (.*)>(.+)<\/font>/g, '$2')
    .replace(/<hl2>(.+)<\/hl2>/g, '$1')
    .replace(/<mxm-(.*) (.*)><\/mxm>/g, '') // pendiente de validacion enventos 485178
    .replace(/<script>(.*\n)+.*<\/script>/g, '')
    .replace(/<form (.*)>(.*\n)*.*<\/form>/g, '')
}

export const facebookHtml = html => {
  let resultHtml = html
  const strFacebook = '/<iframe src="(.*?)&width=500"></iframe>/g'
  const rplFacebook =
    '<amp-facebook class="media" width=1 height=1 layout="responsive" data-href="$1"></amp-facebook>'
  const strFacebook2 = '/<iframe src="(.*?)&width=500"></iframe>/g'
  const rplFacebook2 =
    '<amp-facebook class="media" width=1 height=1 layout="responsive" data-href="$1"></amp-facebook>'
  const rplFacebook3 =
    '<amp-facebook width="500" height="310" layout="responsive" data-embed-as="video" data-href="$2"></amp-facebook>'

  const strFacebookPage =
    '/<div class="fb-page" data-href="(.*?)" data-width="(.*?)" data-small-header="(.*?)" data-adapt-container-width="(.*?)" data-hide-cover="(.*?)" data-show-facepile="(.*?)" data-show-posts="(.*?)"><div class="fb-xfbml-parse-ignore"><blockquote cite="(.*?)"><a href="(.*?)">(.*?)</a></blockquote></div></div>/g'
  const rplFacebookPage =
    '<amp-facebook-page width="340" height="130" layout="fixed" data-hide-cover="$5" data-href="$1"></amp-facebook-page>'
  const strFacebookRoot = '/<div id="fb-root"></div>/g'
  const facebookResult = resultHtml.match(
    /<iframe(.*?)src="https:\/\/www.facebook.com\/plugins\/video.php[?]href=(.*?)" (.*?)><\/iframe>/
  )

  if (facebookResult) {
    resultHtml = resultHtml.replace(
      /<iframe(.*?)src="https:\/\/www.facebook.com\/plugins\/video.php[?]href=(.*?)" (.*?)><\/iframe>/g,
      rplFacebook3
    )
    resultHtml = decodeURIComponent(resultHtml)
  }

  return resultHtml
    .replace(strFacebookPage, rplFacebookPage)
    .replace(strFacebookRoot, '')
    .replace(strFacebook, rplFacebook)
    .replace(strFacebook2, rplFacebook2)
}

export const youtubeHtml = html => {
  const rplYoutube =
    '<amp-youtube class="media" data-videoid="$3" layout="responsive" width="550" height="$2"></amp-youtube>'
  const rplYoutube1 =
    '<amp-youtube class="media" data-videoid="$3" layout="responsive" width="550" height="350"></amp-youtube>'
  return html
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
    .replace(/="&quot;http?(.*?)"/g, '="http$1"')
}

export const ampHtml = (html = '', arcSite = '') => {
  let resultData = html
  // Opta Widget
  resultData = replaceHtmlMigracion(html)

  // Opta Widget
  resultData = optaWidgetHtml(resultData)

  // imagenes
  resultData = imageHtml(resultData)

  // Player
  resultData = playerHtml(resultData)

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

  // HTML Iframe
  resultData = iframeHtml(resultData, arcSite)

  return resultData
}

export const publicidadAmp = ({ dataSlot, placementId, width, height }) => {
  const resultData = createMarkup(`
  <amp-ad width="${width}" height="${height}" type="doubleclick"
  data-slot="${dataSlot}"
  rtc-config='{"vendors": {"prebidappnexus": {"PLACEMENT_ID": "${placementId}"}},
  "timeoutMillis": 1000}'></amp-ad>`)

  return resultData
}

export const getResponsiveClasses = ({
  showInDesktop = true,
  showInTablet = true,
  showInMobile = true,
}) => {
  const responsiveClasses = []
  if (!showInDesktop) responsiveClasses.push('non-desktop')
  if (!showInTablet) responsiveClasses.push('non-tablet')
  if (!showInMobile) responsiveClasses.push('non-mobile')
  return responsiveClasses.join(' ')
}

export const preventDefault = e => {
  const event = e || window.event
  if (event.preventDefault) event.preventDefault()
  event.returnValue = false
}

export const replaceTags = text => {
  return text
    .replace(/(\s\w)=.(.*?)/g, '$2')
    .replace('http://http://', 'https://')
    .replace(/href=&quot;(.+)&quot;>/g, 'href="$1">')
}

export const formatDateStory = date => {
  const fechaZone = date.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)[0]
  const fecha = new Date(fechaZone)
  const day = fecha.getDate()
  const month = fecha.getMonth() + 1
  const formatDay = day < 10 ? `0${day}` : day
  const formatMonth = month < 10 ? `0${month}` : month

  const minutes = fecha.getMinutes()
  const hours = fecha.getHours()

  const formatHours = hours < 10 ? `0${hours}` : hours
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes

  return `Actualizado en ${formatDay}/${formatMonth}/${fecha.getFullYear()} a las ${formatHours}:${formatMinutes} `
}

export const formatDateStoryAmp = date => {
  const fecha = new Date(date)
  fecha.setHours(fecha.getHours() - 5)
  const day = fecha.getDate()
  const month = fecha.getMonth() + 1
  const formatDay = day < 10 ? `0${day}` : day
  const formatMonth = month < 10 ? `0${month}` : month
  return `Actualizado en ${formatDay}/${formatMonth}/${fecha.getFullYear()} a las ${formattedTime(
    fecha
  )}`
}

/**
 * TODO: Necesita CODE REVIEW
 */
export const addResizedUrlsToStory = (
  data,
  resizerUrl,
  resizerSecret,
  addResizedUrls,
  preset = 'basic'
) => {
  return (
    data &&
    data.map(item => {
      const storyData = item
      if (!storyData.content_elements) storyData.content_elements = []

      let presets = {}
      switch (preset) {
        case 'newsletter':
          presets = sizeImgNewsLetter()
          break
        case 'related':
          presets = {
            landscape_md: {
              width: 314,
              height: 157,
            },
            lazy_default: {
              width: 7,
              height: 4,
            },
          }
          break
        default:
          presets = sizeImg()
      }

      const {
        promo_items: {
          basic_gallery: basicGallery = null,
          basic_video: basicVideo = null,
        } = {},
      } = item

      if (basicGallery && basicGallery.promo_items) {
        const image = addResizedUrls(basicGallery, {
          resizerUrl,
          resizerSecret,
          presets,
        })
        storyData.promo_items.basic_gallery = image
      }

      if (basicVideo && basicVideo.promo_items) {
        basicVideo.content_elements = []
        const image = addResizedUrls(basicVideo, {
          resizerUrl,
          resizerSecret,
          presets,
        })
        storyData.promo_items.basic_video = image
      }

      return addResizedUrls(storyData, {
        resizerUrl,
        resizerSecret,
        presets,
      })
    })
  )
}

export const deleteQueryString = url => {
  const onlyUrl = url.split('?')[0]
  return onlyUrl.split('#')[0]
}

export const isIE = () => {
  const ua = window.navigator.userAgent
  const msie = ua.indexOf('MSIE ')
  const trident = ua.indexOf('Trident/')
  if (msie > 0 || trident > 0) {
    return true
  }
  return false
}

export const addSlashToDateEnd = url => {
  let urlSlash = url
  const fecha = new Date('2019-07-16T22:30:00')
  const hoy = new Date()
  if (fecha < hoy) {
    urlSlash = addSlashToEnd(url)
  }

  return urlSlash
}

export const searchQuery = (query, sort) => {
  if (query !== '')
    // eslint-disable-next-line no-restricted-globals
    location.href = `/buscar/${encodeURIComponent(query).replace(
      /%20/g,
      '+'
    )}/todas/${sort || 'descendiente'}/`
}

export function parseQueryString(str) {
  if (typeof str !== 'string' || str.length === 0) return {}
  const s = str.replace(/^\?/, '').split('&')
  const sLength = s.length
  let bit
  const query = {}
  let first
  let second
  for (let i = 0; i < sLength; i++) {
    bit = s[i].split('=')
    first = decodeURIComponent(bit[0])
    if (first.length === 0) continue
    second = decodeURIComponent(bit[1])
    if (typeof query[first] === 'undefined') query[first] = second
    else if (query[first] instanceof Array) query[first].push(second)
    else query[first] = [query[first], second]
  }
  return query
}

export const getMultimedia = (multimediaType, amp = false) => {
  let type = ''
  switch (multimediaType) {
    case ConfigParams.VIDEO:
      type = 'video'
      break
    case ConfigParams.GALLERY:
      type = amp ? 'foto_galeria' : 'gallery'
      break
    default:
      type = amp ? 'imagen' : 'story'
  }
  return type
}

export const getRemoveSlug = slug => {
  return slug
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/ñ/g, 'n')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
}

export const getRelatedIds = data => {
  return (
    data &&
    data.map(({ _id }) => {
      return _id
    })
  )
}

export const nbspToSpace = text => {
  return text.replace(/&nbsp;/gi, ' ')
}

export const countWords = (text, delimitter = ' ') => {
  return !isEmpty(text) ? text.split(delimitter).length : 0
}

export const formatSections = (data = {}) => {
  const link = 'link'
  const { children = [] } = data
  return children.map(el => {
    return {
      name: el.node_type === link ? el.display_name : el.name,
      url: el.node_type === link ? el.url : el._id,
    }
  })
}

export const skipAdvertising = (data = []) => {
  return data
    .map(({ slug }) => {
      return slug === 'noads' ? true : ''
    })
    .filter(String)[0]
}

export const storyTagsBbc = (data = []) => {
  return data
    .map(({ slug }) => {
      return slug === 'bbc' ? true : ''
    })
    .filter(String)[0]
}

export const storyVideoPlayerId = (content = '') => {
  return (
    content.match(
      /<script (.+)id=([A-Za-z0-9 _]*[A-Za-z0-9])(.*)><\/script>/
    ) || []
  )
}

export const getPhotoId = photoUrl => {
  const customPhotoUrl = photoUrl.match(/\/([A-Z0-9]{26}).[\w]+$/)
  const [, photoId] = customPhotoUrl || []
  return photoId
}

export const getDateSeo = data => {
  const fechaZone = data.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)[0]
  const fecha = new Date(fechaZone)
  fecha.setHours(fecha.getHours() - 5)
  const day = fecha.getDate()
  const month = fecha.getMonth() + 1
  const year = fecha.getFullYear()
  const hours = fecha.getHours()
  const minutes = fecha.getMinutes()
  const seconds = fecha.getSeconds()

  const formatDay = day < 10 ? `0${day}` : day
  const formatMonth = month < 10 ? `0${month}` : month
  const formatHours = hours < 10 ? `0${hours}` : hours
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formatSeconds = seconds < 10 ? `0${seconds}` : seconds

  const fechaGenerada = `${year}-${formatMonth}-${formatDay}T${formatHours}:${formatMinutes}:${formatSeconds}-05:00`

  return fechaGenerada
}
