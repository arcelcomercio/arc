import { addResizedUrlItem } from './thumbs'

export const reduceWord = (word, len = 145, finalText = '...') => {
  return word.length > len ? word.slice(0, len).concat(finalText) : word
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
      return 'G'
    case 'basic_video':
      return 'V'
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

export const GetMultimediaContent = ({
  basic_video: basicVideo,
  basic_gallery: basicGallery,
  basic,
}) => {
  const result = {
    url: null,
    medio: null,
  }

  if (basicVideo) {
    const {
      promo_items: {
        basic: { url: videoUrl = '' },
      },
    } = basicVideo
    result.url = videoUrl
    return {
      url: result.url,
      medio: 'video',
    }
  }

  if (basicGallery) {
    const {
      promo_items: {
        basic: { url: galleryUrl = '' },
      },
    } = basicGallery
    result.url = galleryUrl
    return {
      url: result.url,
      medio: 'gallery',
    }
  }

  if (basic) {
    result.url = basic.url || ''
    return {
      url: result.url,
      medio: 'image',
    }
  }
  return result
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
export const socialMediaUrlShareList = (postPermaLink, postTitle) => {
  return {
    facebook: `http://www.facebook.com/sharer.php?u=http://gestion.pe/blog/${postPermaLink}`,
    twitter: `http://twitter.com/home?status=${encodeURIComponent(
      postTitle
    )}+http://gestion.pe/blog/${postPermaLink}+via%20@Gestionpe`,
    linkedin: `http://www.linkedin.com/shareArticle?url=http://gestion.pe/blog/${postPermaLink}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=http://gestion.pe/blog/${postPermaLink}`,
    whatsapp: `whatsapp://send?text=http://gestion.pe/blog/${postPermaLink}`,
  }
}
