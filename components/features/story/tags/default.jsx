import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'

const classes = {
  container: 'story-tags mt-25 mb-20 pr-20 pl-20',
  title:
    'story-tags__title uppercase mb-10 primary-font font-bold text-md line-h-none',
  tag: 'inline-block primary-font text-md mr-5 mb-5',
  link:
    'story-tags__link block bg-gray-100 text-gray-200 pt-5 pb-5 pr-10 pl-10',
}

const StoryTags = () => {
  const { contextPath, globalContent: data, isAmp } = useFusionContext()

  const { tags } = new StoryData({
    data,
    contextPath,
  })

  return (
    tags.length > 0 && (
      <div className={classes.container}>
        <h4 className={isAmp ? `amp-${classes.title}` : classes.title}>
          Tags Relacionados:
        </h4>
        {tags.map(
          ({ slug, text }, idx) =>
            slug &&
            text && (
              <h2 key={UtilListKey(idx)} className={classes.tag}>
                <a
                  className={isAmp ? `amp-${classes.link}` : classes.link}
                  href={slug && `/noticias/${slug}`}>
                  {text}
                </a>
              </h2>
            )
        )}
      </div>
    )
  )
}

StoryTags.label = 'Artículo - Tags'
StoryTags.static = true

export default StoryTags
