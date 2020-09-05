import React from 'react'
import { SITE_DEPOR } from '../../../../../utilities/constants/sitenames'

import MultimediaIcon from '../../../../../global-components/lite/multimedia-icon'
import Image from '../../../../../global-components/image'

const CardMostReadChildItem = props => {
  const { item, viewImage, arcSite } = props
  const { websiteUrl, imageUrl, title, storyType } = item

  const classes = {
    item: `most-read__item `,
    link: `most-read__link f`,
    figure: `most-read__multimedia f pos-rel`,
    img: 'most-read__img ',
    icon: 'most-read__icon',
    title: `most-read__txt w-full `,
    numLines: 'three-lines',
  }

  if (viewImage) classes.numLines = 'four-lines'

  return (
    <article role="listitem" className={classes.item}>
      <a itemProp="url" href={websiteUrl} className={classes.link}>
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
            <MultimediaIcon type={storyType} />
          </figure>
        )}
        <h4 itemProp="name" className={`${classes.title} ${classes.numLines}`}>
          {title}
        </h4>
      </a>
    </article>
  )
}

export default CardMostReadChildItem
