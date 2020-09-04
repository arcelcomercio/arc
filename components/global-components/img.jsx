import React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'
import { defaultImage } from '../utilities/assets'
import { createResizedParams } from '../utilities/resizer/resizer'

/**
 *
 * @param {object} config
 * @param {string} [config.id]
 * @param {string|number} [config.uid] Static ID
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
 *
 * @see loading https://web.dev/native-lazy-loading/
 * @see importance https://developers.google.com/web/updates/2019/02/priority-hints
 */
const Img = ({
  id,
  uid,
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
   * Acepta una imagen por defecto personalizada
   * como `src` si la imagen es lazy y se recibe
   * tambien el parametro `dataSrc`.
   */
  const placeholder =
    lazy && dataSrc && src ? src : defaultImage({ contextPath, arcSite })

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
   * srcSet puede fallar como id si el valor de ese
   * parametro no viene de globalContent, sino de
   * un fetch en el propio feature. VALIDAR
   */
  const idSuffix = uid || dataSrc || src || alt
  return (
    <Static
      id={`image:${width}x${height}${idSuffix.substring(
        idSuffix.length - 30,
        idSuffix.length
      )}`}>
      <img
        src={lazy ? placeholder : image}
        data-src={lazy ? image : null}
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

export default Img
