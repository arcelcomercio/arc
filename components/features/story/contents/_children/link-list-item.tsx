import * as React from 'react'

import Image from '../../../../global-components/image'

interface FeatureProps {
  url?: string
  title?: string
  v2?: boolean
  image?: string
  isAmp?: boolean
}

const LinkListItem: React.FC<FeatureProps> = ({
  url,
  title = '',
  v2,
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
  const width = v2 ? 637 : 96
  const height = v2 ? 300 : 64
  const Figura = () => <figure className={classes.multimedia}>
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
  return (
    <div className={classes.item}>
      {!v2 && <Figura />}
      <div className={classes.info}>
        <span className={classes.titleLink}>
          <a itemProp="url" href={url}>
            {title}
          </a>
        </span>
      </div>
      {v2 && image && <Figura />}
    </div>
  )
}

export default React.memo(LinkListItem)
