import { addResizedUrlItem } from './thumbs'

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

export const formatDayMonthYear = date => {
  const fecha = new Date(date)
  const arrayMeses = [
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
  const arrayDay = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ]
  return `${arrayDay[fecha.getDay()]} ${fecha.getDate()} de ${
    arrayMeses[fecha.getMonth()]
  } del ${fecha.getFullYear()}, ${fecha.getHours()}:${fecha.getMinutes()}`
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

export const getActualDate = () => {
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 // January is 0!

  const yyyy = today.getFullYear()
  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`

  return `${yyyy}-${mm}-${dd}`
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
  siteUrl,
  isQuery
) => {
  return requestUri.match(patternPagination) != null
    ? `${siteUrl}${requestUri.replace(
        patternPagination,
        `${isQuery ? '&page=' : '/'}${pageNumber}`
      )}`
    : `${siteUrl}${
        isQuery ? requestUri : `${requestUri.split('?')[0]}/${pageNumber}`
      }${isQuery ? `&page=${pageNumber}` : `?${requestUri.split('?')[1]}`}`
}

export const getMetaPagesPagination = (
  requestUri,
  isQuery,
  globalContent,
  patternPagination
) => {
  const { next, previous } = globalContent || {}
  const pages = {
    current: requestUri.match(patternPagination)
      ? parseInt(
          requestUri
            .match(patternPagination)[0]
            .split(`${isQuery ? '=' : '/'}`)[1],
          10
        )
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
    twitter: `http://twitter.com/home?status=${encodeURIComponent(
      postTitle
    )}+${siteUrl}${postPermaLink}+via%20${siteNameRedSocial}`,
    linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}${postPermaLink}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}${postPermaLink}`,
    whatsapp: `whatsapp://send?text=${siteUrl}${postPermaLink}`,
    fbmsg: `fb-messenger://share/?link=${siteUrl}${postPermaLink}`,
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

export const formatSlugToText = (text = '') => {
  if (!text) return null
  const splitText = text.slice(1).split('/')
  const lastSection = splitText[splitText.length - 1]
  return lastSection
    .charAt(0)
    .toUpperCase()
    .concat(lastSection.slice(1))
    .replace(/-/, ' ')
}

export const formatHtmlToText = (html = '') => {
  const htmlData = html.toString()
  return htmlData.replace(/<[^>]*>/g, '').replace(/"/g, '“')
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
  document.body.appendChild(node)
}

export const breadcrumbList = (url, siteUrl, contextPath) => {
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
          url: siteUrl + contextPath + separator + element,
        }
      }
    })
  }

  return arrayData.filter(String)
}

export const getUrlParameter = contentElements => {
  const loc = window.location.href
  const getString = loc.split('?')[1]
  const tmp = getString.split('foto=')

  if (loc.indexOf('?') > 0 && contentElements) {
    const sWidth = 100 / contentElements.length
    return tmp[1] && contentElements.length >= tmp[1]
      ? -sWidth * (tmp[1] - 1)
      : 0
  }
  return parseInt(String, tmp[1]) || 0
}
