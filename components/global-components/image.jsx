import React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'
import { defaultImage } from '../utilities/assets'
import { createResizedParams } from '../utilities/resizer/resizer'

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
 * @param {string} [config.title]
 * @param {object} [config.style]
 * @param {string} [config.id]
 * @param {string} [config.type]
 * @param {string} [config.importance] Priority hint for browsers
 * @param {string} [config.itemProp] Related to Structured Data
 * @param {string} [config.filterQuality]
 *
 * @returns {HTMLImageElement} Static resized <img/>
 *
 * @see loading https://web.dev/native-lazy-loading/
 * @see importance https://developers.google.com/web/updates/2019/02/priority-hints
 */
const Image = ({
  id,
  uid,
  src,
  loading,
  filterQuality,
  type,
  itemProp,
  title,
  placeholder: customPlaceholder,
  alt = '',
  style = {},
  className = '',
  importance,
  width = 640,
  height = 360,
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
    filterQuality,
  })

  /**
   * `src` puede fallar como id, si hay un comportamiento
   * inesperado renderizando la imagen, puedes probar
   * agregando un `uid` (unique id)
   */
  const idSuffix = uid || src || alt
  return (
    <Static
      id={`image:${width}x${height}${idSuffix.substring(
        idSuffix.length - 30,
        idSuffix.length
      )}`}>
      <img
        src={lazy ? placeholder : resizedImage}
        data-src={lazy ? resizedImage : null}
        alt={alt}
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
    </Static>
  )
}

export default Image
