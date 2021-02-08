import * as React from 'react'

import Image from '../../../../../global-components/image'
import MultimediaIcon from '../../../../../global-components/lite/multimedia-icon'

import UtilListKey from '../../../../../utilities/list-keys'
import {
  SITE_ELCOMERCIO,
  SITE_TROME,
} from '../../../../../utilities/constants/sitenames'

// Basic flex stuff
const classes = {
  item: 'st-rel__item f',
  link: 'st-rel__link ',
  multimedia: 'st-rel__multimedia pos-rel',
  image: 'st-rel__img',
  author: 'st-rel__author',
  text: 'st-rel__txt',
  box: 'st-rel__box',
}

const RenderRelatedContentElement = (props, i) => {
  const {
    title,
    websiteLink,
    author,
    authorLink,
    multimedia,
    multimediaType,
    arcSite,
  } = props

  const width = arcSite === SITE_TROME ? 304 : 200
  const height = arcSite === SITE_TROME ? 147 : 116

  return (
    <article role="listitem" className={classes.item} key={UtilListKey(i + 12)}>
      <div className={classes.box}>
        <h2 itemProp="name" className={classes.text}>
          <a itemProp="url" href={websiteLink} className={classes.link}>
            {title}
          </a>
        </h2>
        {arcSite === SITE_ELCOMERCIO && (
          <a itemProp="url" className={classes.author} href={authorLink}>
            {author}
          </a>
        )}
      </div>
      <figure className={classes.multimedia}>
        <a itemProp="url" href={websiteLink} className={classes.link}>
          <Image
            src={multimedia}
            width={width}
            height={height}
            alt={title}
            className={classes.image}
            loading="lazy"
          />
          <MultimediaIcon type={multimediaType} />
        </a>
      </figure>
    </article>
  )
}

export default React.memo(RenderRelatedContentElement)
