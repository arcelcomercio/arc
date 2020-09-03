import React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'
import { defaultImage } from '../utilities/assets'
import { createResizedParams } from '../utilities/resizer/resizer'

/**
 *
 * @param {object} config
 * @param {string|number} [config.id]
 * @param {string} config.src
 * @param {string} [config.dataSrc]
 * @param {string} config.alt
 * @param {string} [config.loading]
 * @param {string} [config.filterQuality]
 * @param {string} [config.itemProp]
 * @param {string} [config.title]
 * @param {object} [config.style]
 * @param {string} [config.type]
 * @param {string} [config.importance]
 * @param {number} [config.width=640]
 * @param {number} [config.height=360]
 *
 * @returns {HTMLImageElement} Static resized <img/>
 */
const Img = ({
  id,
  src,
  dataSrc,
  loading,
  filterQuality,
  type,
  itemProp,
  title,
  alt = '',
  style = {},
  className = '',
  importance,
  width = 640,
  height = 360,
}) => {
  /**
   * Se espera el atributo `loading` para simular los
   * estandares actuales, asi el codigo esta preparado
   * para cuando este estandar sea mayormente aceptado.
   * @see https://web.dev/native-lazy-loading/
   */
  const lazy = loading === 'lazy'
  const presets = { image: { width, height } }
  const { arcSite, contextPath } = useAppContext()

  /**
   * Si tiene lazy activado acepta la imagen por
   * `dataSrc` o `src`, este ultimo caso para alinearse
   * a los estandares actuales.
   */
  const { image } = createResizedParams({
    url: lazy ? dataSrc || src : src,
    presets,
    arcSite,
    filterQuality,
  })
  /**
   * Acepta una imagen por defecto personalizada
   * como `src` si la imagen es lazy y se recibe
   * tambien el parametro `dataSrc`.
   */
  const placeholder =
    lazy && dataSrc && src ? src : defaultImage({ contextPath, arcSite })

  /**
   * srcSet puede fallar como id si el valor de ese
   * parametro no viene de globalContent, sino de
   * un fetch en el propio feature. VALIDAR
   */
  return (
    <Static id={`image:${width}x${height}${id || dataSrc || src || alt}`}>
      <img
        src={lazy ? placeholder : image}
        data-src={lazy ? image : null}
        alt={alt}
        // width={width}
        // height={height}
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

export default Img
