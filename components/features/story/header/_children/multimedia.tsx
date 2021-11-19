import * as React from 'react'
import { FC } from 'types/features'

import Image from '../../../../global-components/image'

const classes = {
  container: 'story-header-multimedia',
  image: 'story-header-multimedia__image',
  caption: 'story-header-multimedia__caption',
  text: 'story-header-multimedia__text',
  credit: 'story-header-multimedia__credit',
}
const StoryHeaderChildMultimedia: FC = ({
  src = '',
  alt = '',
  caption = '',
  credit = '',
  width,
  height,
  mobileWidth = '343',
  mobileHeight = '193',
}) => (
  <div className={classes.container}>
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      sizes={`(max-width: 480px) ${mobileWidth}px, ${width}px`}
      sizesHeight={[mobileHeight]}
      className={classes.image}
      loading="lazy"
    />
    {caption && (
      <figcaption className={classes.caption}>
        <span className={classes.caption}>{caption}</span>
        {credit && <span className={classes.credit}> / {credit}</span>}
      </figcaption>
    )}
  </div>
)

export default StoryHeaderChildMultimedia
