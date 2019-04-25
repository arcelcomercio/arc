import React from 'react'
import { addResizedUrlItem } from '../../../../../resources/utilsJs/thumbs'
import { GetMultimediaContent } from '../../../../../resources/utilsJs/helpers'

const classes = {
  item: 'articlesep__item separator__item--nota',
  detail: 'articlesep__detail',
  separatorTitle: 'articlesep__title articlesep__title--nota',
  oneline: 'articlesep-oneline',
  twoline: 'articlesep-twoline',
  threeline: 'articlesep-threeline',
}

const SeparatorListItem = ({ data, excluir, website, arcSite }) => {
  const SeparatorItem = ({
    headlines,
    urlImage,
    website_url: websiteUrl,
    medio,
  }) => {
    let numline = ''
    switch (arcSite) {
      case 'elcomercio':
        numline = classes.threeline
        break
      case 'depor':
        numline = classes.twoline
        break
      default:
        numline = classes.twoline
        break
    }

    return (
      <article className={classes.item}>
        {medio === 'video' && <span>&#8227;</span>}
        {medio === 'gallery' && <span>G</span>}
        <div className={classes.detail}>
          <h2 className={`${classes.separatorTitle} ${numline}` }>
            <a href={websiteUrl}>{headlines}</a>
          </h2>
        </div>
        <figure>
          {websiteUrl && (
            <a href={websiteUrl}>
              <img src={urlImage} alt="" />
            </a>
          )}
        </figure>
      </article>
    )
  }

  // transform(data, website)
  let key = 0
  return data.map(elements => {
    if (key === 6) return false
    const {
      promo_items: promoItems,
      website_url: websiteUrl,
      headlines,
    } = elements

    let multimedia = null

    if (websiteUrl === excluir) return false

    if (promoItems !== null) {
      multimedia = GetMultimediaContent(promoItems)
    }
    const { medio, url } = multimedia
    if (url === undefined) return false

    key += 1
    const aspectRatios = ['3:4|147x80']

    const { resized_urls: resizedUrls } = addResizedUrlItem(
      website,
      url,
      aspectRatios
    )

    return (
      <SeparatorItem
        key={websiteUrl}
        headlines={headlines.basic}
        urlImage={resizedUrls['3:4']}
        website_url={websiteUrl}
        medio={medio}
      />
    )
  })
}

export default SeparatorListItem
