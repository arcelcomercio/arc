import { VIDEO, ELEMENT_YOUTUBE_ID, IMAGE } from './constants'

export const getTitle = data => {
  const { headlines: { basic = '' } = {} } = data || {}
  return basic
}

export const getVideo = data => {
  const result = { type: '', payload: '' }

  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO].embed_html) ||
    ''
  if (result.payload !== '') {
    result.type = VIDEO
  }
  return result
}

export const getVideoYoutube = data => {
  const result = { type: '', payload: '' }
  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[ELEMENT_YOUTUBE_ID] &&
      data.promo_items[ELEMENT_YOUTUBE_ID].content) ||
    ''
  if (result.payload !== '') {
    result.type = ELEMENT_YOUTUBE_ID
  }
  return result
}

export const getImage = (data, ImageSize) => {
  const result = { type: '', payload: '' }
  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[IMAGE] &&
      data.promo_items[IMAGE].resized_urls &&
      data.promo_items[IMAGE].resized_urls[ImageSize]) ||
    ''
  if (result.payload !== '') {
    result.type = IMAGE
  }
  return result
}

export const getVideoImage = (data,ImageSize) => {
  const result = { type: '', payload: '' }

  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO].promo_items &&
      data.promo_items[VIDEO].promo_items[IMAGE] &&
      data.promo_items[VIDEO].promo_items[IMAGE].resized_urls &&
      data.promo_items[VIDEO].promo_items[IMAGE].resized_urls[ImageSize] ) ||
    ''
  if (result.payload !== '') {
    result.type = VIDEO
  }
  return result
}