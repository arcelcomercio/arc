import React from 'react'
// import Static from 'fusion:static'

/**
 * Este componente no puede vivir solo, esta dividido en dos partes.
 * Esta primera parte solo renderiza el contenedor y la imagen previa 
 * del video para mejorar drasticamente el LCP y scripting.
 * 
 * Los estilos y la funcionalidad estan en:
 * /resources/assets/lite-youtube/
 * y se implementan en los output-types default y lite.
 * 
 * @param {object} config 
 * @param {string} config.videoId ID del video de Youtube, lo encuentas en su URL
 * @param {string} [config.className] Clases personalizadas para el contenedor
 * @param {string} [config.loading] "lazy" | "eager" | "auto"
 * @param {boolean} [config.autoload] Solo cuando loading='lazy'. Si es true, renderiza el iframe completo. Si es false, renderiza solo el contenedor y la vista previa del video.
 * @param {string} [config.alt] Texto alternativo para la imagen por defecto
 * 
 * @example ```
 * <LiteYoutube videoId="8RvAKRoIDqU" lazy alt={title} />
 * ```
 * 
 * @see https://github.com/paulirish/lite-youtube-embed
 */

const LiteYoutube = ({ videoId, className, loading, autoload, alt = '' }) => {
  const posterUrlWebp = `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`
  const posterUrlJpeg = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const lazy = loading === 'lazy'
  /**
   * En este caso es mucho mas provechoso traer la imagen .webp
   * para los navegadores que lo acepten, que el proceso de
   * resizing.
   * Si en algun momento se quiere aplicar resizer, mirar la
   * forma en la que se aplica en ./powa-player.jsx y activar el
   * Static que esta comentado.
   */

  return (
    // <Static id={`lyt-${videoId}`}>
      <div 
        id={`lyt-${videoId}`} 
        className={`lyt-container ${lazy ? 'lyt-lazy' : ''} ${autoload ? 'auto' : ''} ${className || ''}`}>
        {lazy ? (
          <picture className="lyt-pic">
            <source data-srcset={posterUrlWebp} type="image/webp" />
            <img
              data-src={posterUrlJpeg}
              alt={alt}
              className="lyt-img lazy"
              type="image/jpeg"
            />
          </picture>
        ) : (
          <picture className="lyt-pic">
            <source srcSet={posterUrlWebp} type="image/webp" />
            <img
              src={posterUrlJpeg}
              alt={alt}
              loading="eager"
              className="lyt-img"
              type="image/jpeg"
              importance="high"
            />
          </picture>
        )}
        <button type="button" className="lty-playbtn"></button>
      </div>
    // </Static>
  )
}

export default React.memo(LiteYoutube)
