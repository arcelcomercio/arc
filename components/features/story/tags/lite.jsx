import React from 'react'
import { useFusionContext } from 'fusion:context'

import UtilListKey from '../../../utilities/list-keys'

const classes = {
  container: 'st-tags ',
  title: 'st-tags__title',
  tag: 'st-tags__tag',
  box: 'st-tags__box',
  link: 'st-tags__link',
}

const StoryTags = () => {
  const { globalContent } = useFusionContext()
  const { taxonomy: { tags = [] } = {} } = globalContent || {}

  return (
    tags.length > 0 && (
      <div className={classes.container}>
        <h4 itemProp="name" className={classes.title}>TAGS RELACIONADOS</h4>
        <div className={classes.box}>
          {tags.map(
            ({ slug, text }, idx) =>
              slug &&
              text && (
                <>
                  <h2 itemProp="name" key={UtilListKey(idx)} className={classes.tag}>
                    <a
                      className={classes.link}
                      href={slug && `/noticias/${slug}/`}>
                      {idx !== 0 && <span>|</span>}
                      {text}
                    </a>
                  </h2>
                </>
              )
          )}
        </div>
      </div>
    )
  )
}

StoryTags.label = 'Artículo - Tags'
StoryTags.static = true

export default StoryTags
