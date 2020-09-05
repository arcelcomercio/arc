import React from 'react'
import { SITE_DEPOR } from '../../../../utilities/constants/sitenames'
import Icon from '../../../../global-components/multimedia-icon'
import Image from '../../../../global-components/image'

const CardMostReadChildItem = props => {
  const { item, viewImage, arcSite } = props
  const { websiteUrl, imageUrl, title, storyType } = item

  const classes = {
    item: `most-read-item block border-solid border-b-1 border-base mr-20 ml-20`,
    article: `most-read-item__article flex pt-15 pb-15`,
    figure: `most-read-item__figure flex justify-center items-center w-full h-full overflow-hidden position-relative mr-15`,
    img: 'most-read-item__img w-inherit h-inherit object-cover object-center',
    icon: 'most-read-item__icon',
    title: `most-read-item__detail w-full overflow-hidden text-gray-300 line-h-sm`,
    numLines: 'three-lines',
  }

  if (viewImage) classes.numLines = 'four-lines'

  return (
    <a itemProp="url" href={websiteUrl} className={classes.item}>
      <article role="listitem" className={classes.article}>
        {viewImage && (
          <figure className={classes.figure}>
            <Image
              src={imageUrl}
              width={arcSite === SITE_DEPOR ? 314 : 118}
              height={arcSite === SITE_DEPOR ? 157 : 72}
              alt={title}
              className={classes.img}
              loading="lazy"
            />
            <Icon type={storyType} iconClass={classes.icon} />
          </figure>
        )}
        <h4 itemProp="name" className={`${classes.title} ${classes.numLines}`}>
          {title}
        </h4>
      </article>
    </a>
  )
}

export default CardMostReadChildItem
