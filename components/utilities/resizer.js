import {
  addResizedUrls,
  createUrlResizer,
} from '@arc-core-components/content-source_content-api-v4'
import ENV from 'fusion:environment'
import getProperties from 'fusion:properties'

/**
 * Transforma la cadena de presets en un objeto para que pueda ser digerido
 * por las funciones que hacen resize.
 *
 * @param {string} presets - Cadena de "preset:pixeles" separados por
 * coma (,).
 * ej: square_md:300x300,square_s:150x150
 *
 * @example getPresetsSize('mobile:314x157,tablet:314x157,desktop:314x157')
 */
const getPresetsSize = (presets = '') => {
  const formatPresets = {}
  presets.split(',').forEach(preset => {
    const presetsKeysAndSize = preset.split(':') || []
    const presetsKey = presetsKeysAndSize[0] || ''
    const presetsSize = presetsKeysAndSize[1] || ''
    formatPresets[presetsKey] = {
      width: presetsSize.split('x')[0] || '',
      height: presetsSize.split('x')[1] || '',
    }
  })
  return formatPresets
}
/**
 * Crea un listado de imagenes escaladas al tamano deseado a partir de
 * la URL de una imagen original y un conjunto de presets.
 *
 * @param {Object} config Configuracion.
 * @param {string} config.url - URL original de la imagen a escalar.
 * @param {string} config.presets - Cadena de "preset:pixeles" separados por
 * coma (,).
 * ej: square_md:300x300,square_s:150x150
 * @param {string} config.resizerUrl - URL base para las imagenes escaladas, por marca.
 * Se obtiene desde siteProperties.
 * @param {string} config.resizerSecret - Token para generar las imagenes escaladas.
 * Se obtiene desde "fusion:environment".
 *
 * @example ```
 * import { resizerSecret } from 'fusion:environment'
 * import getProperties from 'fusion:properties'
 *
 * const { resizerUrl } = getProperties(website)
 *
 * createResizedUrl({
 *  url: 'url/de/la/imagen.jpg',
 *  presets: 'mobile:314x157,tablet:314x157,desktop:314x157,
 *  resizedUrl,
 *  resizedSecret
 * })
 * ```
 */
export const createResizedUrl = ({
  url,
  presets,
  resizerUrl,
  resizerSecret,
}) => {
  return createUrlResizer(resizerSecret, resizerUrl, {
    presets: getPresetsSize(presets),
  })({
    url,
  })
}
/**
 * Recorre toda la historia agregando el objeto resized_urls a cada promo_items con
 * las imagenes escaladas a los tamanos definidos como presets.
 *
 * @param {Object} config Configuracion.
 * @param {Array} config.contentElements - Todo el contenido de la historia con las
 * imagenes que se desea escalar.
 * @param {string} config.presets - Cadena de "preset:pixeles" separados por
 * coma (,).
 * ej: square_md:300x300,square_s:150x150
 * @param {string} config.resizerUrl - URL base para las imagenes escaladas, por marca.
 * Se obtiene desde siteProperties.
 * @param {string} config.resizerSecret - Token para generar las imagenes escaladas.
 * Se obtiene desde "fusion:environment".
 *
 *  * @example ```
 * import { resizerSecret } from 'fusion:environment'
 * import getProperties from 'fusion:properties'
 *
 * const { resizerUrl } = getProperties(website)
 *
 * addResizedUrlsToStories({
 *  contentElements: [story],
 *  presets: 'mobile:314x157,tablet:314x157,desktop:314x157,
 *  resizedUrl,
 *  resizedSecret
 * })
 * ```
 */
export const addResizedUrlsToStories = ({
  contentElements = [],
  presets,
  resizerUrl,
  resizerSecret,
}) => {
  const presetsArray = getPresetsSize(presets)
  return contentElements.map(story => {
    const dataStory = story
    const { content_elements: auxContentElements } = dataStory || {}
    if (!auxContentElements) dataStory.content_elements = []
    const {
      promo_items: {
        basic_gallery: basicGallery = null,
        basic_video: basicVideo = null,
      } = {},
    } = dataStory
    if (basicGallery && basicGallery.promo_items) {
      const { content_elements: galleryContentElements } = basicGallery || {}
      if (!galleryContentElements)
        dataStory.promo_items.basic_gallery.content_elements = []
      /**
       * CR: esto esta bien? al final agregas el content_elements a la galeria en dataStory
       * pero lo que estas mandando a addResizedUrls es basicGallery, asi como con basicVideo
       * esta no es la que deberia tener el content_elements vacio para evitar errores?
       */
      const image = addResizedUrls(basicGallery, {
        resizerUrl,
        resizerSecret,
        presets: presetsArray,
      })
      dataStory.promo_items.basic_gallery = image
    }
    if (basicVideo && basicVideo.promo_items) {
      basicVideo.content_elements = []
      const image = addResizedUrls(basicVideo, {
        resizerUrl,
        resizerSecret,
        presets: presetsArray,
      })
      dataStory.promo_items.basic_video = image
    }
    return addResizedUrls(dataStory, {
      resizerUrl,
      resizerSecret,
      presets: presetsArray,
    })
  })
}

export const getResizedUrlsToStories = ({
  contentElements = [],
  presets,
  arcSite,
}) => {
  const { resizerUrl } = getProperties(arcSite)
  return addResizedUrlsToStories({
    contentElements,
    presets,
    resizerUrl,
    resizerSecret: ENV.resizerSecret,
  })
}
