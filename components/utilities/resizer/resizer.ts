/* eslint-disable no-param-reassign */
import { ArcSite } from 'fusion:context'
import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { Basic, PromoItems, Stories, Story } from 'types/story'

import {
  formatPresetsSizes,
  InlinePresets,
  Preset,
  ResizedUrls,
} from './format-presets'

type CreateResizerFunctions = {
  getResizerParam: (
    originalUrl: string,
    breakpoint: Preset,
    format?: string
  ) => string
  getResizerParams: (
    originalUrl: string,
    presets?: InlinePresets | undefined,
    format?: string
  ) => ResizedUrls
}

/**
 * @description
 * Retorna dos funciones necesarias para crear el objeto con los breakpoints,
 * formatos y thumborParams necesarios para reconstruir las nuevas urls
 * posteriormente.
 *
 * @param resizerKey
 * @param resizerUrl
 * @param filterQuality - Valor entre 0 y 100, se recomienda un mínimo de 75 para evitar pérdida de calidad.
 *
 * @see
 * - [Ejemplo en Fusion Skeleton](https://github.com/wapopartners/Skeleton-PageBuilder-Fusion-Features/blob/SK-Fusion-Features/content/utilities/resizer.js#L55)
 */
export const createResizer = (
  resizerKey: string,
  resizerUrl: string,
  filterQuality = 75
): CreateResizerFunctions => {
  /**
   * @description
   * Crea thumborParam de imagen procesada con el
   * resizer, para construir posteriormente la nueva url.
   *
   * @param originalUrl - Url original de la imagen
   * @param breakpoint -  Preset, objeto con width y height
   * @param format - Formato de la imagen
   * @returns thumborParam para construir nueva url
   */
  const getResizerParam: CreateResizerFunctions['getResizerParam'] = (
    originalUrl,
    breakpoint,
    format = 'jpeg'
  ) => {
    const validFormat = /jpeg|png|webp/.test(format) ? format : 'jpeg'

    if (typeof window === 'undefined') {
      /**
       * Esta validacion es "temporal", mientras no esta habilitada
       * la opcion para retornar solamente el thumborParam y regenerar
       * la URL en los features. Si se activa esa modalidad posteriormente,
       * no seria necesaria esta validacion aca porque ya esta incluida
       * en el archivo "url-regenerator"
       */
      if (
        /https:\/\/cdn[c|a].|\/resources\/(?:dist|assets)\//.test(originalUrl)
      )
        return originalUrl

      // eslint-disable-next-line global-require
      const Thumbor = require('thumbor-lite')
      const { height, width } = breakpoint

      if (!height && !width) throw new Error('Height y Width son requeridos')

      const thumbor = new Thumbor(resizerKey, resizerUrl)
      /* TODO: Refactor to use custom focusImage function */
      thumbor.smartCrop(true)
      const thumborParam =
        originalUrl &&
        thumbor
          .setImagePath(originalUrl.replace(/(^\w+:|^)\/\//, ''))
          .filter(`format(${validFormat})`)
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
    return ''
  }

  /**
   * @description
   * Crea objecto con presets, formatos y thumborParams de imagen procesada con el
   * resizer, para construir posteriormente las nuevas urls.
   *
   * @param originalUrl - Url original de la imagen
   * @param presets - Cadena de "preset:pixeles" separados por coma (,).
   * ej: square_md:300x300,square_s:150x150
   * @returns Presets, formatos y thumborParams para construir nuevas urls
   */
  const getResizerParams: CreateResizerFunctions['getResizerParams'] = (
    originalUrl,
    presets,
    format = 'jpeg'
  ) => {
    let output: ResizedUrls = {}
    // const formats = ['webp', 'jpeg']

    const getParamsByPreset = (): void => {
      const presetsObject = formatPresetsSizes(presets)
      const breakpoints = Object.keys(presetsObject)

      breakpoints.forEach((breakpoint) => {
        const { width, height } = presetsObject[breakpoint]
        const breakpointObject: ResizedUrls = {
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

    getParamsByPreset()
    return output
  }

  return {
    getResizerParam,
    getResizerParams,
  }
}

type CreateResizedParamsProps = {
  url: string
  presets?: InlinePresets
  arcSite: ArcSite
  filterQuality?: number
  format?: string
}
/**
 * @description
 * Crea thumborParam de imagen procesada con el
 * resizer, para construir posteriormente la nueva url.
 *
 * @param props
 * @param props.url - URL de la imagen original
 * @param props.presets - Cadena de "preset:pixeles" separados por coma (,).
 * ej: square_md:300x300,square_s:150x150
 * @param props.filterQuality - Calidad de la imagen
 * @return Presets, formatos y thumborParams para construir nuevas urls
 */
export const createResizedParams = ({
  url,
  presets,
  arcSite,
  filterQuality,
  format,
}: CreateResizedParamsProps): ResizedUrls => {
  if (typeof window === 'undefined' && url) {
    const { resizerUrl } = getProperties(arcSite)
    return createResizer(
      resizerSecret,
      resizerUrl,
      filterQuality
    ).getResizerParams(url, presets, format)
  }
  return {}
}

export const resizeImage = (
  image: Pick<Basic, 'type' | 'url'>,
  presets: InlinePresets | undefined,
  resizer: CreateResizerFunctions
): ResizedUrls | never => {
  if ((image.type && image.type !== 'image') || !image.url) {
    throw new Error('Not a valid image object')
  }

  return resizer.getResizerParams(image.url, presets)
}

const resizePromoImage = (
  promoImage: Basic,
  presets: InlinePresets | undefined,
  resizer: CreateResizerFunctions
) => {
  const output: Basic = promoImage
  const { type, url } = promoImage
  if (type && url) {
    output.resized_urls = resizeImage({ type, url }, presets, resizer)
  }

  return output
}

type GetResizedImageParamsOpts = {
  resizerSecret: string
  resizerUrl: string
  presets?: InlinePresets
}

export const getResizedImageParams = (
  data: Story | Stories,
  option: GetResizedImageParamsOpts,
  filterQuality: number
): typeof data => {
  if (!option.resizerSecret || !option.resizerUrl) {
    throw new Error('Resizer URL and secret are required.')
  }

  const resizer = createResizer(
    option.resizerSecret,
    option.resizerUrl,
    filterQuality
  )

  const generateParams = (sourceData: PromoItems) => {
    if (sourceData?.basic) {
      sourceData.basic = resizePromoImage(
        sourceData.basic,
        option.presets,
        resizer
      )
    }
    if (sourceData?.basic_video?.promo_items?.basic) {
      sourceData.basic_video.promo_items.basic = resizePromoImage(
        sourceData.basic_video.promo_items.basic,
        option.presets,
        resizer
      )
    }
    if (sourceData?.basic_gallery?.promo_items?.basic) {
      sourceData.basic_gallery.promo_items.basic = resizePromoImage(
        sourceData.basic_gallery.promo_items.basic,
        option.presets,
        resizer
      )
    }
    if (sourceData?.basic_jwplayer?.embed?.config?.thumbnail_url) {
      const resizedUrls = resizer.getResizerParams(
        sourceData.basic_jwplayer.embed.config.thumbnail_url,
        option.presets
      )
      sourceData.basic_jwplayer.embed.config.resized_urls = resizedUrls
    }
    return sourceData
  }

  if ('canonical_url' in data || 'website_url' in data) {
    generateParams(data?.promo_items)
  } else if (
    data?.content_elements &&
    ((data?.count && data?.count > 0) || data?.type !== 'story')
  ) {
    data?.content_elements.forEach((contentElement) => {
      generateParams(contentElement?.promo_items)
    })
  }

  return data
}

/**
 * Recorre toda la historia o conjunto de historias
 * agregando el objeto resized_urls a cada promo_items con
 * las imagenes escaladas a los tamanos definidos como presets.
 *
 * @param data Historia o conjunto de historias
 * @param presets - Cadena de "preset:pixeles" separados por coma (,).
 * ej: square_md:300x300,square_s:150x150
 * @param arcSite Sitio web
 * @param filterQuality Calidad de la imagen.
 * @return `data` ingresada con resized_urls en promo_items
 */
export const getResizedImageData = (
  data: Story | Stories,
  // TODO: poner arcSite primero y luego presets.
  presets: InlinePresets | undefined,
  arcSite: ArcSite,
  filterQuality = 75
): typeof data => {
  if (typeof window !== 'undefined' || presets === 'no-presets') return data

  const resizerKey = resizerSecret
  const { resizerUrl } = getProperties(arcSite)
  const transformedData = getResizedImageParams(
    data,
    {
      resizerSecret: resizerKey,
      resizerUrl,
      presets,
    },
    filterQuality
  )
  return transformedData
}
