import { useFusionContext } from 'fusion:context'
import React from 'react'

import StoryData from '../../../utilities/story-data'
import StoryTitleChildHeading from '../title/_children/heading'

const classes = {
  story: 'story-special-title w-full justify-center ',
  note: 'story-special-title_note w-full flex justify-center uppercase',
}

const StorySpecialTitle = () => {
  const { contextPath, globalContent: data, arcSite } = useFusionContext()

  const {
    title,
    editorNote,
    primarySection,
    primarySectionLink,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
  })

  return (
    <>
      <div className={classes.story}>
        <div className={classes.note}>
          {editorNote ? (
            <p
              itemProp="description"
              dangerouslySetInnerHTML={{ __html: editorNote }}
            />
          ) : (
            <a itemProp="url" href={primarySectionLink}>
              {primarySection}
            </a>
          )}
        </div>
        <StoryTitleChildHeading title={title} />
      </div>
    </>
  )
}

StorySpecialTitle.label = 'Artículo - Título Especial'
StorySpecialTitle.static = true

export default StorySpecialTitle
