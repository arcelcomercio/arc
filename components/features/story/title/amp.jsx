import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import { SITE_ELCOMERCIOMAG } from '../../../utilities/constants/sitenames'
import { GALLERY_VERTICAL } from '../../../utilities/constants/subtypes'
import {
  publicidadAmp,
  publicidadAmpCaja1,
} from '../../../utilities/story/helpers-amp'
import StoryData from '../../../utilities/story-data'
import { storyTagsBbc } from '../../../utilities/tags'
import StorySocialChildAmpSocial from '../social/_children/amp-social'
import AmpStoriesChild from './_children/amp-stories'

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
  listClasses: 'amp-story-content mt-20',
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
    contentElementsListOne: { items = [], type = '' } = {},
  } = new StoryData({
    data,
    contextPath,
  })
  const namePublicidad = arcSite !== 'peru21g21' ? arcSite : 'peru21'
  const dataSlot = `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja1`
  const width = '320'

  const parameters = {
    dataSlot,
    prebidSlot: `19186-${namePublicidad}-amp-caja1`,
    width,
    height: '100',
    movil1: false,
    primarySectionLink,
    arcSite,
    size: '320x100',
  }

  const parametersCaja1 = {
    dataSlot,
    arcSite,
    prebidSlot: `19186-${namePublicidad}-amp-caja1`,
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

          <AmpStoriesChild arcSite={arcSite} />

          {title && <h1 className={classes.titleAmp}>{title}</h1>}

          {/* Condicion para mag igual que web */}
          {items && arcSite === SITE_ELCOMERCIOMAG && type === 'list' ? (
            <div className={classes.listClasses}>
              <ul>
                {items.map(({ content }) => (
                    <>
                      <li dangerouslySetInnerHTML={{ __html: content }} />
                    </>
                  ))}
              </ul>
            </div>
          ) : null}
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
