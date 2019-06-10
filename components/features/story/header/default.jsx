import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import StoryHeaderChildHeading from './_children/heading'
import StoryHeaderChildShareSubheading from './_children/subheading'
import StoryHeaderChildGallery from './_children/gallery'
import StoryHeaderChildSocial from './_children/social'

const classes = {
  news: 'full-width bg-color--white',
  gallery: 'full-width',
}
@Consumer
class StoryHeader extends PureComponent {
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
          <StoryHeaderChildSocial url={baseUrl} title={headlines} />

          <StoryHeaderChildHeading data={globalContent} />
          <StoryHeaderChildShareSubheading data={globalContent} />

          {galleryItems &&
          galleryItems.basic_gallery &&
          typeof galleryItems.basic_gallery.content_elements !== 'undefined' ? (
            <StoryHeaderChildGallery
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

StoryHeader.static = false
StoryHeader.label = 'Artículo - cabecera'

export default StoryHeader
