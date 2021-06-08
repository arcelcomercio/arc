import { useFusionContext } from 'fusion:context'
import React from 'react'

import TProLbl from '../../../global-components/trustprojectlabel'
import StoryData from '../../../utilities/story-data'

const classes = {
  story: 'st-special-t w-full',
  note: 'st-special-t__note w-full uppercase',
  title: 'sht__title',
}

const StorySpecialTitleLite = () => {
  const { globalContent: data, arcSite, contextPath } = useFusionContext()
  const { label: { trustproject = '' } = {} } = data || {}

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
          {trustproject && (
            <TProLbl trustproject={trustproject} plantilla="lite" />
          )}
        </div>
        <h1 itemProp="name" className={classes.title}>
          {' '}
          {title}
        </h1>
      </div>
    </>
  )
}

StorySpecialTitleLite.label = 'Artículo - Título Especial'
StorySpecialTitleLite.static = true

export default StorySpecialTitleLite
