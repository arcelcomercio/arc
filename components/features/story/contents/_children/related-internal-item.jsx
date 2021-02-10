import * as React from 'react'

import Image from '../../../../global-components/image'
import { IMAGE } from '../../../../utilities/constants/multimedia-types'

const classes = {
  item: 'related-internal__item flex flex-row mt-20',
  multimedia: 'related-internal__figure position-relative',
  image: 'w-full h-full object-cover',
  icon:
    'related-internal__multimedia-icon position-absolute p-5 rounded-lg title-xl',
  info: 'related-internal__information w-full md:pr-10 pl-20',
  titleLink: 'related-internal__title-link underline font-bold',
}

// Funcion extraida de helpersW
const getIcon = type => {
  switch (type) {
    case 'basic_gallery':
      return 'img'
    case 'basic_video':
      return 'video'
    default:
      return ''
  }
}

const StoryContentChildRelatedInternalItem = ({
  title,
  websiteLink,
  multimediaType,
  multimedia,
}) => {
  return (
    <div className={classes.item}>
      <figure className={classes.multimedia}>
        <a itemProp="url" href={websiteLink}>
          <Image
            src={multimedia}
            width={314}
            height={157}
            alt={title}
            className={classes.image}
            loading="lazy"
          />
          {multimediaType === IMAGE || multimediaType === '' ? null : (
            <span
              className={`${classes.icon} icon-${getIcon(multimediaType)}`}
            />
          )}
        </a>
      </figure>
      <div className={`${classes.info}`}>
        <h2 itemProp="name" className={classes.titleLink}>
          <a itemProp="url" href={websiteLink}>
            {title}
          </a>
        </h2>
      </div>
    </div>
  )
}

export default React.memo(StoryContentChildRelatedInternalItem)
