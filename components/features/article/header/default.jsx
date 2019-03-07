import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Heading from './types/heading'
import Subheading from './types/subheading'
import Gallery from './types/gallery'
import Share from './types/share'
import './article.css'

const classes = {
  news: 'col-3 padding-normal bg-color--white',
  gallery: 'col-3 _gallery--cover',
}
@Consumer
class ArticleHeader extends Component {
  render() {
    const {
      globalContent: {
        website_url: baseUrl,
        headlines: title,
        promo_items: galleryItems,
      },
    } = this.props
    const { content_elements: galleryElements } =
      galleryItems && typeof galleryItems.basic_gallery !== 'undefined'
        ? galleryItems.basic_gallery
        : ''

    return (
      <Fragment>
        <div
          className={
            typeof galleryElements === 'undefined'
              ? classes.news
              : classes.gallery
          }
        >
          <Heading />
          <Subheading />
          <Share url={baseUrl} title={title} />
          {typeof galleryElements === 'undefined' ? (
            ''
          ) : (
            <Gallery data={galleryItems.basic_gallery} />
          )}
        </div>
      </Fragment>
    )
  }
}

ArticleHeader.propTypes = {
  globalContent: PropTypes.object,
}

export default ArticleHeader
