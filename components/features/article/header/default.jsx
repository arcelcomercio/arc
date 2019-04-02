import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Heading from './_children/heading'
import Subheading from './_children/subheading'
import Gallery from './_children/gallery'
import Share from './_children/share'

const classes = {
  news: 'col-3 padding-normal bg-color--white',
  gallery: 'col-3 _gallery--cover',
}
@Consumer
class ArticleHeader extends Component {
  render() {
    const {
      globalContent: {
        website_url: baseUrl = '',
        headlines: title = '',
        promo_items: galleryItems = {},
      } = {},
    } = this.props

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
          <Heading />
          <Subheading />
          <Share url={baseUrl} title={title} />
          {galleryItems &&
          galleryItems.basic_gallery &&
          typeof galleryItems.basic_gallery.content_elements !== 'undefined' ? (
            <Gallery data={galleryItems && galleryItems.basic_gallery} />
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

export default ArticleHeader
