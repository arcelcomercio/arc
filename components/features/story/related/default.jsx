import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import { getRelatedIds } from '../../../utilities/helpers'
import StoryContentChildRelated from './_children/item'

const classes = {
  // Related-content
  relatedList: 'related-content__list pt-20 pr-20 pl-20',
  relatedTitle: 'related-content__title font-bold uppercase pt-20 pb-20',
  taboola: 'story-content__taboola',
  listClasses: 'story-content__paragraph-list',
  alignmentClasses: 'story-content__alignment',
}

const StoryRelated = () => {
  const {
    contextPath,
    globalContent: data,
    arcSite,
    deployment,
    siteProperties: { nameStoryRelated },
  } = useFusionContext()

  const { relatedContent, relatedInternal } = new StoryData({
    data,
    contextPath,
  })

  return (
    <>
      {relatedContent && relatedContent.length > 0 && (
        <div role="list" className={classes.relatedList}>
          <h4 className={classes.relatedTitle}>{nameStoryRelated} </h4>
          {relatedContent.map((item, i) => {
            const { type, _id: id } = item
            const key = `related-content-${i}`
            return type === ConfigParams.ELEMENT_STORY &&
              getRelatedIds(relatedInternal).indexOf(id) ? (
              <StoryContentChildRelated
                key={key}
                {...item}
                contextPath={contextPath}
                arcSite={arcSite}
                deployment={deployment}
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
