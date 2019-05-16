import React from 'react'
import { addResizedUrlItem } from '../../../../utilities/thumbs'
import { GetMultimediaContent } from '../../../../utilities/helpers'

const classes = {
  item: 'articlesep__item separator__item--nota flex flex--justify-between',
  detail: 'articlesep__detail',
  separatorCategory: 'articlesep__category',
  separatorTitle: 'articlesep__title articlesep__title--nota',
  oneline: 'articlesep-oneline',
  twoline: 'articlesep-twoline',
  threeline: 'articlesep-threeline text-left',
}

const ArticleSeparatorChildItem = ({ data, excluir, website, arcSite }) => {
  const SeparatorItem = ({
    dataItem: {
      promo_items: promoItems,
      website_url: websiteUrl,
      headlines,
      taxonomy: { primary_section: { name, path } = {} } = {},
    },
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

    let multimedia = null
    if (promoItems) {
      multimedia = GetMultimediaContent(promoItems)
    }
    const { medio, url } = multimedia || {}
    if (url === undefined) return false

    // transform(data, website)
    const aspectRatios = ['3:4|60x70']
    const { resized_urls: resizedUrls } = addResizedUrlItem(
      website,
      url,
      aspectRatios
    )
    const WEBSITE = `?_website=${arcSite}`
    return (
      <article className={classes.item}>
        {medio === 'video' && <span>&#8227;</span>}
        {medio === 'gallery' && <span>G</span>}
        <div className={classes.detail}>
          <h2 className={classes.separatorCategory}>
            <a href={`${path}${WEBSITE}`}>{name}</a>{' '}
          </h2>
          <h3 className={`${classes.separatorTitle} ${numline}`}>
            <a href={`${websiteUrl}${WEBSITE}`}>{headlines.basic}</a>
          </h3>
        </div>
        <figure>
          {websiteUrl && (
            <a href={websiteUrl}>
              <img src={resizedUrls['3:4']} alt="" />
            </a>
          )}
        </figure>
      </article>
    )
  }

  let key = 0
  return data.map((elements, i) => {
    if (key === 4) return false
    const { website_url: websiteUrl } = elements
    if (websiteUrl === excluir) return false
    key += 1
    return <SeparatorItem dataItem={elements} key="jj" />
  })
}

export default ArticleSeparatorChildItem
