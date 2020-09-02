/* eslint-disable global-require, max-len, array-callback-return, no-param-reassign */
/* Fusion */
import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'

/* Utilities */
import { formatPresetsSizes } from './format-presets'
import { VIDEO, GALLERY } from '../constants/multimedia-types'

/**
 * @description
 * Retorna dos funciones necesarias para crear el objeto con los breakpoints,
 * formatos y thumborParams necesarios para reconstruir las nuevas urls
 * posteriormente.
 *
 * @param  {string} resizerKey
 * @param  {string} resizerUrl
 * @param  {number} filterQuality - Valor entre 0 y 100, se recomienda un mínimo de 75 para evitar pérdida de calidad.
 * @returns {Object}
 *
 * @see
 * - [Ejemplo en Fusion Skeleton](https://github.com/wapopartners/Skeleton-PageBuilder-Fusion-Features/blob/SK-Fusion-Features/content/utilities/resizer.js#L55)
 */

export const createResizer = (resizerKey, resizerUrl, filterQuality = 75) => {
  /**
   * @description
   * Crea thumborParam de imagen procesada con el
   * resizer, para construir posteriormente la nueva url.
   *
   * @param {string} originalUrl - Url original de la imagen
   * @param {object} breakpoint -
   * @param {number} breakpoint.width
   * @param {number} breakpoint.height
   * @param {string} format - Formato de la imagen
   * @returns {string} thumborParam para construir nueva url
   */
  const getResizerParam = (originalUrl, breakpoint, format = 'jpeg') => {
    if (typeof window === 'undefined') {
      /**
       * Esta validacion es "temporal", mientras no esta habilitada
       * la opcion para retornar solamente el thumborParam y regenerar
       * la URL en los features. Si se activa esa modalidad posteriormente,
       * no seria necesaria esta validacion aca porque ya esta incluida
       * en el archivo "url-regenerator"
       */
      if (
        originalUrl.includes(
          'https://cdna.' ||
            'https://cdnc.' ||
            '/resources/dist/' ||
            '/resources/assets/'
        )
      )
        return originalUrl

      const Thumbor = require('thumbor-lite')
      const { height, width } = breakpoint

      if (!height && !width) throw new Error('Height y Width son requeridos')

      const thumbor = new Thumbor(resizerKey, resizerUrl)
      /* TODO: Refactor to use custom focusImage function */
      thumbor.smartCrop(true)
      const thumborParam = thumbor
        .setImagePath(originalUrl.replace(/(^\w+:|^)\/\//, ''))
        .filter(`format(${format})`)
        .filter(`quality(${filterQuality})`)
        .resize(width, height)
        .buildUrl()
      /**
       * Por ahora se retorna la URL con resizer completa,
       * no solamente el thumborParam, para evitar tener que hacer
       * el proceso de regenerar las URLs posteriormente.
       *
       * No eliminamos el breakpointSize por ahora
       * por no complicar como se reconstruye la url en los features
       */
      // const urlSuffix = originalUrl.replace(/http[s]?:\/\//, '')
      // const breakpointSize = `${width}x${height}`
      return thumborParam // .replace(resizerUrl, '').replace(urlSuffix, '')
      // .replace(`/${breakpointSize}/`, '')
    }
    return null
  }

  /**
   * @description
   * Crea objecto con presets, formatos y thumborParams de imagen procesada con el
   * resizer, para construir posteriormente las nuevas urls.
   *
   * @param {string} originalUrl - Url original de la imagen
   * @param {(string|object)} [presets] - Cadena de "preset:pixeles" separados por coma (,).
   * ej: square_md:300x300,square_s:150x150
   * @returns {object} Presets, formatos y thumborParams para construir nuevas urls
   */
  const getResizerParams = (originalUrl, presets) => {
    let output = {}
    const format = 'jpeg'
    // const formats = ['webp', 'jpeg']

    const getParamsByPreset = () => {
      const presetsObject = formatPresetsSizes(presets)
      const breakpoints = Object.keys(presetsObject)

      breakpoints.forEach(breakpoint => {
        const { width, height } = presetsObject[breakpoint]
        const breakpointObject = {
          // [`${breakpoint}`]: {}
          [`${breakpoint}`]: getResizerParam(
            originalUrl,
            { width, height },
            format
          ),
        }
        /* 
        Esto se usaba para devolver un objeto con una
        URL por cada formato en formats, por ahora no se 
        aplicara de esta manera, solo se retornara una URL
        como string.
        
        formats.forEach(format => {
          breakpointObject[breakpoint][format] = getResizerParam(
            originalUrl,
            { width, height },
            format
          )
        }) */

        output = { ...output, ...breakpointObject }
      })
    }

    getParamsByPreset(output)
    return output
  }

  return {
    getResizerParam,
    getResizerParams,
  }
}

/**
 * @description
 * Crea thumborParam de imagen procesada con el
 * resizer, para construir posteriormente la nueva url.
 *
 * @param {object} config
 * @param {url} config.string - URL de la imagen original
 * @param {(string|object)} [config.presets] - Cadena de "preset:pixeles" separados por coma (,).
 * ej: square_md:300x300,square_s:150x150
 * @param {number} [config.filterQuality=75] - Calidad de la imagen
 * @return {object} Presets, formatos y thumborParams para construir nuevas urls
 */
export const createResizedParams = ({
  url,
  presets,
  arcSite,
  filterQuality,
}) => {
  if (typeof window === 'undefined' && url) {
    const { resizerUrl } = getProperties(arcSite)
    return createResizer(
      resizerSecret,
      resizerUrl,
      filterQuality
    ).getResizerParams(url, presets)
  }
  return {}
}

export const resizeImage = (image, presets, resizer) => {
  if ((image.type && image.type !== 'image') || !image.url) {
    throw new Error('Not a valid image object')
  }

  return resizer.getResizerParams(image.url, presets)
}

const resizePromoItems = (promoItems, presets, resizer) => {
  const output = {}
  Object.keys(promoItems).forEach(key => {
    const promoItem = promoItems[key]
    if ((key === 'type' && promoItem === 'image') || key === 'url') {
      output.resized_urls = resizeImage(promoItems, presets, resizer)
      output.url = promoItems.url
      output.type = promoItems.type
    } else {
      output[key] = promoItem
    }
  })
  return output
}

export const getResizedImageParams = (data, option, filterQuality) => {
  if (!option.resizerSecret || !option.resizerUrl) {
    throw new Error('Resizer URL and secret are required.')
  }

  const resizer = createResizer(
    option.resizerSecret,
    option.resizerUrl,
    filterQuality
  )

  const generateParams = sourceData => {
    if (sourceData && sourceData.content_elements) {
      sourceData.content_elements = sourceData.content_elements.map(
        contentElement => {
          /* 
          Esto agregaria el resizer a cada imagen del cuerpo de la nota
          if (contentElement.type === 'image') {
            contentElement.resized_urls = resizeImage(
              contentElement,
              option.presets,
              resizer
            )
          } */
          if (contentElement.promo_items && contentElement.promo_items.basic) {
            contentElement.promo_items.basic = resizePromoItems(
              contentElement.promo_items.basic,
              option.presets,
              resizer
            )
          }
          if (
            contentElement.promo_items &&
            contentElement.promo_items[VIDEO] &&
            contentElement.promo_items[VIDEO].promo_items &&
            contentElement.promo_items[VIDEO].promo_items.basic
          ) {
            contentElement.promo_items[
              VIDEO
            ].promo_items.basic = resizePromoItems(
              contentElement.promo_items[VIDEO].promo_items.basic,
              option.presets,
              resizer
            )
          }
          if (
            contentElement.promo_items &&
            contentElement.promo_items[GALLERY] &&
            contentElement.promo_items[GALLERY].promo_items &&
            contentElement.promo_items[GALLERY].promo_items.basic
          ) {
            contentElement.promo_items[
              GALLERY
            ].promo_items.basic = resizePromoItems(
              contentElement.promo_items[GALLERY].promo_items.basic,
              option.presets,
              resizer
            )
          }
          return contentElement
        }
      )
    }
    if (sourceData && sourceData.promo_items && sourceData.promo_items.basic) {
      sourceData.promo_items.basic = resizePromoItems(
        sourceData.promo_items.basic,
        option.presets,
        resizer
      )
    }
    if (
      sourceData &&
      sourceData.promo_items &&
      sourceData.promo_items[VIDEO] &&
      sourceData.promo_items[VIDEO].promo_items &&
      sourceData.promo_items[VIDEO].promo_items.basic
    ) {
      sourceData.promo_items[VIDEO].promo_items.basic = resizePromoItems(
        sourceData.promo_items[VIDEO].promo_items.basic,
        option.presets,
        resizer
      )
    }
    if (
      sourceData &&
      sourceData.promo_items &&
      sourceData.promo_items[GALLERY] &&
      sourceData.promo_items[GALLERY].promo_items &&
      sourceData.promo_items[GALLERY].promo_items.basic
    ) {
      sourceData.promo_items[GALLERY].promo_items.basic = resizePromoItems(
        sourceData.promo_items[GALLERY].promo_items.basic,
        option.presets,
        resizer
      )
    }
    return sourceData
  }

  if (data && data.count > 0) {
    data.content_elements.map(contentElement => {
      generateParams(contentElement)
    })
  } else {
    generateParams(data)
  }

  return data
}

/**
 * Recorre toda la historia o conjunto de historias
 * agregando el objeto resized_urls a cada promo_items con
 * las imagenes escaladas a los tamanos definidos como presets.
 *
 * @param {object} data Historia o conjunto de historias
 * @param {(string|object)} [presets] - Cadena de "preset:pixeles" separados por coma (,).
 * ej: square_md:300x300,square_s:150x150
 * @param {string} arcSite Sitio web
 * @param {number} [filterQuality=75] Calidad de la imagen.
 * @return {object} `data` ingresada con resized_urls en promo_items
 */
export const getResizedImageData = (
  data,
  presets,
  arcSite,
  filterQuality = 75
) => {
  if (typeof window === 'undefined') {
    if (presets === 'no-presets') return data

    const resizerKey = resizerSecret
    const { resizerUrl } = getProperties(arcSite)
    const output = data
    const transformedData = getResizedImageParams(
      output,
      {
        resizerSecret: resizerKey,
        resizerUrl,
        presets,
      },
      filterQuality
    )
    return transformedData
  }
  return data
}
