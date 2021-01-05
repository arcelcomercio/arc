import * as React from 'react'

import Image from '../../../../global-components/image'
import UtilListKey from '../../../../utilities/list-keys'
import { IMAGE } from '../../../../utilities/constants/multimedia-types'

// Basic flex stuff
const classes = {
  related: 'related-content pt-20 pb-20',
  item:
    'related-content__item pt-15 pb-15 border-t-1 border-solid border-base md:justify-between md:flex',
  info: 'related-content__information mb-20 md:mb-0',
  itemTitle: 'related-content__item-title mb-10 text-md line-h-md',
  itemTitleLink: 'related-content__link font-bold',
  multimedia: 'related-content__multimedia position-relative',
  link: 'block w-full h-full',
  image: 'w-full h-full object-cover',
  icon: 'related-content__icon position-absolute p-5 rounded-lg title-xl',
  author: 'related-content__author uppercase text-gray-200',
}

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

const RenderRelatedContentElement = (props, i) => {
  const {
    title,
    websiteLink,
    multimediaType,
    multimedia,
    author,
    authorLink,
    isAmp = '',
  } = props

  return (
    <article role="listitem" className={classes.item} key={UtilListKey(i + 12)}>
      <div className={classes.info}>
        <h2 itemProp="name" className={classes.itemTitle}>
          <a
            itemProp="url"
            href={websiteLink}
            className={classes.itemTitleLink}>
            {title}
          </a>
        </h2>
        <a itemProp="url" href={authorLink} className={classes.author}>
          {author}
        </a>
      </div>
      <figure className={classes.multimedia}>
        <a itemProp="url" href={websiteLink} className={classes.link}>
          <Image
            src={multimedia}
            width={isAmp ? 514 : 314}
            height={isAmp ? 285 : 157}
            alt={title}
            className={classes.image}
            loading="lazy"
            layout="responsive"
            amp={isAmp}
          />
          {multimediaType === IMAGE || multimediaType === '' ? (
            ''
          ) : (
            <span
              className={`${classes.icon} icon-${getIcon(multimediaType)}`}
            />
          )}
        </a>
      </figure>
    </article>
  )
}

export default React.memo(RenderRelatedContentElement)
