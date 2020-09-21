import React from 'react'
import Static from 'fusion:static'

const LiteYoutube = ({ videoId, className, lazy, alt = '' }) => {
  const posterUrlWebp = `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`
  const posterUrlJpeg = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  /**
   * En este caso es mucho mas provechoso traer la imagen .webp
   * para los navegadores que lo acepten, que el proceso de
   * resizing.
   * Si en algun momento se quiere aplicar resizer, mirar la
   * forma en la que se aplica en ./powa-player.jsx
   */
  return (
    <Static id={`lyt-${videoId}`}>
      <div id={`lyt-${videoId}`} className={`lyt-container ${className || ''}`}>
        {lazy ? (
          <picture className="lyt-pic">
            <source data-srcset={posterUrlWebp} type="image/webp" />
            <img
              data-src={posterUrlJpeg}
              alt={alt}
              className="lyt-img lyt-lazy"
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
    </Static>
  )
}

export default React.memo(LiteYoutube)
