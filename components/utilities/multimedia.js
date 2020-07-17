import { VIDEO, GALLERY } from './constants/multimedia-types'

// eslint-disable-next-line import/prefer-default-export
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
