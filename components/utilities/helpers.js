import { SITE_ELCOMERCIO } from './constants/sitenames'
import { VIDEO, GALLERY } from './constants/multimedia-types'
import { getAssetsPath } from './assets'

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

/**
 * @description Devuelve la fecha de publicacion de la historia o 
 * la hora, en caso de que se publicara el mismo dia. Este metodo 
 * funciona para mostrar el tiempo correcto desde servidor o cliente 
 * gracias al ultimo parametro.
 * 
 * @param {string} publishDateString Fecha de publicacion de la historia.
 * @param {string} [delimiter=-] Separador para la fecha. ie. 2020-01-01 o 2020/01/01.
 * @param {boolean} [isClient=false] Define si se renderiza en cliente o servidor. 
 * 
 * @returns {string} Fecha con formato **HH:MM** o **YYYY-MM-DD**
 * 
 * @example ```
 * <p className={classes.date}>
      {typeof window === 'undefined'
        ? formatDateLocalTimeZone(element.date)
        : formatDateLocalTimeZone(element.date, '-', true)}
    </p>
 * ```
 */
export const formatDateLocalTimeZone = (
  publishDateString,
  delimiter = '-',
  isClient = false,
  todayHour = true
) => {
  const publishDate = new Date(publishDateString)
  if (!isClient) publishDate.setHours(publishDate.getHours() - 5)

  const today = new Date()
  if (!isClient) today.setHours(today.getHours() - 5)

  let formattedDate = ''

  if (
    getYYYYMMDDfromISO(publishDate) === getYYYYMMDDfromISO(today) &&
    todayHour
  )
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

export const metaPaginationUrl = (
  pageNumber,
  patternPagination,
  requestUri,
  siteUrl
) => {
  return requestUri.match(patternPagination) !== null
    ? `${siteUrl}${requestUri.replace(patternPagination, `/${pageNumber}/`)}`
    : `${siteUrl}${requestUri.split('?')[0]}${pageNumber}/${
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

export const createMarkup = html => {
  return {
    __html: html,
  }
}

export const getCookie = cookieName => {
  const cookieValue = document.cookie.match(`(^|;) ?${cookieName}=([^;]*)(;|$)`)
  return cookieValue ? cookieValue[2] : null
}

export const nlToBrTag = paragraph => {
  return paragraph.trim().replace(/\r?\n|\r/g, '<br />')
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
  return htmlData
    .replace(/<[^>]*>/g, '')
    .replace(/"/g, '“')
    .replace(/\\/g, '')
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

/**
 * @param {object} objeto Propiedades necesarias para armar la URL de la imagen por defecto.
 * @param {function} objeto.deployment Agrega un parámetro al final de la cadena
 * con la versión de deployment. Viene desde Fusion.
 * @param {string} objeto.contextPath Normalmente /pf/. Viene desde fusion.
 * @param {string} objeto.arcSite Identificador del sitio actual. Viene desde fusion.
 * @param {string} [objeto.size=lg] Tamaño de la imagen por defecto. Hay tres opciones
 * 'sm', 'md' y 'lg'. Definido manualmente.
 *
 * @returns {string} URL de la imagen por defecto desde /resources/dist/...
 */
export const defaultImage = ({ contextPath, arcSite }) => {
  return `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/default-md.png?d=2`
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

export const breadcrumbList = (siteUrl = '', primarySectionLink = '') => {
  let sectionQueue = '/'
  return primarySectionLink
    .split('/')
    .filter(section => section !== '')
    .map(section => {
      sectionQueue = `${sectionQueue}${section}/`
      return {
        name:
          section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' '),
        url: `${siteUrl}${sectionQueue}`,
      }
    })
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
    case VIDEO:
      icon = 'icon-video'
      break
    case GALLERY:
      icon = 'icon-img'
      break
    default:
      return ''
  }
  return icon
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

export const replacer = (str, p1 = '', p2 = '', p3 = '') => {
  const isSlash = p3.slice(p3.length - 1, p3.length)
  const psReplace = `${p3}/`

  return `href="${p1}://${p2}${isSlash !== '/' ? psReplace : p3}"`
}

export const replaceTags = text => {
  const resultText = text.replace(
    /href="(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?"/g,
    replacer
  )

  return resultText
    .replace(/<h1>(.*)<\/h1>/g, '<h2>$1</h2>')
    .replace(/(\s\w)=.(.*?)/g, '$2')
    .replace('http://http://', 'https://')
    .replace(/href=&quot;(.+)&quot;>/g, 'href="$1">')
    .replace(/http:\/\/gestion2.e3.pe\//g, 'https://cde.gestion2.e3.pe/')
    .replace('http://', 'https://')
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

  return `Actualizado el ${formatDay}/${formatMonth}/${fecha.getFullYear()} a las ${formatHours}:${formatMinutes} `
}

export const deleteQueryString = url => {
  const onlyUrl = url.split('?')[0]
  return onlyUrl.split('#')[0]
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

export const getMultimedia = (multimediaType, amp = false) => {
  let type = ''
  switch (multimediaType) {
    case VIDEO:
      type = 'video'
      break
    case GALLERY:
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

export const storyTagsBbc = (data = [], slugTag = 'bbc') => {
  return data
    .map(({ slug }) => {
      return slug === slugTag ? true : ''
    })
    .filter(String)[0]
}

export const storyVideoPlayerId = (content = '') => {
  const pattern = content.includes('id')
    ? /<script (.+)id=([A-Za-z0-9 _]*[A-Za-z0-9])(.*)><\/script>/
    : /<script (src=(.*))(.*)(async(=(.*))?)><\/script>/
  return content.match(pattern) || []
}

export const getPhotoId = photoUrl => {
  if (!photoUrl) return ''
  const customPhotoUrl = photoUrl.match(/\/([A-Z0-9]{26})(:?.[\w]+)?$/)
  const [, photoId] = customPhotoUrl || []
  return photoId
}

export const getDateSeo = data => {
  const fechaZone = data
    ? data.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)[0]
    : new Date()
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

export const msToTime = (duration = 5555, seo = true) => {
  let seconds = parseInt((duration / 1000) % 60, 0)
  let minutes = parseInt((duration / (1000 * 60)) % 60, 0)
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 0)
  let resultSeo = ''
  if (seo) {
    hours = hours < 10 ? `0${hours}:` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    resultSeo = `${(hours !== '00:' && hours) || ''}${minutes}:${seconds}`
  } else {
    hours = hours >= 1 ? `${hours}H` : ''
    minutes = minutes >= 1 ? `${minutes}M` : ''
    seconds = seconds >= 1 ? `${seconds}S` : ''
    resultSeo = `PT${hours}${minutes}${seconds}`
  }
  return resultSeo
}

export const localISODate = date => {
  let localDate = date ? new Date(date) : new Date()
  localDate.setHours(localDate.getHours() - 5)
  localDate = `${localDate.toISOString().split('.')[0]}-05:00`
  return localDate
}

export const clearBrTag = paragraph => {
  return nbspToSpace(paragraph.trim().replace(/<\/?br[^<>]+>/, ''))
}

export const clearHtml = paragraph => {
  return nbspToSpace(
    clearBrTag(
      paragraph
        .trim()
        .replace(/(<([^>]+)>)/gi, '')
        .replace('   ', ' ')
        .replace('  ', ' ')
    )
  )
}

/*
Hasta ahora este metodo es innecesario, comento en caso de que
la forma que se usa como reemplazo de algun error

export const getContentCurrentPage = ({ next, previous, count, length }) => {
  let page = 1
  if (previous >= 0 && next >= 0)
    page = (previous / ((next - previous) / 2) + 2)
  else if (previous >= 0 && !next) {
    page = (previous / ((count - length) - previous) + 2)
  }
  return page
} */

export const pixelAmpDate = arcSite => {
  const hoy = new Date()
  const day = hoy.getDate()
  const month = hoy.getMonth() + 1
  const year = hoy.getFullYear()
  const pixelEc =
    (`${year}${month}${day}` === '20191210' ||
      `${year}${month}${day}` === '20191211' ||
      `${year}${month}${day}` === '2019129') &&
    arcSite === SITE_ELCOMERCIO
      ? true
      : ''
  return pixelEc
}
