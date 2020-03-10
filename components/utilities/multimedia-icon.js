import { VIDEO, GALLERY } from './constants/multimedia-types'

const getMultimediaIcon = multimediaType => {
  let icon = ''
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
