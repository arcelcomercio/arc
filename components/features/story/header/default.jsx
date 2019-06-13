import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import StoryHeaderChildHeading from './_children/heading'
import StoryHeaderChildShareSubheading from './_children/subheading'
import StoryHeaderChildGallery from './_children/gallery'
import StoryHeaderChildSocial from './_children/social'
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'

const classes = {
  news: 'full-width bg-color--white',
  gallery: 'full-width',
}
@Consumer
class StoryHeader extends PureComponent {
  render() {
    const { contextPath, globalContent: data, subtype } = this.props
    const { contentElementGallery, title, subTitle, link } = new StoryData({
      data,
      contextPath,
    })

    const parameters = { contentElementGallery, title, subTitle, link }
    return (
      <>
        <div className={contentElementGallery ? classes.gallery : classes.news}>
          <StoryHeaderChildSocial url={link} />

          <StoryHeaderChildHeading {...parameters} />
          <StoryHeaderChildShareSubheading {...parameters} />

          {subtype !== ConfigParams.GALLERY_VERTICAL ? (
            <StoryHeaderChildGallery {...parameters} />
          ) : (
            // TODO falta implementar el Slider #5053
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
