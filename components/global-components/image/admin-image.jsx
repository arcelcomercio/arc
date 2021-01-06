import * as React from 'react'
import { useContent } from 'fusion:content'

import { defaultImage } from '../../utilities/assets'
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
 * @param {string} arcSite
 * @param {string} contextPath
 * @param {string} outputType
 *
 * @returns {HTMLImageElement | HTMLPictureElement} Resized `<img/>` o `<picture/>`
 *
 * @see loading https://web.dev/native-lazy-loading/
 * @see importance https://developers.google.com/web/updates/2019/02/priority-hints
 */
const AdminImage = ({
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
}) => {
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

  /**
   * Menor calidad en las imagenes del Admin para
   * mejorar velocidad de trabajo
   */
  const { resized_urls: resizedImages = {} } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: src,
        presets,
        quality: quality || 65,
      },
    }) || {}

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
      src={mainImage}
      alt={alt}
      decoding="async"
      // width={width}
      // height={height}
      id={id}
      className={className}
      loading={loading}
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
          <source key={key} srcSet={sourceImage} media={media} type={type} />
        )
      })}
      <Image />
    </picture>
  ) : (
    <Image />
  )
}

export default React.memo(AdminImage)
