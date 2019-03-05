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

export const GetMultimediaContent = ({
  basic_video,
  basic_image,
  basic,
  Basic,
}) => {
  let result = {url:null, medio:null}
  
  if (basic_video) {
    if (basic_video.promo_items) {
      if (basic_video.promo_items.basic) {
        if (basic_video.promo_items.basic.url) {
          result = basic_video.promo_items.basic.url
          return { url: result , medio: 'video' }
        }
      }
    }
  }

  if (basic_image) {
    if (basic_image.url) {
      result = basic_image.url
      return { url: result , medio: 'image' }
    }
  }

  if (basic) {
    if (basic.url) {
      result = basic.url
      return { url: result , medio: 'image' }
    }
  }

  if (Basic) {
    if (Basic.promo_items) {
      if (Basic.promo_items.basic) {
        if (Basic.promo_items.basic.url) {
          result = Basic.promo_items.basic.url
          return result
        }
      }
    }
  }

  return result
}
