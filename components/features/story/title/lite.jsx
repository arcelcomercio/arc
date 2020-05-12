import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'

const classes = {
  story: 'sht ',
  description: 'sht__summary',
  listClasses: 'sht__list',
  title: 'sht__title',
}

const StoryTitleLite = () => {
  const { contextPath, globalContent: data } = useFusionContext()

  const {
    title,
    subTitle,
    primarySectionLink,
    contentElementsListOne: { items = [], type = '' } = {},
  } = new StoryData({
    data,
    contextPath,
  })

  return (
    <>
      <div
        className={`${classes.story} ${primarySectionLink.replace(/\//g, '')}`}>
        <h1 className={classes.title}> {title}</h1>
        {items && type === 'list' ? (
          <ul className={classes.listClasses}>
            {items.map(({ content }) => {
              return (
                <>
                  <li dangerouslySetInnerHTML={{ __html: content }} />
                </>
              )
            })}
          </ul>
        ) : (
          <h2 className={classes.description}>{subTitle}</h2>
        )}
      </div>
    </>
  )
}

StoryTitleLite.label = 'Artículo - Título'
StoryTitleLite.static = true

export default StoryTitleLite
