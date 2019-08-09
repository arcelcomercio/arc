import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import StoryHeaderChildHeading from './_children/heading'
import StoryHeaderChildShareSubheading from './_children/subheading'
import StoryHeaderChildGallerySlider from './_children/gallery-slider'
import StoryHeaderChildGallery from './_children/gallery'
import StoryHeaderChildSocial from './_children/social'
import StoryHeaderChildSocialGestion from './_children/social-gestion' // TODO Salida de gestion
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'

const classes = {
  story: 'w-full text-white',
  gallery: 'w-full',
}
@Consumer
class StoryHeader extends PureComponent {
  render() {
    const {
      contextPath,
      globalContent: data,
      subtype,
      arcSite,
      isAdmin,
    } = this.props
    const { contentElementGallery, title, subTitle, link } = new StoryData({
      data,
      contextPath,
    })

    const parameters = { contentElementGallery, title, subTitle, link, isAdmin }
    return (
      <>
        <div
          className={contentElementGallery ? classes.gallery : classes.story}>
          {arcSite !== ConfigParams.SITE_GESTION && ( // TODO Salida de gestion 30 de julio
            <StoryHeaderChildSocial url={link} />
          )}

          <StoryHeaderChildHeading {...parameters} />
          <StoryHeaderChildShareSubheading {...parameters} />
          {arcSite === ConfigParams.SITE_GESTION && ( // TODO Salida de gestion 30 de julio
            <StoryHeaderChildSocialGestion url={link} />
          )}
          {subtype === ConfigParams.GALLERY_VERTICAL ? (
            <StoryHeaderChildGallery {...parameters} />
          ) : (
            <StoryHeaderChildGallerySlider {...parameters} />
          )}
        </div>
      </>
    )
  }
}

StoryHeader.label = 'Artículo - cabecera'

export default StoryHeader
