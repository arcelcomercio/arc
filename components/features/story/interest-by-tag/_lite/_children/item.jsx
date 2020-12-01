import * as React from 'react'

import Image from '../../../../../global-components/image'

const classes = {
  item: 'st-interest__item',
  itemArticle: 'st-interest__article',
  linkImage: 'st-interest__link-img',
  detail: 'st-interest__detail',
  detailSec: 'st-interest__detail-section',
  detailTitle: 'st-interest__detail-title',
  detailSubtitle: 'st-interest__detail-subtitle',
}

const StorySeparatorChildItemAmp = ({ data }) => {
  const { title, section, subtitle, link, image, multimediaType } = data

  return (
    <article className={`${classes.item} `}>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      {link && (
        <a href={link}>
          <Image
            className={classes.linkImage}
            src={image}
            alt={title}
            width={360}
            height={202}
            loading="lazy"
          />
        </a>
      )}
      <div className={`${classes.detail}`}>
        <div className={`${classes.detailSec}`}>{section}</div>
        <h3 className={classes.detailTitle}>
          <a className={`${classes.titleLink} `} href={link}>
            {title}
          </a>
        </h3>
        {subtitle && (
          <div className={classes.detailSubtitle}>
            {subtitle.substring(0, 105)}...
          </div>
        )}
      </div>
    </article>
  )
}

export default StorySeparatorChildItemAmp
