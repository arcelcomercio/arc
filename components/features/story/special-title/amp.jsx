import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import {
  formatDateStoryAmp,
  publicidadAmp,
  getDateSeo,
  storyTagsBbc,
} from '../../../utilities/helpers'
import StorySocialChildAmpSocial from '../social/_children/amp-social'
import StoryHeaderChildAmpGallery from '../gallery/_children/amp-gallery'
import StoryData from '../../../utilities/story-data'

const classes = {
  stories: 'amp-story-header bg-white pr-20 pl-20 m-5 mx-auto',
  titleAmp:
    'amp-story-header__title font-bold secondary-font title-md text-gray-300 line-h-xs',
  datetime:
    'amp-story-header__datetime mt-15 mb-15 block secondary-font text-lg',
  description:
    'amp-story-header__description mt-0 text-md text-gray-300 secondary-font',
  gallery: 'amp-story-header bg-white w-full pr-20 pl-20 m-5 mx-auto',
  adsAmp: 'text-center ad-amp-movil',
  bbcHead: 'bbc-head',
}
@Consumer
class StoryTitleAmp extends PureComponent {
  render() {
    const {
      arcSite,
      siteProperties: { adsAmp },
      deployment,
      contextPath,
      globalContent: data,
    } = this.props

    const {
      title,
      subTitle,
      displayDate: updatedDate,
      tags,
      website_url: websiteUrl,
      promoItems: {
        basic_gallery: { content_elements: galleryItems } = {},
      } = {},
    } = new StoryData({
      data,
      contextPath,
    })

    const dataSlot = `/${adsAmp.dataSlot}/${
      arcSite !== 'elcomercio' && arcSite !== 'elcomerciomag' ? arcSite : 'eco'
    }-amp-320x50-top-movil1`
    const placementId = adsAmp.movil1
    const width = '320'
    const height = '50'
    const parameters = { dataSlot, placementId, width, height, movil1: true }

    const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
    const imgBbc =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bbc_head.png`
      ) || ''

    return (
      <>
        <div className={galleryItems ? classes.gallery : classes.stories}>
          <header>
            {storyTagsBbc(tags) && (
              <div className={classes.bbcHead}>
                <a
                  href={URL_BBC}
                  rel="nofollow noopener noreferrer"
                  target="_blank">
                  <amp-img
                    alt="BBC"
                    layout="responsive"
                    width="500"
                    height="30"
                    src={imgBbc}
                    data-src={imgBbc}
                  />
                </a>
              </div>
            )}
            {title && <h1 className={classes.titleAmp}> {title} </h1>}
          </header>
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmp(parameters)}
          />

          {subTitle && <div className={classes.description}> {subTitle}</div>}
          <StorySocialChildAmpSocial />

          {galleryItems && (
            <StoryHeaderChildAmpGallery
              data={galleryItems}
              websiteUrl={websiteUrl}
              width="500"
              height="300"
            />
          )}
        </div>
      </>
    )
  }
}

StoryTitleAmp.static = true
export default StoryTitleAmp
