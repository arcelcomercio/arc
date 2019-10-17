import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import renderHTML from 'react-render-html'
import schemaFilter from './_dependencies/schema-filter'
import StorySeparatorChildItemAmp from './_children/amp'
import StorySeparatorChildItemSliderAmp from './_children/amp-item-slider'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'
import customFields from './_dependencies/custom-fields'

const classes = {
  storyInterest:
    'story-interest w-full h-auto pr-20 pl-20 mx-auto amp-story-header',
  title:
    'story-interest__titleList block w-full h-auto font-bold mb-10 uppercase p-20 text-center md:text-left',
}

const CONTENT_SOURCE = 'story-feed-by-tag'

const InterestByTag = props => {
  const {
    customFields: {
      section = '',
      storyAmp = '',
      title = 'Te puede interesar:',
    } = {},
  } = props
  const {
    arcSite,
    globalContent: dataContent,
    contextPath,
    deployment,
    isAdmin,
  } = useFusionContext()

  const { tags: [{ slug = 'peru' } = {}] = [], id: excluir } = new StoryData({
    data: dataContent,
    contextPath,
  })

  const urlTag = section || `/${slug}/`
  const { content_elements: storyData = [] } =
    useContent({
      source: CONTENT_SOURCE,
      query: {
        website: arcSite,
        name: urlTag,
        size: 6,
      },
      filter: schemaFilter,
    }) || ''

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
        link: instance.link,
        section: instance.primarySection,
        sectionLink: instance.primarySectionLink,
        lazyImage: instance.multimediaLazyDefault,
        multimediaLandscapeS: instance.multimediaLandscapeS,
        multimediaLandscapeL: instance.multimediaLandscapeL,
        multimediaType: instance.multimediaType,
        isAdmin,
      }
      return (
        <>
          {storyAmp !== 'normal' ? (
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
      {dataInterest && dataInterest[0] && (
        <div className={classes.storyInterest}>
          <div className={classes.title}>{title}</div>
          {storyAmp !== 'normal' ? (
            <amp-carousel
              layout="fixed-height"
              height="160"
              type="carousel"
              id="rel-noticias">
              {getSize(5)}
            </amp-carousel>
          ) : (
            getSize(4)
          )}
        </div>
      )}
    </>
  )
}

InterestByTag.propTypes = {
  customFields,
}

InterestByTag.label = 'Artículo - Te puede interesar'
InterestByTag.static = true

export default InterestByTag
