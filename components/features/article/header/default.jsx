import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import ArticleHeaderChildHeading from './_children/heading'
import ArticleHeaderChildShareSubheading from './_children/subheading'
import ArticleHeaderChildGallery from './_children/gallery'
import ArticleHeaderChildSocial from './_children/social'

const classes = {
  news: 'col-3 padding-normal bg-color--white',
  gallery: 'col-3',
}
@Consumer
class ArticleHeader extends Component {
  render() {
    const { globalContent } = this.props
    const {
      website_url: baseUrl = '',
      headlines: title = '',
      promo_items: galleryItems = {},
    } = globalContent || {}

    return (
      <Fragment>
        <div
          className={
            galleryItems &&
            galleryItems.basic_gallery &&
            typeof galleryItems.basic_gallery.content_elements !== 'undefined'
              ? classes.gallery
              : classes.news
          }>
          <ArticleHeaderChildHeading />
          <ArticleHeaderChildShareSubheading />
          <ArticleHeaderChildSocial url={baseUrl} title={title} />
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
      </Fragment>
    )
  }
}

ArticleHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  globalContent: PropTypes.object,
}

ArticleHeader.static = true

ArticleHeader.label = 'Artículo - cabecera'

export default ArticleHeader
