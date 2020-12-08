import React from 'react'
import { useFusionContext } from 'fusion:context'

import UtilListKey from '../../../utilities/list-keys'

const classes = {
  container: 'st-tags ',
  title: 'st-tags__title',
  tag: 'st-tags__tag',
  box: 'st-tags__box',
  line: 'st-tags__line',
  link: 'st-tags__link',
}

const StoryTags = () => {
  const { globalContent, arcSite } = useFusionContext()
  const { taxonomy: { tags = [] } = {} } = globalContent || {}

  return (
    tags.length > 0 && (
      <div className={classes.container}>
        <h4 itemProp="name" className={classes.title}>
          TAGS RELACIONADOS
        </h4>
        <div className={classes.line}></div>
        <div className={classes.box}>
          {tags.map(
            ({ slug, text }, idx) =>
              slug &&
              text && (
                <>
                  <h2
                    itemProp="name"
                    key={UtilListKey(idx)}
                    className={classes.tag}>
                    <a
                      itemProp="url"
                      className={classes.link}
                      href={slug && `/noticias/${slug}/`}>
                      {idx !== 0 && arcSite === 'elcomercio' && <span>|</span>}
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
