import * as React from 'react'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

import { ELEMENT_STORY } from '../../../utilities/constants/element-types'
import StoryData from '../../../utilities/story-data'

import StoryContentChildRelated from './_children/item'

const classes = {
  relatedList: 'related-content__list pt-20 pr-20 pl-20',
  relatedTitle: 'related-content__title font-bold uppercase pt-20 pb-20',
}

const getRelatedIds = data => {
  return (
    data &&
    data.map(({ _id }) => {
      return _id
    })
  )
}

const StoryRelated = () => {
  const { contextPath, globalContent, arcSite, deployment } = useAppContext()

  const { nameStoryRelated } = getProperties(arcSite)

  const { _id: storyId, content_elements: contentElements = [] } =
    globalContent || {}

  const { basic: relatedContent = [] } =
    useContent({
      source: 'related-content',
      query: {
        _id: storyId,
        presets: 'no-presets',
      },
    }) || {}

  const relatedInternal =
    contentElements.length > 0 &&
    contentElements.filter(item => item.type === 'story')

  const storyData = new StoryData({
    contextPath,
    deployment,
    arcSite,
  })

  return relatedContent && relatedContent.length > 0 ? (
    <div role="list" className={classes.relatedList}>
      <h4 itemProp="name" className={classes.relatedTitle}>
        {nameStoryRelated}{' '}
      </h4>
      {relatedContent.map(story => {
        const { type, _id: id } = story
        if (
          type === ELEMENT_STORY &&
          getRelatedIds(relatedInternal).indexOf(id)
        ) {
          storyData.__data = story
          return (
            <StoryContentChildRelated
              key={`rel-content-${id}`}
              title={storyData.title}
              websiteLink={storyData.websiteLink}
              multimediaType={storyData.multimediaType}
              multimedia={storyData.multimedia}
              author={storyData.author}
              authorLink={storyData.authorLink}
            />
          )
        }
        return null
      })}
    </div>
  ) : null
}

StoryRelated.label = 'Artículo - Relacionados'
StoryRelated.static = true

export default StoryRelated
