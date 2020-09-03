import React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'
import { defaultImage } from '../utilities/assets'
import { createResizedParams } from '../utilities/resizer/resizer'

/**
 *
 * @param {object} config
 * @param {string|number} [config.id]
 * @param {string} config.srcSet
 * @param {string} [config.media]
 * @param {string} [config.loading]
 * @param {string} [config.filterQuality]
 * @param {string} [config.type]
 * @param {number} [config.width=640]
 * @param {number} [config.height=360]
 *
 * @returns {HTMLSourceElement} Static resized <source/>
 */
const CustomSource = ({
  id,
  srcSet,
  media,
  loading,
  filterQuality,
  type,
  className = '',
  width = 640,
  height = 360,
}) => {
  /**
   * Se espera el atributo `loading` para mantener
   * homogeneidad con `global-components/img.jsx`.
   */
  const lazy = loading === 'lazy'
  const presets = { image: { width, height } }
  const { arcSite, contextPath } = useAppContext()

  const {
    image = defaultImage({ contextPath, arcSite }),
  } = createResizedParams({
    url: srcSet,
    presets,
    arcSite,
    filterQuality,
  })

  /**
   * srcSet puede fallar como id si el valor de ese
   * parametro no viene de globalContent, sino de
   * un fetch en el propio feature. VALIDAR
   */
  const idSuffix = id || srcSet
  return (
    <Static
      id={`source:${width}x${height}${idSuffix.substring(
        idSuffix.length - 30,
        idSuffix.length
      )}`}>
      <source
        srcSet={lazy ? null : image}
        data-srcset={lazy ? image : null}
        media={media}
        type={type}
        className={`${lazy ? 'lazy' : ''} ${className}`}
      />
    </Static>
  )
}

export default CustomSource
