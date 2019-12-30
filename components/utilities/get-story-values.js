import {
  VIDEO,
  ELEMENT_YOUTUBE_ID,
  IMAGE,
  GALLERY,
//   IMAGE_ORIGINAL,
} from './constants'

export const getTitle = data => {
  const { headlines: { basic = '' } = {} } = data || {}
  return basic
}
// eslint-disable-next-line import/prefer-default-export
export const getMultimediaType = data => {
  let typeMultimedia = null
  const { promo_items: promoItems = {} } = data || {}
  const items = Object.keys(promoItems)

  if (items.length > 0) {
    if (items.includes(VIDEO)) {
      typeMultimedia = VIDEO
    } else if (items.includes(ELEMENT_YOUTUBE_ID)) {
      typeMultimedia = ELEMENT_YOUTUBE_ID
    } else if (items.includes(GALLERY)) {
      typeMultimedia = GALLERY
    } else if (items.includes(IMAGE)) {
      typeMultimedia = IMAGE
    }
  }
  return typeMultimedia
}

export const multimediaNews = data => {
  const type = getMultimediaType(data) || ''
  const result = { type, payload: '' }
  let imageItems = ''

  switch (type) {
    // se comento por que para el componente lista video no se va a usar
    //   case IMAGE:
    //     result.payload = this.getMultimediaBySize(IMAGE_ORIGINAL)
    //     break
    case VIDEO:
      result.payload =
        (data &&
          data.promo_items &&
          data.promo_items[VIDEO] &&
          data.promo_items[VIDEO]._id) ||
        ''
      break

    case GALLERY:
      imageItems =
        (data &&
          data.promo_items &&
          data.promo_items[GALLERY] &&
          data.promo_items[GALLERY].content_elements) ||
        []

      result.payload =
        imageItems.map(({ additional_properties: additionalProperties }) => {
          const { resizeUrl = '' } = additionalProperties
          return resizeUrl
        }) || []
      break
    case ELEMENT_YOUTUBE_ID:
      result.payload =
        (data &&
          data.promo_items &&
          data.promo_items[ELEMENT_YOUTUBE_ID] &&
          data.promo_items[ELEMENT_YOUTUBE_ID].content) ||
        ''
      break
    default:
      result.payload = ''
      break
  }
  return result
}
