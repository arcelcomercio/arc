import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'

const classes = {
  story: 'story-header ',
  description: 'story-header__summary',
  title: 'story-header__title',
}

const StoryTitleLite = () => {
  const { contextPath, globalContent: data } = useFusionContext()

  const { title, subTitle, primarySectionLink } = new StoryData({
    data,
    contextPath,
  })

  return (
    <>
      <div
        className={`${classes.story} ${primarySectionLink.replace(/\//g, '')}`}>
        <h1 className={classes.title}> {title}</h1>
        <h2 className={classes.description}> {subTitle}</h2>
      </div>
    </>
  )
}

StoryTitleLite.label = 'Artículo - Título'
StoryTitleLite.static = true

export default StoryTitleLite
