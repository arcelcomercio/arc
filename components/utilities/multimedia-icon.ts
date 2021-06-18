import { PromoItemType } from 'types/story'

import { GALLERY, VIDEO } from './constants/multimedia-types'

type MultimediaIcon = 'icon-video' | 'icon-img' | ''

const getMultimediaIcon = (multimediaType: PromoItemType): MultimediaIcon => {
  let icon: MultimediaIcon
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

export default getMultimediaIcon
