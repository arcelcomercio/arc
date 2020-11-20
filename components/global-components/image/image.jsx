import React from 'react'
import { useAppContext } from 'fusion:context'

import { defaultImage } from '../../utilities/assets'
import { createResizedParams } from '../../utilities/resizer/resizer'

/**
 *
 * @param {object} config
 * @param {string} config.src
 * @param {string} config.alt
 * @param {number} [config.width=640]
 * @param {number} [config.height=360]
 * @param {string} [config.loading] "lazy" | "eager" | "auto"
 * @param {string} [config.placeholder]
 * @param {string} [config.title]
 * @param {object} [config.style]
 * @param {string} [config.id]
 * @param {string} [config.type]
 * @param {string} [config.importance] Priority hint for browsers
 * @param {string} [config.itemProp] Related to Structured Data
 * @param {number} [config.quality] 1 to 100. Default 75
 *
 * @returns {HTMLImageElement} Static resized <img/>
 *
 * @see loading https://web.dev/native-lazy-loading/
 * @see importance https://developers.google.com/web/updates/2019/02/priority-hints
 */
const Image = ({
  id,
  src,
  loading,
  quality,
  type,
  itemProp,
  title,
  placeholder: customPlaceholder,
  alt,
  style,
  className,
  importance,
  width,
  height,
}) => {
  const { arcSite, contextPath } = useAppContext()
  /**
   * Se espera el atributo `loading` para simular los
   * estandares actuales, asi el codigo esta preparado
   * para cuando este estandar sea mayormente aceptado.
   * @see https://web.dev/native-lazy-loading/
   */
  const lazy = loading === 'lazy'
  const presets = { image: { width, height } }
  const placeholder =
    customPlaceholder || defaultImage({ contextPath, arcSite })

  /**
   * Si tiene lazy activado acepta la imagen por
   * `dataSrc` o `src`, este ultimo caso para alinearse
   * a los estandares actuales.
   */
  const { image: resizedImage } = createResizedParams({
    url: src,
    presets,
    arcSite,
    filterQuality: quality,
  })

  return (
    <img
      src={lazy ? placeholder : resizedImage}
      data-src={lazy ? resizedImage : null}
      alt={alt}
      decoding={lazy ? 'async' : 'auto'}
      // width={width}
      // height={height}
      id={id}
      className={`${lazy ? 'lazy' : ''} ${className}`}
      style={style}
      type={type}
      itemProp={itemProp}
      title={title}
      importance={importance}
    />
  )
}

export default Image
