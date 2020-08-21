import React from 'react'
import Static from 'fusion:static'
import { useContent } from 'fusion:content'
import { ENVIRONMENT } from 'fusion:environment'

const PowaPlayer = ({
  uuid,
  className,
  stream,
  preload,
  autoplay,
  sticky,
  preroll,
  ratio,
  image,
  alt,
  lazy,
  presets: customPresets = ''
}) => {
  // presets con aspect-ratio: 16/9
  const presets = customPresets.includes('mobile:') && customPresets.includes('desktop:') 
  ? customPresets
    : 'mobile:426x240,desktop:560x315'

  const { resized_urls: { mobile, desktop } = {} } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: image,
        presets,
      },
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
        style={{
          width: "100%",
          height: 0,
          paddingBottom: "56.2%",
          backgroundColor: "#000",
          overflow: "hidden"
        }}>
        <picture>
          <source
            srcSet={mobile}
            media="(max-width: 480px)"
          />
          <img src={desktop} alt={alt || ""} loading={lazy ? "lazy" : "eager"} style={{
            objectFit: "contain",
            width: "100%",
            height: "auto"
          }}/>
        </picture>
      </div>
    </Static>
  )
}

export default PowaPlayer
