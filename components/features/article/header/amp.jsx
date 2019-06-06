import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import AMPCarousel from '@arc-core-components/feature_global-amp-gallery'
import { formatDayMonthYear } from '../../../utilities/helpers'
import ArticleHeaderChildAmpSocial from './_children/amp-social'

const classes = {
  news: 'article-amp-header',
  titleAmp: 'article-amp-header__title',
  datetime: 'article-amp-header__datetime',
  description: 'article-amp-header__description',
  gallery: 'article-amp-header full-width',
}
@Consumer
class ArticleAmpHeader extends PureComponent {
  render() {
    const {
      globalContent: {
        subheadlines: { basic: subtitle = '' } = {},
        headlines: { basic: titleElements = '' } = {},
        publish_date: date,
        promo_items: {
          basic_gallery: { content_elements: galleryItems } = {},
        } = {},
      } = {},
    } = this.props

    return (
      <>
        <div className={galleryItems ? classes.gallery : classes.news}>
          <header>
            {titleElements && (
              <h1 className={classes.titleAmp}> {titleElements}</h1>
            )}
            <time dateTime={date} className={classes.datetime}>
              {formatDayMonthYear(date)}
            </time>
          </header>

          {subtitle && <div className={classes.description}> {subtitle}</div>}
          <ArticleHeaderChildAmpSocial />
          {galleryItems && (
            <AMPCarousel data={galleryItems} width="500" height="300" />
          )}
        </div>
      </>
    )
  }
}

export default ArticleAmpHeader
