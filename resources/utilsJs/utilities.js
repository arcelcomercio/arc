export const FormatClassName = styles => {
  let aux
  if (!Array.isArray(styles) && typeof styles == 'object') {
    aux = {}
    Object.values(styles).forEach((item, index) => {
      if (!Array.isArray(item)) {
        aux[Object.keys(styles)[index]] = item
      } else aux[Object.keys(styles)[index]] = item.join(' ')
    })
  } else if (Array.isArray(styles) && typeof styles == 'object')
    aux = styles.join(' ')
  return aux
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
