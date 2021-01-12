import * as React from 'react'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import StoryData from '../../../utilities/story-data'
import { ELEMENT_STORY } from '../../../utilities/constants/element-types'
import { getAssetsPath } from '../../../utilities/constants'
import {
  SITE_DEPOR,
  SITE_ELCOMERCIO,
} from '../../../utilities/constants/sitenames'

import StoryContentChildRelated from './_lite/_children/item'

const classes = {
  relatedList: 'st-rel f f-col',
  relatedTitle: 'st-rel__title',
  container: 'st-rel__container f',
  logo: 'st-rel__logo',
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
  const { contextPath, deployment, globalContent, arcSite } = useAppContext()

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

  const urlImg = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/elcomercio/images/logo-sidebar.png?d=1`

  const title =
    arcSite === SITE_ELCOMERCIO || arcSite === SITE_DEPOR
      ? 'RELACIONADAS'
      : 'VEA TAMBIÉN'

  const storyData = new StoryData({
    contextPath,
    deployment,
    arcSite,
  })

  return relatedContent && relatedContent.length > 0 ? (
    <div role="list" className={classes.relatedList}>
      <div className={classes.container}>
        {arcSite === SITE_ELCOMERCIO && (
          <img className={classes.logo} alt="logo" src={urlImg} />
        )}
        <h4 itemProp="name" className={classes.relatedTitle}>
          {title}
        </h4>
      </div>
      {relatedContent.map(story => {
        const { type, _id: id } = story
        if (
          type === ELEMENT_STORY &&
          getRelatedIds(relatedInternal).indexOf(id)
        ) {
          storyData.__data = story

          return (
            <StoryContentChildRelated
              key={`st-rel-${id}`}
              title={storyData.title}
              websiteLink={storyData.websiteLink}
              multimediaType={storyData.multimediaType}
              multimedia={storyData.multimedia}
              author={storyData.author}
              authorLink={storyData.authorLink}
              arcSite={arcSite}
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
