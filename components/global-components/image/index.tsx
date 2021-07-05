import { useAppContext } from 'fusion:context'
import Static from 'fusion:static'
import * as React from 'react'
import { InlinePresets } from 'types/resizer'

import ClientImage from './client-image'
import Image from './image'
import { validateSizes } from './utils'

type ArcImageProps = {
  src: string
  alt: string
  children?: React.ReactNode
  uid?: string | number
  width: number
  height: number
  loading?: 'lazy' | 'eager' | 'auto'
  placeholder?: string
  sizes?: string
  sizesHeight?: number[]
  layout?:
    | 'responsive'
    | 'intrinsic'
    | 'fixed'
    | 'fill'
    | 'fixed-height'
    | 'flex-item'
    | 'nodisplay'
    | 'container'
  title?: string
  style?: React.CSSProperties
  className?: string
  pictureClassName?: string
  id?: string
  type?: string
  importance?: 'low' | 'medium' | 'high'
  itemProp?: string
  quality?: number
  clientResize?: boolean
  movilImage?: string
  defaultImg?: InlinePresets
}

/**
 *
 * @param src URL de la imagen
 * @param alt Texto alternativo descriptivo de la imagen
 * @param children
 * @param uid ID único para el elemento cuando es Static
 * @param width Ancho de la imagen
 * @param height Alto de la imagen
 * @param loading [Forma de carga de la imagen](https://web.dev/native-lazy-loading/)
 * @param placeholder Imagen que se muestra cuando la imagen principal no está disponible
 * @param sizes Ej. `(max-width: 360px) 320px, 640px`
 * @param sizesHeight - Arreglo numérico donde cada valor
 * representa el `height` del media breakpoint correspondiente en `sizes`.
 * @param layout - Atributo de AMP
 * "responsive" | "intrinsic" | "fixed" | "fill" | "fixed_height" | "flex_item" | "nodisplay"
 * @param title Título de la imagen
 * @param style Estilos inline de la imagen
 * @param className Clases de la imagen
 * @param pictureClassName Clases del elemento picture que contiene la imagen
 * @param id ID único del elemento
 * @param type Tipo de imagen
 * @param importance Priority hint for browsers
 * @param itemProp Related to Structured Data
 * @param quality 1 to 100. Default 75
 * @param clientResize - Define si se hace resize en cliente o servidor
 * @param movilImage - Define si se movilImage
 * @param defaultImg - Define si se defaultImg
 * content source o solo en server
 *
 * @returns Static resized `<img/>` o `<picture/>`
 *
 * @see loading https://web.dev/native-lazy-loading/
 * @see importance https://developers.google.com/web/updates/2019/02/priority-hints
 */
const ArcImage: React.FC<ArcImageProps> = ({
  children,
  id,
  uid,
  src,
  loading,
  quality,
  placeholder,
  sizes,
  sizesHeight,
  layout,
  importance,
  itemProp,
  type,
  title,
  alt,
  pictureClassName,
  style = {},
  className = '',
  width = 640,
  height = 360,
  clientResize = false,
  movilImage = '',
  defaultImg = {},
}) => {
  const { arcSite, contextPath, outputType, isAdmin } = useAppContext()
  /**
   * `src` puede fallar como id, si hay un comportamiento
   * inesperado renderizando la imagen, puedes probar
   * agregando un `uid` (unique id)
   */
  const idSuffix = `${src || alt}`
  const staticId = `image:${width}x${height}:${uid || ''}:${idSuffix.substring(
    idSuffix.length - 30,
    idSuffix.length
  )}`
  const validSizes = validateSizes({ sizes, sizesHeight, width, height })

  if (outputType === 'amp') {
    return (
      <Static id={`amp-${staticId}`}>
        <Image
          src={src}
          width={width}
          height={height}
          outputType={outputType}
          sizes={validSizes}
          arcSite={arcSite}
          contextPath={contextPath}
          alt={alt}
          className={className}
          layout={layout}
          movilImage={movilImage}
          defaultImg={defaultImg}
        />
      </Static>
    )
  }

  return isAdmin || clientResize ? (
    <ClientImage
      id={id}
      src={src}
      loading={loading}
      quality={quality}
      type={type}
      itemProp={itemProp}
      placeholder={placeholder}
      sizes={validSizes}
      title={title}
      alt={alt}
      style={style}
      className={className}
      pictureClassName={pictureClassName}
      importance={importance}
      width={width}
      height={height}
      arcSite={arcSite}
      contextPath={contextPath}
      outputType={outputType}
      icon={children}
      isAdmin={isAdmin}
      movilImage={movilImage}
    />
  ) : (
    <Static id={staticId}>
      <Image
        id={id}
        src={src}
        loading={loading}
        quality={quality}
        type={type}
        itemProp={itemProp}
        placeholder={placeholder}
        sizes={validSizes}
        title={title}
        alt={alt}
        style={style}
        className={className}
        pictureClassName={pictureClassName}
        importance={importance}
        width={width}
        height={height}
        arcSite={arcSite}
        contextPath={contextPath}
        outputType={outputType}
        icon={children}
        movilImage={movilImage}
        defaultImg={defaultImg}
      />
    </Static>
  )
}

export default ArcImage
