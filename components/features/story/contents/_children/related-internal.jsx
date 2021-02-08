import * as React from 'react'

import StoryData from '../../../../utilities/story-data'

import RelatedItem from './related-internal-item'

const classes = {
  related: 'related-internal position-relative p-20 mb-20 mt-20 border-1',
  title: 'related-internal__title uppercase mb-20',
  linkAuthor: 'related-internal__link-author',
}

/**
 *
 * @todo aparentemente no se importa, si es asi, borrar
 */
const StoryContentChildRelatedInternal = ({
  stories,
  ids,
  deployment,
  contextPath,
  arcSite,
}) => {
  const keyinternal = 'st-rel-internal'

  const storyData = new StoryData({
    deployment,
    contextPath,
    arcSite,
  })

  return (
    <div className={classes.related}>
      <div className={classes.title}>Mira También:</div>
      {stories.map(story => {
        if (ids.includes(story._id)) {
          storyData.__data = story
          return (
            <RelatedItem
              key={keyinternal.concat(story._id)}
              title={storyData.title}
              websiteLink={storyData.websiteLink}
              multimediaType={storyData.multimediaType}
              multimedia={storyData.multimedia}
            />
          )
        }
        return null
      })}
    </div>
  )
}
export default StoryContentChildRelatedInternal
