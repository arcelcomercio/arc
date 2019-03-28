import React from 'react'
import { GetMultimediaContent } from '../../../../../resources/utilsJs/utilities'

const classes = {
  item: 'separator__item',
  detail: 'separator__detail',
  separatorTitle: 'separator__title',
  mvideo: 'separator--video',
}

export default ({ headlines, promoItems, website_url: websiteUrl }) => {
  /** TODO: Cambiar getMultimediaContent por método en dataStory */
  const { url: imageUrl = '/', medio = '' } =
    promoItems && GetMultimediaContent(promoItems)
  return (
    <article className={classes.item}>
      {medio === 'video' && <span>&#8227;</span>}
      {medio === 'gallery' && <span>G</span>}
      <div className={classes.detail}>
        <h2 className={classes.separatorTitle}>
          <a href={websiteUrl}>{headlines}</a>
        </h2>
      </div>
      <figure>
        {websiteUrl && (
          <a href={websiteUrl}>
            <img src={imageUrl} alt={headlines} />
          </a>
        )}
      </figure>
    </article>
  )
}
