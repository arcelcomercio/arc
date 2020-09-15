import React from 'react'
import Static from 'fusion:static'

const styles = {
  container: {
    width: '100%',
    height: 0,
    paddingBottom: '56.2%',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  image: {
    position: 'abslute',
    objectFit: 'contain',
    width: '100%',
    height: 'auto',
  },
}

const LiteYoutube = ({ videoId, className, preload, lazy, alt = '' }) => {
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
      <div
        id={`lyt-${videoId}`}
        className={className || ''}
        data-preload={preload || 'none'}
        style={styles.container}>
        {lazy ? (
          <picture>
            <source data-srcset={posterUrlWebp} type="image/webp" />
            <img
              data-src={posterUrlJpeg}
              alt={alt}
              className="lazy"
              style={styles.image}
              type="image/jpeg"
            />
          </picture>
        ) : (
          <picture>
            <source srcSet={posterUrlWebp} type="image/webp" />
            <img
              src={posterUrlJpeg}
              alt={alt}
              loading="eager"
              style={styles.image}
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
