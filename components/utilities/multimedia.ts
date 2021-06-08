import { PromoItemType } from 'types/story'

import { GALLERY, VIDEO } from './constants/multimedia-types'

type MultimediaType = 'video' | 'foto_galeria' | 'gallery' | 'imagen' | 'story'

export const getMultimedia = (
  multimediaType: PromoItemType,
  amp = false
): MultimediaType => {
  let type: MultimediaType
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
