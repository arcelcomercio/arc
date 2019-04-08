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

export const getActualDate = () => {
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 // January is 0!

  const yyyy = today.getFullYear()
  if (dd < 10) {
    dd = `0${dd}`
  }
  if (mm < 10) {
    mm = `0${mm}`
  }
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
  let test = ''
  switch (type) {
    case 'basic_gallery':
      test = 'G'
      break
    case 'basic_video':
      test = 'V'
      break
    default:
      test = ''
  }
  return test
}

// Simplificación de la función addResizedUrlItem, ej: ratio = "16x9" resolution = "400x400"
export const ResizeImageUrl = (arcSite, imgUrl, ratio, resolution) => {
  const test = addResizedUrlItem(arcSite, imgUrl, [`${ratio}|${resolution}`])
    .resized_urls[ratio]

  return test
}

export const GetMultimediaContent = ({ basic_video, basic_gallery, basic }) => {
  let result = { url: null, medio: null }

  if (
    basic_video &&
    basic_video.promo_items &&
    basic_video.promo_items.basic &&
    basic_video.promo_items.basic.url
  ) {
    result.url = basic_video.promo_items.basic.url
    return { url: result.url, medio: 'video' }
  }

  if (
    basic_gallery &&
    basic_gallery.promo_items &&
    basic_gallery.promo_items.basic &&
    basic_gallery.promo_items.basic.url
  ) {
    result.url = basic_gallery.promo_items.basic.url
    return { url: result.url, medio: 'gallery' }
  }

  if (basic && basic.url) {
    result.url = basic.url
    return { url: result.url, medio: 'image' }
  }
  return result
}
