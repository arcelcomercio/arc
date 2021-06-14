import React from 'react'
import { FC } from 'types/features'
import { ArcSite } from 'types/fusion'

import MultimediaIcon from '../../../../../../global-components/lite/multimedia-icon'
import { SITE_DEPOR } from '../../../../../../utilities/constants/sitenames'

interface FeatureProps {
  arcSite?: ArcSite
  viewImage?: boolean
  imageUrl?: string
  websiteUrl?: string
  title?: string
  storyType?: string
}
const CardMostReadChildrenItem: FC<FeatureProps> = (props) => {
  const {
    arcSite = 'depor',
    viewImage,
    websiteUrl,
    imageUrl = '',
    title = '',
    storyType = '',
  } = props

  const classes = {
    item: `most-read__item `,
    link: `most-read__link f`,
    figure: `most-read__multimedia f pos-rel`,
    img: 'lazy most-read__img ',
    icon: 'most-read__icon',
    title: `most-read__txt w-full `,
    numLines: 'three-lines',
  }

  if (viewImage) classes.numLines = 'four-lines'

  return (
    <article role="listitem" className={classes.item}>
      <a itemProp="url" href={`${websiteUrl}`} className={classes.link}>
        {viewImage && (
          <figure className={classes.figure}>
            <img
              src="https://cdna.elcomercio.pe/resources/dist/elcomercio/images/default-md.png?d=2"
              data-src={imageUrl}
              width={arcSite === SITE_DEPOR ? 314 : 118}
              height={arcSite === SITE_DEPOR ? 157 : 72}
              alt={title}
              className={classes.img}
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

export default CardMostReadChildrenItem
