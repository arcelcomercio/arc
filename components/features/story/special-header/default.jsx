import React from 'react'

import { useFusionContext } from 'fusion:context'

import rawHtml from 'react-render-html'
import StoryContentsChildMultimedia from '../contents/_children/multimedia'
import StoryTitleChildHeading from '../title/_children/heading'
import StoryData from '../../../utilities/story-data'

const classes = {
  image: 'w-full position-relative',
  story: 'story-special-h w-full text-center position-absolute',
  note:
    'story-special-h__note title-xs text-center text-white uppercase pt-15 pb-15 mb-20',
}

const StorySpecialHeader = () => {
  const { contextPath, globalContent: data } = useFusionContext()

  const { title, editorNote, promoItems } = new StoryData({
    data,
    contextPath,
  })

  const parameters = { title, editorNote }

  return (
    <div className={classes.image}>
      <StoryContentsChildMultimedia data={promoItems} />
      <div className={classes.story}>
        <div className={classes.note}>{editorNote && rawHtml(editorNote)}</div>
        <StoryTitleChildHeading {...parameters} />
      </div>
    </div>
  )
}

StorySpecialHeader.label = 'Artículo - Encabezado Especial'
StorySpecialHeader.static = true

export default StorySpecialHeader
