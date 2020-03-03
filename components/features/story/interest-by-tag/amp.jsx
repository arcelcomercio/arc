import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import StorySeparatorChildItemAmp from './_children/amp'
import StorySeparatorChildItemSliderAmp from './_children/amp-item-slider'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'
import customFields from './_dependencies/custom-fields'
import { separatorBasicFields } from '../../../utilities/included-fields'

const classes = {
  storyInterest:
    'amp-story-interest flex flex-col w-full h-auto pr-20 pl-20 mx-auto amp-story-header',
  title:
    'amp-story-interest__titleList block w-full h-auto font-bold mb-10 uppercase p-15 text-center md:text-left',
}

const CONTENT_SOURCE = 'story-feed-by-tag'

const InterestByTagAmp = props => {
  const {
    customFields: {
      tag = '',
      isWebAmp = '',
      storyAmp = '',
      titleAmp = 'Te puede interesar:',
      storiesQty = 4,
    } = {},
  } = props
  const {
    arcSite,
    globalContent: dataContent,
    contextPath,
    deployment,
    isAdmin,
    outputType: isAmp,
  } = useFusionContext()

  const presets = 'landscape_l:648x374,landscape_md:314x157'

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
        size: storiesQty,
        presets,
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

  const getSize = cant => {
    const dataStorys = dataInterest.map((story, i) => {
      if (key === cant) return false
      instance.__data = story
      key += 1

      const data = {
        title: instance.title,
        link: `${instance.websiteLink}?ref=amp&source=tepuedeinteresar`,
        section: instance.primarySection,
        sectionLink: instance.primarySectionLink,
        lazyImage: instance.multimediaLazyDefault,
        multimediaLandscapeL: instance.multimediaLandscapeL,
        multimediaLandscapeMD: instance.multimediaLandscapeMD,
        multimediaType: instance.multimediaType,
        isAdmin,
      }
      return (
        <>
          {storyAmp === 'slider' ? (
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
    return dataStorys
  }

  return (
    <>
      {isAmp === 'amp' && isWebAmp && dataInterest && dataInterest[0] && (
        <div className={classes.storyInterest}>
          <div className={classes.title}>{titleAmp}</div>
          {storyAmp === 'slider' ? (
            <amp-carousel
              layout="fixed-height"
              height="160"
              type="carousel"
              id="rel-noticias">
              {getSize(storiesQty)}
            </amp-carousel>
          ) : (
            <>{getSize(storiesQty)}</>
          )}
        </div>
      )}
    </>
  )
}

InterestByTagAmp.propTypes = {
  customFields,
}

InterestByTagAmp.label = 'Artículo - Te puede interesar'
InterestByTagAmp.static = true

export default InterestByTagAmp
