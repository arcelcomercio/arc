import React from 'react'
import { GetMultimediaContent } from '../../../../../resources/utilsJs/utilities'

const classes = {
  item: 'separator__item',
  detail: 'separator__detail',
  separatorTitle: 'separator__title',
  mvideo: 'separator--video',
}

const SeparatorItem = ({
  headlines,
  urlImage,
  website_url: websiteUrl,
  medio,
}) => (
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
          <img src={urlImage} alt={headlines} />
        </a>
      )}
    </figure>
  </article>
)

const SeparatorListItem = ({ data = [] }) => {
  const result = data.map(
    ({
      promo_items: promoItems = {},
      website_url: websiteUrl = '/',
      headlines = {},
    }) => {
      let multimedia = {}

      if (promoItems) {
        multimedia = GetMultimediaContent(promoItems)
      }

      const { url = '/', medio = '' } = multimedia

      return (
        <SeparatorItem
          key={websiteUrl}
          headlines={headlines.basic || ''}
          urlImage={url}
          website_url={websiteUrl}
          medio={medio}
        />
      )
    }
  )
  return result
}

export default SeparatorListItem
