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

export const sizeImgNewsLetter = () => {
  return {
    // landscape
    tbmax: {
      width: 648,
      height: 364,
    },
    tbmin: {
      width: 214,
      height: 135,
    },
    tb250x366: {
      width: 250,
      height: 366,
    },
    tb148x83: {
      width: 148,
      height: 83,
    },
    tb210x118: {
      width: 210,
      height: 118,
    },
    tb403x227: {
      width: 403,
      height: 227,
    },

    tb241x136: {
      width: 241,
      height: 136,
    },
    tbgrande: {
      width: 618,
      height: 348,
    },

    tbflujo: {
      width: 290,
      height: 163,
    },
  }
}

export const sizeImgStory = () => {
  return {
    large: {
      width: 980,
      height: 528,
    },
    landscape_md: {
      width: 314,
      height: 157,
    },
    story_small: {
      width: 482,
      height: 290,
    },
    medium: {
      width: 480,
    },
    content: {
      width: 980,
    },
    content_small: {
      width: 320,
    },
    amp_new: {
      width: 1200,
      height: 800,
    },
    impresa: {
      width: 617,
      height: 637,
    },
    impresa_s: {
      width: 273,
      height: 289,
    },
    amp_image_1x1: {
      width: 1200,
      height: 1200,
    },
    amp_image_4x3: {
      width: 1200,
      height: 900,
    },
    amp_image_16x9: {
      width: 1200,
      height: 675,
    },
  }
}

export const sizeImg = () => {
  return {
    // landscape
    landscape_xl: {
      width: 980,
      height: 528,
    },
    landscape_ext_story: {
      width: 980,
      height: 355,
    },
    landscape_l: {
      width: 648,
      height: 374,
    },
    landscape_md: {
      width: 314,
      height: 157,
    },
    landscape_s: {
      width: 234,
      height: 161,
    },
    landscape_xs: {
      width: 118,
      height: 72,
    },
    landscape_xxs: {
      width: 170,
      height: 90,
    },

    // portrait
    // TODO: actualizar tamaño
    portrait_xl: {
      width: 528,
      height: 900,
    },
    // TODO: actualizar tamaño
    portrait_l: {
      width: 374,
      height: 648,
    },
    portrait_md: {
      width: 314,
      height: 374,
    },
    // TODO: actualizar tamaño
    portrait_s: {
      width: 161,
      height: 220,
    },
    portrait_xs: {
      width: 75,
      height: 90,
    },
    // square
    // TODO: actualizar tamaño a todos
    square_xl: {
      width: 900,
      height: 900,
    },
    square_l: {
      width: 600,
      height: 600,
    },
    square_md: {
      width: 300,
      height: 300,
    },
    square_s: {
      width: 150,
      height: 150,
    },
    square_xs: {
      width: 75,
      height: 75,
    },
    /*     lazy_default: {
      width: 5,
      height: 5,
    }, */
    // TODO: Eliminar estos tamaños despues de actualizar
    // los tamaños de las imagenes de todos los componentes.
    small: {
      width: 100,
      height: 200,
    },
    medium: {
      width: 480,
    },
    content: {
      width: 980,
    },
    content_small: {
      width: 320,
    },
    large: {
      width: 940,
      height: 569,
    },
    story_small: {
      width: 482,
      height: 290,
    },

    amp_new: {
      width: 1200,
      height: 800,
    },
    amp: {
      width: 900,
      height: 600,
    },
    impresa: {
      width: 617,
      height: 637,
    },
    impresa_s: {
      width: 273,
      height: 289,
    },
  }
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
  if (presets === 'no-presets') return contentElements
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

/**
 * @param {Object} config
 * @param {String} config.url
 * @param {(String|Object)} [config.presets]
 * @param {String} config.arcSite
 */
export const getResizedUrl = ({ url, presets, arcSite }) => {
  if (url) {
    const { resizerUrl } = getProperties(arcSite)
    return createResizedUrl({
      url,
      presets,
      resizerSecret: ENV.resizerSecret,
      resizerUrl,
    })
  }
  return ''
}

/**
 * TODO: Necesita CODE REVIEW
 */
export const addResizedUrlsToStory = (
  data,
  resizerUrl,
  resizerSecret,
  preset = 'basic'
) => {
  return (
    data &&
    data.length > 0 &&
    data.map(item => {
      const storyData = item
      if (!storyData.content_elements) storyData.content_elements = []

      let presets = {}
      switch (preset) {
        case 'newsletter':
          presets = sizeImgNewsLetter()
          break
        case 'story':
          presets = sizeImgStory()
          break
        case 'related':
          presets = {
            landscape_md: {
              width: 314,
              height: 157,
            },
            lazy_default: {
              width: 7,
              height: 4,
            },
          }
          break
        default:
          presets = sizeImg()
      }

      const {
        promo_items: {
          basic_gallery: basicGallery = null,
          basic_video: basicVideo = null,
        } = {},
      } = item

      if (basicGallery && basicGallery.promo_items) {
        const image = addResizedUrls(basicGallery, {
          resizerUrl,
          resizerSecret,
          presets,
        })
        storyData.promo_items.basic_gallery = image
      }

      if (basicVideo && basicVideo.promo_items) {
        basicVideo.content_elements = []
        const image = addResizedUrls(basicVideo, {
          resizerUrl,
          resizerSecret,
          presets,
        })
        storyData.promo_items.basic_video = image
      }

      return addResizedUrls(storyData, {
        resizerUrl,
        resizerSecret,
        presets,
      })
    })
  )
}
