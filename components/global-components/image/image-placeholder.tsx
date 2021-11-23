/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react'
import { ArcSite, OutputType } from 'types/fusion'
import { InlinePresets } from 'types/resizer'

import { defaultImage } from '../../utilities/assets'
import { createResizedParams } from '../../utilities/resizer/resizer'
import { buildPresets, MediaSizeObject } from './utils'

const ImagePlaceHolder = ({
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
  pictureStyle = {},
}: any) => {
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

  const resizedImages = movilImage ? resizedImagesMovile : resizedImagesDefault

  const srcSet = sizes
    .map((size: any) => {
      const { width: sourceWidth, height: sourceHeight, media } = size
      const sourceImage =
        resizedImages?.[`${sourceWidth}x${sourceHeight}`] || placeholder
      return `${sourceImage} ${sourceWidth}w`
    })
    .join(',')

  const imgSizes = sizes
    .map((size: any) => {
      const { width: sourceWidth, media } = size
      return `${media} ${sourceWidth}w`
    })
    .join(',')

  return (
    <>
      <div
        style={{
          filter: 'blur(10px)',
          transition: 'filter .1s',
          width: '100%',
          height: 'auto',
        }}
        className="placeholder-container-img">
        <img
          className="placeholder-img"
          srcSet={srcSet}
          sizes={imgSizes}
          width={width}
          height={height}
          alt={alt}
          decoding="async"
          style={{
            // loading blurred svg of the image as its background image
            // (i.e. placeholder since the SVG will load first to improve LCP scores
            // as described here: https://www.industrialempathy.com/posts/image-optimizations/#blurry-placeholder
            backgroundSize: 'cover',
            maxWidth: '1600px',
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 10 6'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='.5'%3E%3C/feGaussianBlur%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'%3E%3C/feFuncA%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Cimage filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAA70lEQVR4AQXBTUvCcADA4Z/7z9xcmbEpdSg6CBYGRUcr6WJvUESfqHN07Jt47hBdBV/AFg2FYTGd2DZzmJiz54ndnpUX51cldvcvSWoqufwGcVlgmlX01CpLmsbD4xMiZ2zeS8MQNRgQX1Gweg6/owGvLxUyxjq2+4VtO8haPIGKxKfdxfpzmUgKruMSxX4QiqDfs2i1A+RwMmM+hsr4nbSvcnNaZHnqE8yTNDpvROGU7FYSueX3MUcuqbUExYsd9jICY66yyOrUm22aHY/vmYec304jRIRuaJROjmg8V/G8IXflawoHhxx/1KjVu/wDycJbrJ7yuz0AAAAASUVORK5CYII='%3E%3C/image%3E%3C/svg%3E\")",
            width: '100%',
            height: 'auto',
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.addEventListener(
                "load",
                (e) => {
                  if (e.target.tagName != "IMG") {
                    return;
                  }
                  try {
                    if (!e.target.classList.contains('placeholder-img')) return;
                    // Remove the blurry placeholder.
                    e.target.parentNode.style.filter = 'blur(0)';
                  } catch(err) {
                    console.log(err)
                  }
                },
                /* capture */ true
              );
            `,
          }}
        />
      </div>
    </>
  )
}

export default React.memo(ImagePlaceHolder)
