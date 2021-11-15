import { useContent } from 'fusion:content'
import * as React from 'react'
import { ArcSite, OutputType } from 'types/fusion'

import { defaultImage } from '../../utilities/assets'
import { buildPresets, MediaSizeObject } from './utils'

type ClientImageProps = {
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
  isAdmin?: boolean
  pictureStyle?: React.CSSProperties
}

const ClientImage: React.FC<ClientImageProps> = ({
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
  isAdmin = false,
  pictureStyle = {},
}) => {
  /**
   * Se espera el atributo `loading` para simular los
   * estandares actuales, asi el codigo esta preparado
   * para cuando este estandar sea mayormente aceptado.
   * @see https://web.dev/native-lazy-loading/
   *
   * Solo se habilita el lazyload de imagenes
   * fuera del admin de PageBuilder.
   */
  const lazy = loading === 'lazy' && !isAdmin
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

  /**
   * Menor calidad en las imagenes del Admin para
   * mejorar velocidad de trabajo
   */

  const { resized_urls: resizedImagesDefault = {} } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: src,
        presets,
        quality: isAdmin ? 65 : quality,
      },
    }) || {}

  const mainImage = resizedImagesDefault[`${width}x${height}`]

  const { resized_urls: resizedImagesMovile = {} } =
    useContent(
      movilImage
        ? {
            source: 'photo-resizer',
            query: {
              url: movilImage,
              presets,
              quality: isAdmin ? 65 : quality,
            },
          }
        : {}
    ) || {}

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
      src={lazy ? placeholder : mainImage}
      data-src={lazy ? mainImage : null}
      alt={alt}
      decoding={lazy || isAdmin ? 'async' : 'auto'}
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

  if (!mainImage) return null // arregla error de validación en la versión 3.0 de Fusion

  return sizes && sizes.length >= 1 ? (
    <picture className={pictureClassName} style={pictureStyle}>
      {sizes.map((size) => {
        const { width: sourceWidth, height: sourceHeight, media } = size
        const sourceImage =
          resizedImages?.[`${sourceWidth}x${sourceHeight}`] || placeholder
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

export default React.memo(ClientImage)
