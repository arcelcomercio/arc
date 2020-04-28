import { VIDEO, ELEMENT_YOUTUBE_ID, IMAGE } from './constants'

export const getTitle = data => {
  const { headlines: { basic = '' } = {} } = data || {}
  return basic
}

export const getVideoID = data => {
  return (
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO]._id) ||
    ''
  )
}

export const getVideoStreams = data => {
  return (
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO].streams) ||
    []
  )
}

export const getVideoYoutube = data => {
  return (
    (data &&
      data.promo_items &&
      data.promo_items[ELEMENT_YOUTUBE_ID] &&
      data.promo_items[ELEMENT_YOUTUBE_ID].content) ||
    ''
  )
}

export const getType = data => {
  const powa = getVideoID(data) && VIDEO
  const youtube = getVideoYoutube(data) && ELEMENT_YOUTUBE_ID

  return powa || youtube || undefined
}

export const getImage = (data, ImageSize) => {
  const result = { type: IMAGE, payload: '' }
  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[IMAGE] &&
      data.promo_items[IMAGE].resized_urls &&
      data.promo_items[IMAGE].resized_urls[ImageSize]) ||
    ''

  return result
}

export const getVideoImage = (data, ImageSize) => {
  const result = { type: '', payload: '' }

  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO].promo_items &&
      data.promo_items[VIDEO].promo_items[IMAGE] &&
      data.promo_items[VIDEO].promo_items[IMAGE].resized_urls &&
      data.promo_items[VIDEO].promo_items[IMAGE].resized_urls[ImageSize]) ||
    ''
  if (result.payload !== '') {
    result.type = VIDEO
  }
  return result
}

export const getVideoTime = data => {
  let result = 0

  result =
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO].duration) ||
    0
  return result
}
