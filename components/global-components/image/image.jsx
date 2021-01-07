import * as React from 'react'

import { defaultImage } from '../../utilities/assets'
import { createResizedParams } from '../../utilities/resizer/resizer'
import { buildPresets } from './utils'

/**
 *
 * @param {object} config
 * @param {string} config.src
 * @param {string} config.alt
 * @param {number} [config.width=640]
 * @param {number} [config.height=360]
 * @param {MediaSizeObject[]} [config.sizes]
 * @param {string} [config.loading] "lazy" | "eager" | "auto"
 * @param {string} [config.placeholder]
 * @param {string} [config.title]
 * @param {object} [config.style]
 * @param {string} [config.id]
 * @param {string} [config.type]
 * @param {string} [config.importance] Priority hint for browsers
 * @param {string} [config.layout] - Atributo de AMP
 * "responsive" | "intrinsic" | "fixed" | "fill" | "fixed_height" | "flex_item" | "nodisplay"
 * @param {string} [config.itemProp] Related to Structured Data
 * @param {number} [config.quality] 1 to 100. Default 75
 * @param {string} config.arcSite
 * @param {string} config.contextPath
 * @param {string} config.outputType
 * @param {JSX.Element} [config.icon]
 *
 * @returns {HTMLImageElement | HTMLPictureElement} Static resized `<img/>` o `<picture/>`
 *
 * @see loading https://web.dev/native-lazy-loading/
 * @see importance https://developers.google.com/web/updates/2019/02/priority-hints
 */
const CustomImage = ({
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
  pictureClassName,
  importance,
  layout,
  width,
  height,
  sizes,
  arcSite,
  contextPath,
  outputType,
  icon,
}) => {
  /**
   * Se espera el atributo `loading` para simular los
   * estandares actuales, asi el codigo esta preparado
   * para cuando este estandar sea mayormente aceptado.
   * @see https://web.dev/native-lazy-loading/
   */
  const lazy = loading === 'lazy'
  const placeholder =
    customPlaceholder || defaultImage({ contextPath, arcSite })

  const mainImagePreset = { [`${width}x${height}`]: { width, height } }
  /**
   * Construye el objeto `presets` dependiendo de
   * si hay o no `sizes`.
   */
  const presets =
    sizes.length >= 1
      ? { ...buildPresets(sizes), ...mainImagePreset }
      : mainImagePreset

  const resizedImages = createResizedParams({
    url: src,
    presets,
    arcSite,
    filterQuality: quality,
  })

  const mainImage = resizedImages[`${width}x${height}`] || placeholder

  if (outputType === 'amp') {
    return (
      <amp-img
        src={mainImage}
        width={width}
        height={height}
        alt={alt}
        class={className}
        layout={layout}
      />
    )
  }

  const Image = () => (
    <img
      src={lazy ? placeholder : mainImage}
      data-src={lazy ? mainImage : null}
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

  return sizes.length >= 1 ? (
    <picture className={pictureClassName}>
      {sizes.map(size => {
        const { width: sourceWidth, height: sourceHeight, media } = size
        const sourceImage =
          resizedImages[`${sourceWidth}x${sourceHeight}`] || placeholder
        const key = `source:${sourceWidth}x${sourceHeight}${sourceImage.substring(
          sourceImage.length - 30,
          sourceImage.length
        )}`
        return (
          <source
            key={key}
            srcSet={lazy ? null : sourceImage}
            data-srcset={lazy ? sourceImage : null}
            media={media}
            type={type}
            className={lazy ? 'lazy' : null}
          />
        )
      })}
      <Image />
      {icon || null}
    </picture>
  ) : (
    <>
      <Image />
      {icon || null}
    </>
  )
}

export default React.memo(CustomImage)
