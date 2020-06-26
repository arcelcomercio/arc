import {
  sizeImg,
  sizeImgNewsLetter,
  sizeImgStory,
  sizeImgRelated,
} from './image-presets'

/**
 * Transforma la cadena de presets en un objeto para que pueda ser digerido
 * por las funciones que hacen resize.
 *
 * @param {string} presets - Cadena de "preset:pixeles" separados por
 * coma (,).
 * ej: square_md:300x300,square_s:150x150
 *
 * @example formatPresetsSizes('mobile:314x157,tablet:314x157,desktop:314x157')
 */
// eslint-disable-next-line import/prefer-default-export
export const formatPresetsSizes = presets => {
  if (presets === 'newsletter') {
    return sizeImgNewsLetter()
  }
  if (presets === 'story') {
    return sizeImgStory()
  }
  if (presets === 'related') {
    return sizeImgRelated()
  }
  if (typeof presets !== 'string' || !presets) {
    return presets || sizeImg()
  }

  const formatPresets = {}
  presets.split(',').forEach(preset => {
    const presetsKeysAndSize = preset.split(':') || []
    const presetsKey = presetsKeysAndSize[0] || ''
    const presetsSize = presetsKeysAndSize[1] || ''
    formatPresets[presetsKey] = {
      width: presetsSize.split('x')[0] || 0,
      height: presetsSize.split('x')[1] || 0,
    }
  })
  return formatPresets
}
