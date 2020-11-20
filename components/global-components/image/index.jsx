import React from 'react'
import Static from 'fusion:static'

import { validateSizes } from './utils'
import Sources from './sources'
import Image from './image'

/**
 *
 * @param {object} config
 * @param {string} config.src
 * @param {string} config.alt
 * @param {string|number} [config.uid] Static unique id
 * @param {number} [config.width=640]
 * @param {number} [config.height=360]
 * @param {string} [config.loading] "lazy" | "eager" | "auto"
 * @param {string} [config.placeholder]
 * @param {string} [config.sizes]
 * @param {string} [config.layout] "fixed" | "responsive"
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
const ArcImage = ({
  id,
  uid,
  src,
  loading,
  quality,
  placeholder,
  sizes,
  // layout,
  importance,
  itemProp,
  type,
  title,
  alt,
  style = {},
  className = '',
  width = 640,
  height = 360,
}) => {
  /**
   * `src` puede fallar como id, si hay un comportamiento
   * inesperado renderizando la imagen, puedes probar
   * agregando un `uid` (unique id)
   */
  const idSuffix = uid || src || alt
  const validSizes = validateSizes({ sizes, width, height })
  const attributes = {
    id,
    src,
    loading,
    quality,
    type,
    itemProp,
    placeholder,
    sizes,
    title,
    alt,
    style,
    className,
    importance,
    width,
    height,
  }

  return (
    <Static
      id={`image:${width}x${height}${idSuffix.substring(
        idSuffix.length - 30,
        idSuffix.length
      )}`}>
      {validSizes.length > 1 ? (
        <picture>
          <Sources
            sizes={validSizes}
            srcset={src}
            width={width}
            height={height}
            loading={loading}
            type={type}
            quality={quality}
          />
          <Image {...attributes} />
        </picture>
      ) : (
        <Image {...attributes} />
      )}
    </Static>
  )
}

export default ArcImage
