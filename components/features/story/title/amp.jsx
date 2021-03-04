import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import StorySocialChildAmpSocial from '../social/_children/amp-social'
import StoryData from '../../../utilities/story-data'
import { storyTagsBbc } from '../../../utilities/tags'
import { getAssetsPath } from '../../../utilities/assets'
import {
  publicidadAmp,
  publicidadAmpCaja1,
} from '../../../utilities/story/helpers-amp'
import {
  SITE_ELCOMERCIOMAG,
  SITE_OJO,
  SITE_PERU21,
  SITE_TROME,
} from '../../../utilities/constants/sitenames'
import { GALLERY_VERTICAL } from '../../../utilities/constants/subtypes'

const classes = {
  stories: 'amp-sh bg-white pr-20 pl-20 m-5 mx-auto',
  titleAmp:
    'amp-sh__title font-bold secondary-font title-md text-gray-300 line-h-xs mt-20',
  datetime: 'amp-sh__datetime mt-15 mb-15 block secondary-font text-lg',
  description:
    'amp-sh__description mt-0 text-md text-gray-300 secondary-font pt-10 pb-10',
  gallery: 'amp-sh bg-white w-full pr-20 pl-20 m-5 mx-auto',
  adsAmp: 'text-center ad-amp-movil',
  bbcHead: 'bbc-head',
}
const StoryTitleAmp = () => {
  const { arcSite, contextPath, globalContent: data } = useFusionContext()

  const { adsAmp } = getProperties(arcSite)

  const {
    title,
    subTitle,
    tags,
    subtype,
    primarySectionLink,
    promoItems: { basic_gallery: { content_elements: galleryItems } = {} } = {},
  } = new StoryData({
    data,
    contextPath,
  })
  const adsId = arcSite !== 'peru21g21' ? arcSite : 'peru21'
  const dataSlot = `/${adsAmp.dataSlot}/${adsId}/amp/post/default/caja1`
  const width = '320'

  const parameters = {
    dataSlot,
    width,
    height: '50',
    movil1: true,
    primarySectionLink,
    arcSite,
    size: '320x100',
  }

  const parametersCaja1 = {
    dataSlot,
  }

  // const ojoParamsIframe = {
  //   height: '150',
  //   layout: 'fixed-height',
  //   sandbox: 'allow-scripts allow-popups allow-same-origin allow-top-navigation',
  //   src: 'https://stories.peru21.pe/spc/load/ZECO_453_877_194/188/amp/stories-amp'
  // }

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
          {/* SCRIPT AMP */}
          {arcSite === SITE_OJO && (
            <amp-iframe
              height="150"
              layout="fixed-height"
              sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
              src="https://stories.ojo.pe/spc/load/ZECO_453_877_194/200/amp/stories-amp"
              noloading="">
              <amp-img
                layout="fill"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                placeholder></amp-img>
            </amp-iframe>
          )}

          {arcSite === SITE_PERU21 && (
            <amp-iframe
              height="150"
              layout="fixed-height"
              sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
              src="https://stories.peru21.pe/spc/load/ZECO_453_877_194/188/amp/stories-amp"
              noloading="">
              <amp-img
                layout="fill"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                placeholder></amp-img>
            </amp-iframe>
          )}

          {arcSite === SITE_TROME && (
            <amp-iframe
              height="150"
              layout="fixed-height"
              sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
              src="https://stories.trome.pe/spc/load/ZECO_453_877_194/132/amp/stories-amp"
              noloading="">
              <amp-img
                layout="fill"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                placeholder></amp-img>
            </amp-iframe>
          )}

          {title && <h1 className={classes.titleAmp}>{title}</h1>}
        </header>

        {arcSite !== SITE_ELCOMERCIOMAG && subtype !== GALLERY_VERTICAL && (
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmp(parameters)}
          />
        )}
        {arcSite === SITE_ELCOMERCIOMAG && (
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmpCaja1(parametersCaja1)}
          />
        )}
        {subTitle && <div className={classes.description}> {subTitle}</div>}
        {arcSite !== SITE_ELCOMERCIOMAG && <StorySocialChildAmpSocial />}
      </div>
    </>
  )
}

StoryTitleAmp.static = true

export default StoryTitleAmp
