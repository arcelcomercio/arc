import { useAppContext } from 'fusion:context'
import Static from 'fusion:static'
import * as React from 'react'
import { InlinePresets } from 'types/resizer'

import ClientImage from './client-image'
import Image from './image'
import ImagePlaceholder from './image-placeholder'
import { validateSizes } from './utils'

type ArcImageProps = {
  /** URL de la imagen */
  src: string
  /** Texto alternativo descriptivo de la imagen */
  alt: string
  children?: React.ReactNode
  /** ID único para el elemento cuando es Static  */
  uid?: string | number
  /** Ancho de la imagen */
  width: number
  /** Alto de la imagen */
  height: number
  /** [Forma de carga de la imagen](https://web.dev/native-lazy-loading/) */
  loading?: 'lazy' | 'eager' | 'auto'
  /** Imagen que se muestra cuando la imagen principal no está disponible */
  placeholder?: string
  /** @example `(max-width: 360px) 320px, 640px` */
  sizes?: string
  /** Arreglo numérico donde cada valor representa el `height` del media breakpoint correspondiente en `sizes` */
  sizesHeight?: number[]
  /** Atributo de AMP */
  layout?:
    | 'responsive'
    | 'intrinsic'
    | 'fixed'
    | 'fill'
    | 'fixed-height'
    | 'flex-item'
    | 'nodisplay'
    | 'container'
  /** Título de la imagen */
  title?: string
  /** Estilos inline de la imagen */
  style?: React.CSSProperties
  /** Clases de la imagen */
  className?: string
  /** Clases del elemento picture que contiene la imagen */
  pictureClassName?: string
  /** ID único del elemento */
  id?: string
  /** Tipo de imagen */
  type?: string
  /** [Priority hint for browsers](https://developers.google.com/web/updates/2019/02/priority-hints) */
  importance?: 'low' | 'medium' | 'high'
  /** Related to Structured Data */
  itemProp?: string
  /** 1 to 100. Default 75 */
  quality?: number
  /** Define si se hace resize en cliente o servidor */
  clientResize?: boolean
  /** Define si se movilImage */
  movilImage?: string
  /** Define si se defaultImg */
  defaultImg?: InlinePresets
  /** Estilos inline de la etiqueta picture */
  pictureStyle?: React.CSSProperties
}

/** @returns Static resized `<img/>`, `<picture/>` or `<amp-img/>` */
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
  pictureStyle = {},
}) => {
  const { arcSite, contextPath, outputType, isAdmin } = useAppContext()
  const isTestLCP = true
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
          pictureStyle={pictureStyle}
        />
      </Static>
    )
  }

  if (isTestLCP) {
    return (
      <Static id={staticId}>
        <ImagePlaceholder
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
          pictureStyle={pictureStyle}
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
      pictureStyle={pictureStyle}
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
        pictureStyle={pictureStyle}
      />
    </Static>
  )
}

export default ArcImage
