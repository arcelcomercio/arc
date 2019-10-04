import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import {
  publicidadAmp,
  formatDateStoryAmp,
  getDateSeo,
  storyTagsBbc,
} from '../../../utilities/helpers'
import StorySocialChildAmpSocial from '../social/_children/amp-social'
import StoryHeaderChildAmpGallery from '../gallery/_children/amp-gallery'

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
      contextPath,
      deployment,
      globalContent: {
        subheadlines: { basic: subtitle = '' } = {},
        headlines: { basic: titleElements = '' } = {},
        display_date: updatedDate,
        taxonomy: { tags = {} } = {},
        promo_items: {
          basic_gallery: { content_elements: galleryItems } = {},
        } = {},
        website_url: websiteUrl,
      } = {},
    } = this.props
    const dataSlot = `/${adsAmp.dataSlot}/${
      arcSite !== 'elcomercio' && arcSite !== 'elcomerciomag' ? arcSite : 'eco'
    }-amp-320x50-top-movil1`
    const placementId = adsAmp.movil1
    const width = '320'
    const height = '50'
    const parameters = { dataSlot, placementId, width, height }

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
                  <img alt="BBC" src={imgBbc} data-src={imgBbc} />
                </a>
              </div>
            )}

            {titleElements && (
              <h1 className={classes.titleAmp}>{titleElements}</h1>
            )}
            <time
              dateTime={getDateSeo(updatedDate)}
              className={classes.datetime}>
              {formatDateStoryAmp(updatedDate)}
            </time>
          </header>
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmp(parameters)}
          />

          {subtitle && <div className={classes.description}> {subtitle}</div>}
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
