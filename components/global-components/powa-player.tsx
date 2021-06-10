import { useAppContext } from 'fusion:context'
import { ENVIRONMENT } from 'fusion:environment'
import Static from 'fusion:static'
import React from 'react'
import { FC } from 'types/features'
import { Streams } from 'types/story'

import { createResizedParams } from '../utilities/resizer/resizer'

const styles = {
  powas: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    objectFit: 'contain',
  },
  powa: {
    width: '100%',
    height: 0,
    paddingBottom: '56.2%',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
}

interface FeatureProps {
  uuid?: string
  className?: string
  preload?: string
  autoplay?: string
  sticky?: string
  stream?: string
  preroll?: string
  time?: string
  ratio?: string
  id?: string
  image?: string
  lazy?: string
  description?: string
  presets?: string
}

const PowaPlayer: FC<FeatureProps> = ({
  uuid,
  className,
  stream,
  preload,
  autoplay,
  sticky,
  preroll,
  time = '-1',
  ratio,
  image = '',
  lazy = false,
  description,
  presets: customPresets = '',
}) => {
  const { arcSite } = useAppContext()
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
              alt={description}
              className="lazy"
              style={{
                width: '100%',
                height: 'auto',
                position: 'absolute',
                objectFit: 'contain',
              }}
            />
          </picture>
        ) : (
          <picture>
            <source srcSet={mobile} media="(max-width: 480px)" />
            <img
              src={desktop}
              alt={description}
              loading="eager"
              style={{
                width: '100%',
                height: 'auto',
                position: 'absolute',
                objectFit: 'contain',
              }}
              importance="high"
            />
          </picture>
        )}
      </div>
    </Static>
  )
}

export default React.memo(PowaPlayer)
