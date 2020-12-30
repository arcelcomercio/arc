import * as React from 'react'
import { useAppContext } from 'fusion:context'

import { defaultImage } from '../../utilities/assets'
import { createResizedParams } from '../../utilities/resizer/resizer'
import { buildPresets } from './utils'

/**
 *
 * @param {object} config
 * @param {string} config.sizes
 * @param {string} config.srcset
 * @param {string} [config.loading] "lazy" | "eager" | "auto"
 * @param {number} [config.quality] 1 to 100. Default 75
 * @param {string} [config.type]
 * @param {string} [config.placeholder]
 *
 * @returns {HTMLSourceElement[]} List of <source/> elements
 *
 * @see loading https://web.dev/native-lazy-loading/
 */
const Sources = ({
  sizes,
  srcset,
  loading,
  quality,
  type,
  placeholder: customPlaceholder,
}) => {
  const { arcSite, contextPath } = useAppContext()
  /**
   * Se espera el atributo `loading` para simular los
   * estandares actuales, asi el codigo esta preparado
   * para cuando este estandar sea mayormente aceptado.
   * @see https://web.dev/native-lazy-loading/
   */
  const lazy = loading === 'lazy'
  const presets = buildPresets(sizes)
  const placeholder =
    customPlaceholder || defaultImage({ contextPath, arcSite })
  const resizedImages =
    createResizedParams({
      url: srcset,
      presets,
      arcSite,
      filterQuality: quality,
    }) || {}

  return (
    <>
      {sizes.map(size => {
        const { width, height, media } = size
        const image = resizedImages[`${width}x${height}`] || placeholder
        return (
          <source
            srcSet={lazy ? null : image}
            data-srcset={lazy ? image : null}
            media={media}
            type={type}
            className={lazy ? 'lazy' : null}
          />
        )
      })}
    </>
  )
}

export default Sources
