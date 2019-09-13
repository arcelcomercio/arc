import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryTitleChildHeading from '../title/_children/heading'
import StoryData from '../../../utilities/story-data'
import rawHtml from 'react-render-html'

const classes = {
  story: 'story-special-title w-full justify-center ',
  note: 'story-special-title_note w-full flex justify-center uppercase',
}

const StorySpecialTitle = () => {
  const { contextPath, globalContent: data } = useFusionContext()

  const { title, editorNote } = new StoryData({
    data,
    contextPath,
  })

  const parameters = { title, editorNote }

  return (
    <>
      <div className={classes.story}>
        <div className={classes.note}>{editorNote && rawHtml(editorNote)}</div>
        <StoryTitleChildHeading {...parameters} />
      </div>
    </>
  )
}

StorySpecialTitle.label = 'Artículo - Título Especial'
StorySpecialTitle.static = true

export default StorySpecialTitle
