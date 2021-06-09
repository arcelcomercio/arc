import * as React from 'react'

import Image from '../../../../global-components/image'

interface FeatureProps {
  url?: string
  title?: string
  image?: string
  isAmp?: boolean
}

const LinkListItem: React.FC<FeatureProps> = ({
  url,
  title = '',
  image = '',
  isAmp,
}) => {
  const classAmp = isAmp ? 'amp-' : ''
  const classes = {
    multimedia: `${classAmp}story-content__link-list-figure position-relative`,
    image: `${classAmp}story-content__link-list-image w-full h-full lazy`,
    item: `${classAmp}story-content__link-list-item flex flex-row mt-20`,
    info: `${classAmp}story-content__link-list-information w-full md:pr-10 pl-20`,
    titleLink: `${classAmp}story-content__link-list-title-link underline font-bold overflow-hidden`,
  }
  const width = 96
  const height = 64
  return (
    <div className={classes.item}>
      <figure className={classes.multimedia}>
        <a itemProp="url" href={url}>
          <Image
            src={image}
            width={width}
            height={height}
            alt={title}
            className={classes.image}
            loading="lazy"
          />
        </a>
      </figure>
      <div className={classes.info}>
        <span className={classes.titleLink}>
          <a itemProp="url" href={url}>
            {title}
          </a>
        </span>
      </div>
    </div>
  )
}

export default React.memo(LinkListItem)
