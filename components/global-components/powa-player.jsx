import React from 'react'
import Static from 'fusion:static'
import { ENVIRONMENT } from 'fusion:environment'
import { useAppContext } from 'fusion:context'
import { createResizedParams } from '../utilities/resizer/resizer'

const styles = {
  powa: {
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

const PowaPlayer = ({
  uuid,
  className,
  stream,
  preload,
  autoplay,
  sticky,
  preroll,
  time = '-1',
  ratio,
  image,
  lazy,
  alt = '',
  presets: customPresets = '',
}) => {
  const { arcSite } = useAppContext()
  // presets con aspect-ratio: 16/9
  const presets =
    customPresets.includes('mobile:') && customPresets.includes('desktop:')
      ? customPresets
      : 'mobile:426x240,desktop:560x315'

  const { mobile, desktop } =
    createResizedParams({
      url: image,
      presets,
      arcSite,
    }) || {}

  const env = ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
  const classes = `${className || ''} ${lazy ? 'powa-lazy' : 'powa'}`
  return (
    <Static id={uuid}>
      <div
        className={classes}
        id={`powa-${uuid}`}
        data-org="elcomercio"
        data-env={env}
        data-stream={stream}
        data-uuid={uuid}
        data-aspect-ratio={ratio || '0.562'}
        data-api={env}
        data-preload={preload || 'none'}
        data-sticky={sticky || 'false'}
        data-autoplay={autoplay || 'false'}
        data-preroll={preroll}
        data-time={time}
        style={styles.powa}>
        {lazy ? (
          <picture>
            <source data-srcset={mobile} media="(max-width: 480px)" />
            <img
              data-src={desktop}
              alt={alt}
              className="lazy"
              style={styles.image}
            />
          </picture>
        ) : (
          <picture>
            <source srcSet={mobile} media="(max-width: 480px)" />
            <img
              src={desktop}
              alt={alt}
              loading="eager"
              style={styles.image}
              importance="high"
            />
          </picture>
        )}
      </div>
    </Static>
  )
}

export default React.memo(PowaPlayer)
