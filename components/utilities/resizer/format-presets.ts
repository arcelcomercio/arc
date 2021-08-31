import { InlinePresets, Presets } from 'types/resizer'

import {
  sizeImg,
  sizeImgNewsLetter,
  sizeImgRelated,
  sizeImgStory,
} from './image-presets'

/**
 * Transforma la cadena de presets en un objeto para que pueda ser digerido
 * por las funciones que hacen resize.
 *
 * @param presets - Cadena de "preset:pixeles" separados por
 * coma (,).
 * ej: square_md:300x300,square_s:150x150
 *
 * @example formatPresetsSizes('mobile:314x157,tablet:314x157,desktop:314x157')
 */
export const formatPresetsSizes = (presets?: InlinePresets): Presets => {
  if (presets === 'newsletter') {
    return sizeImgNewsLetter()
  }
  if (presets === 'story') {
    return sizeImgStory()
  }
  if (presets === 'related') {
    return sizeImgRelated()
  }
  if (!presets) {
    return sizeImg()
  }
  if (typeof presets !== 'string') {
    return presets || sizeImg()
  }

  const formatPresets: Presets = {}
  presets.split(',').forEach((preset) => {
    const keyAndSize = preset.split(':') || []
    const key = keyAndSize[0] || ''
    const size = keyAndSize[1] || ''
    formatPresets[key] = {
      width: parseInt(size.split('x')[0], 10) || 0,
      height: parseInt(size.split('x')[1], 10) || 0,
    }
  })
  return formatPresets
}
