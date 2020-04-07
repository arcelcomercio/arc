import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { ELEMENT_STORY } from '../../../utilities/constants/element-types'
import StoryContentChildRelated from './_lite/_children/item'

const classes = {
  relatedList: 'st-rel f f-col',
  relatedTitle: 'st-rel__title',
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
  } = useFusionContext()

  const { nameStoryRelated } = getProperties(arcSite)

  const {
    related_content: { basic: relatedContent = [] } = {},
    content_elements: contentElements = [],
  } = globalContent || {}

  const relatedInternal =
    contentElements.length > 0 &&
    contentElements.filter(item => item.type === 'story')

  return (
    <>
      {relatedContent && relatedContent.length > 0 && (
        <div role="list" className={classes.relatedList}>
          <h4 className={classes.relatedTitle}>{nameStoryRelated} </h4>
          {relatedContent.map((item, i) => {
            const { type, _id: id } = item
            const key = `st-rel-${i}`
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
