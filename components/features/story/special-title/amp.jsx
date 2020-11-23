import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import StorySocialChildAmpSocial from '../social/_children/amp-social'
import StoryHeaderChildAmpGallery from '../gallery/_children/amp-gallery'
import StoryData from '../../../utilities/story-data'
import { storyTagsBbc } from '../../../utilities/tags'
import { getAssetsPath } from '../../../utilities/assets'
import { publicidadAmp } from '../../../utilities/story/helpers-amp'
import { GALLERY_VERTICAL } from '../../../utilities/constants/subtypes'

const classes = {
  stories: 'amp-sh bg-white pr-20 pl-20 m-5 mx-auto',
  titleAmp:
    'amp-sh__title font-bold secondary-font title-md text-gray-300 line-h-xs',
  datetime: 'amp-sh__datetime mt-15 mb-15 block secondary-font text-lg',
  description: 'amp-sh__description mt-0 text-md text-gray-300 secondary-font',
  gallery: 'amp-sh bg-white w-full pr-20 pl-20 m-5 mx-auto',
  adsAmp: 'text-center ad-amp-movil',
  bbcHead: 'bbc-head',
}
const StoryTitleAmp = () => {
  const { arcSite, contextPath, globalContent: data } = useFusionContext()

  const { adsAmp, siteUrl } = getProperties(arcSite)

  const {
    title,
    subTitle,
    tags,
    link,
    subtype,
    promoItems: { basic_gallery: { content_elements: galleryItems } = {} } = {},
  } = new StoryData({
    data,
    contextPath,
  })
  const adsId = arcSite !== 'peru21g21' ? arcSite : 'peru21'
  const dataSlot = `/${adsAmp.dataSlot}/${adsId}/amp/post/default/caja1`

  const width = '320'
  const height = '50'
  const parameters = {
    dataSlot,

    width,
    height,
    movil1: true,
    arcSite,
  }

  const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
  const imgBbc =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''

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
        {subtype !== GALLERY_VERTICAL && (
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmp(parameters)}
          />
        )}
        {subTitle && <div className={classes.description}> {subTitle}</div>}
        <StorySocialChildAmpSocial />

        {galleryItems && (
          <StoryHeaderChildAmpGallery
            data={galleryItems}
            siteUrl={siteUrl}
            link={link}
            width="500"
            height="300"
          />
        )}
      </div>
    </>
  )
}

StoryTitleAmp.static = true

export default StoryTitleAmp
