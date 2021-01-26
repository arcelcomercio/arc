import * as React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'

import { validateSizes } from './utils'
import Image from './image'
import ClientImage from './client-image'

/**
 *
 * @param {object} config
 * @param {string} config.src
 * @param {string} config.alt
 * @param {JSX.Element} [config.children]
 * @param {string|number} [config.uid] Static unique id
 * @param {number} [config.width=640]
 * @param {number} [config.height=360]
 * @param {string} [config.loading] "lazy" | "eager" | "auto"
 * @param {string} [config.placeholder]
 * @param {string} [config.sizes] Ej. `(max-width: 360px) 320px, 640px`
 * @param {number[]} [config.sizesHeight] - Arreglo numérico donde cada valor
 * representa el `height` del media breakpoint correspondiente en `sizes`.
 * @param {string} [config.layout] - Atributo de AMP
 * "responsive" | "intrinsic" | "fixed" | "fill" | "fixed_height" | "flex_item" | "nodisplay"
 * @param {string} [config.title]
 * @param {object} [config.style]
 * @param {string} [config.className]
 * @param {string} [config.pictureClassName]
 * @param {string} [config.id]
 * @param {string} [config.type]
 * @param {string} [config.importance] Priority hint for browsers
 * @param {string} [config.itemProp] Related to Structured Data
 * @param {number} [config.quality] 1 to 100. Default 75
 * @param {boolean} [config.clientResize=false] - Define si se hace resize por
 * content source o solo en server
 *
 * @returns {JSX.Element} Static resized `<img/>` o `<picture/>`
 *
 * @see loading https://web.dev/native-lazy-loading/
 * @see importance https://developers.google.com/web/updates/2019/02/priority-hints
 */
const ArcImage = ({
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
  style = {},
  className = '',
  pictureClassName = null,
  width = 640,
  height = 360,
  clientResize = false,
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
          alt={alt}
          class={className}
          layout={layout}
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
      />
    </Static>
  )
}

export default ArcImage
