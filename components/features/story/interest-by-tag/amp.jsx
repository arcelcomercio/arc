import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'
import { SITE_ELCOMERCIOMAG } from '../../../utilities/constants/sitenames'
import { separatorBasicFields } from '../../../utilities/included-fields'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import StorySeparatorChildItemAmp from './_children/amp'
import StorySeparatorChildItemSliderAmp from './_children/amp-item-slider'

const classes = {
  storyInterest:
    'amp-story-interest flex flex-col w-full h-auto pr-20 pl-20 mx-auto amp-sh',
  title:
    'amp-story-interest__titleList block w-full h-auto font-bold mb-10 uppercase p-15 text-center md:text-left',
  title_full_imagen:
    'amp-story-interest__titleListFullImagen block position-relative w-full h-auto font-bold mb-15 p-10 text-center text-left',
}

const CONTENT_SOURCE = 'story-feed-by-tag'

const InterestByTagAmp = props => {
  const {
    customFields: {
      tag = '',
      renderAMP = true,
      storyAMP = '',
      titleAMP = 'Te puede interesar:',
      storiesQtyAMP = 4,
    } = {},
  } = props
  const {
    arcSite,
    globalContent: dataContent,
    contextPath,
    deployment,
    isAdmin,
    outputType,
  } = useAppContext()

  const isFullImage = storyAMP === 'amp_full_imagen'
  const isSlider = storyAMP === 'slider'

  const { tags: [{ slug = 'peru' } = {}] = [], id: excluir } = new StoryData({
    data: dataContent,
    contextPath,
  })

  const urlTag = `/${tag || slug}/`
  const { content_elements: storyData = [] } =
    useContent({
      source: CONTENT_SOURCE,
      query: {
        website: arcSite,
        name: urlTag,
        size: storiesQtyAMP,
        presets:
          isFullImage || isSlider
            ? 'landscape_md:360x202'
            : 'landscape_md:118x66',
        includedFields: separatorBasicFields,
      },
      filter: schemaFilter(arcSite),
    }) || {}

  const instance =
    storyData &&
    new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

  let key = 0

  const dataInterest = storyData
    .map(story => {
      return story && story._id !== excluir ? story : ''
    })
    .filter(String)

  const isMag = arcSite === SITE_ELCOMERCIOMAG
  const linkSource = `&source=${isMag ? 'notepierdas' : 'tepuedeinteresar'}`
  const linkOutput = isMag ? '' : `&outputType=${outputType}`

  const getSize = cant => {
    const dataStories = dataInterest.map((story, i) => {
      if (key === cant) return false
      instance.__data = story
      key += 1
      const link = `${
        instance.websiteLink
      }?ref=${outputType}&pos=${key}${linkSource}${
        instance.isPremium === false ? linkOutput : ''
      }`

      const data = {
        title: instance.title,
        subtitle: isMag ? null : instance.subTitle,
        link,
        section: instance.primarySection,
        sectionLink: instance.primarySectionLink,
        lazyImage: instance.multimediaLazyDefault,
        multimediaLandscapeL: instance.multimediaLandscapeL,
        multimediaLandscapeMD: instance.multimediaLandscapeMD,
        multimediaType: instance.multimediaType,
        isAdmin,
        storyAMP,
      }
      return (
        <>
          {isSlider ? (
            <StorySeparatorChildItemSliderAmp
              data={data}
              key={UtilListKey(i)}
              arcSite={arcSite}
            />
          ) : (
            <StorySeparatorChildItemAmp
              data={data}
              key={UtilListKey(i)}
              arcSite={arcSite}
            />
          )}
        </>
      )
    })
    return dataStories
  }

  return (
    <>
      {renderAMP && dataInterest && dataInterest[0] ? (
        <section className={classes.storyInterest}>
          <h2
            className={isFullImage ? classes.title_full_imagen : classes.title}>
            {titleAMP}
          </h2>
          {isSlider ? (
            <amp-carousel
              layout="fixed-height"
              height="160"
              type="carousel"
              id="rel-noticias">
              {getSize(storiesQtyAMP)}
            </amp-carousel>
          ) : (
            <>{getSize(storiesQtyAMP)}</>
          )}
        </section>
      ) : null}
    </>
  )
}

InterestByTagAmp.propTypes = {
  customFields,
}

InterestByTagAmp.label = 'Artículo - Te puede interesar'
InterestByTagAmp.static = true

export default InterestByTagAmp
