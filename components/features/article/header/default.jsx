import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArticleHeaderChildHeading from './_children/heading'
import ArticleHeaderChildShareSubheading from './_children/subheading'
import ArticleHeaderChildGallery from './_children/gallery'
import ArticleHeaderChildSocial from './_children/social'

const classes = {
  news: 'full-width bg-color--white',
  gallery: 'full-width',
}
@Consumer
class ArticleHeader extends PureComponent {
  render() {
    const { globalContent } = this.props
    const {
      website_url: baseUrl = '',
      headlines,
      promo_items: galleryItems = {},
    } = globalContent || {}

    const hasValueElements =
      galleryItems &&
      galleryItems.basic_gallery &&
      typeof galleryItems.basic_gallery.content_elements !== 'undefined' &&
      true
    return (
      <>
        <div className={hasValueElements ? classes.gallery : classes.news}>
          <ArticleHeaderChildSocial url={baseUrl} title={headlines} />

          <ArticleHeaderChildHeading data={globalContent} />
          <ArticleHeaderChildShareSubheading data={globalContent} />

          {galleryItems &&
          galleryItems.basic_gallery &&
          typeof galleryItems.basic_gallery.content_elements !== 'undefined' ? (
            <ArticleHeaderChildGallery
              data={galleryItems && galleryItems.basic_gallery}
            />
          ) : (
            ''
          )}
        </div>
      </>
    )
  }
}

ArticleHeader.static = false
ArticleHeader.label = 'Artículo - cabecera'

export default ArticleHeader
