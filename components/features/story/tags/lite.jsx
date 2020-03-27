import React from 'react'
import { useFusionContext } from 'fusion:context'

import UtilListKey from '../../../utilities/list-keys'

const classes = {
  container: 'st-tags',
  title: 'st-tags__title',
  tag: 'st-tags__tag',
  link: 'st-tags__link',
}

const StoryTags = () => {
  const { globalContent } = useFusionContext()
  const { taxonomy: { tags = ['pepe', 'miguel', 'coronavirus'] } = {} } =
    globalContent || {}

  return (
    tags.length > 0 && (
      <div className={classes.container}>
        <h4 className={classes.title}>Tags:</h4>
        {tags.map(
          ({ slug, text }, idx) =>
            slug &&
            text && (
              <h2 key={UtilListKey(idx)} className={classes.tag}>
                <a className={classes.link} href={slug && `/noticias/${slug}/`}>
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
