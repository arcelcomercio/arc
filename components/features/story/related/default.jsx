import React from 'react'

import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import { ELEMENT_STORY } from '../../../utilities/constants/element-types'
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
  const {
    contextPath,
    globalContent,
    arcSite,
    deployment,
    isAdmin,
    siteProperties: { nameStoryRelated },
  } = useFusionContext()

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

  return (
    <>
      {relatedContent && relatedContent.length > 0 && (
        <div role="list" className={classes.relatedList}>
          <h4 itemProp="name" className={classes.relatedTitle}>
            {nameStoryRelated}{' '}
          </h4>
          {relatedContent.map((item, i) => {
            const { type, _id: id } = item
            const key = `related-content-${i}`
            return type === ELEMENT_STORY &&
              getRelatedIds(relatedInternal).indexOf(id) ? (
              <StoryContentChildRelated
                key={key}
                {...item}
                contextPath={contextPath}
                arcSite={arcSite}
                deployment={deployment}
                isAdmin={isAdmin}
              />
            ) : (
              ''
            )
          })}
        </div>
      )}
    </>
  )
}

StoryRelated.label = 'Artículo - Relacionados'
StoryRelated.static = true

export default StoryRelated
