import * as React from 'react'
import { ArcSite, OutputType } from 'types/fusion'
import { InlinePresets } from 'types/resizer'

import { defaultImage } from '../../utilities/assets'
import { createResizedParams } from '../../utilities/resizer/resizer'
import { buildPresets, MediaSizeObject } from './utils'

type CustomImageProps = {
  src: string
  alt: string
  width: number
  height: number
  loading?: 'lazy' | 'eager' | 'auto'
  placeholder?: string
  sizes?: MediaSizeObject[]
  title?: string
  style?: React.CSSProperties
  id?: string
  type?: string
  importance?: 'low' | 'medium' | 'high'
  layout?:
    | 'responsive'
    | 'intrinsic'
    | 'fixed'
    | 'fill'
    | 'fixed-height'
    | 'flex-item'
    | 'nodisplay'
    | 'container'
  itemProp?: string
  quality?: number
  className?: string
  pictureClassName?: string
  clientResize?: boolean
  arcSite: ArcSite
  contextPath: string
  outputType: OutputType
  icon?: React.ReactNode
  movilImage?: string
  defaultImg?: InlinePresets
}

const CustomImage: React.FC<CustomImageProps> = ({
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
  movilImage,
  defaultImg,
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
    sizes && sizes.length >= 1
      ? { ...buildPresets(sizes), ...mainImagePreset }
      : mainImagePreset

  const resizedImagesDefault = createResizedParams({
    url: src,
    presets,
    arcSite,
    filterQuality: quality,
  })
  const mainImage = resizedImagesDefault[`${width}x${height}`] || placeholder
  const resizedImagesMovile = movilImage
    ? createResizedParams({
        url: movilImage,
        presets,
        arcSite,
        filterQuality: quality,
      })
    : null

  const placeholderImg =
    lazy && defaultImg
      ? createResizedParams({
          url: src,
          presets: defaultImg,
          arcSite,
          filterQuality: quality,
        })
      : null

  const mainImageplaceholder = placeholderImg?.placeholder || placeholder

  const resizedImages = movilImage ? resizedImagesMovile : resizedImagesDefault

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
      src={lazy ? mainImageplaceholder : mainImage}
      data-src={lazy ? mainImage : null}
      alt={alt}
      decoding={lazy ? 'async' : 'auto'}
      // width={width}
      // height={height}
      id={id}
      className={`${lazy ? 'lazy' : ''} ${className}`}
      style={style}
      itemProp={itemProp}
      title={title}
      importance={importance}
    />
  )

  return sizes && sizes.length >= 1 ? (
    <picture className={pictureClassName}>
      {sizes.map((size) => {
        const { width: sourceWidth, height: sourceHeight, media } = size
        const sourceImage =
          resizedImages?.[`${sourceWidth}x${sourceHeight}`] ||
          mainImageplaceholder
        const key = `source:${sourceWidth}x${sourceHeight}${sourceImage.substring(
          sourceImage.length - 30,
          sourceImage.length
        )}`
        return (
          <source
            key={key}
            srcSet={lazy ? undefined : sourceImage}
            data-srcset={lazy ? sourceImage : undefined}
            media={media}
            type={type}
            className={lazy ? 'lazy' : undefined}
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
