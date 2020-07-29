import React from 'react'
import { useFusionContext } from 'fusion:context'

const classes = {
  story: 'st-special-t w-full',
  note: 'st-special-t__note w-full uppercase',
  title: 'sht__title',
}

const StorySpecialTitle = () => {
  const { globalContent } = useFusionContext()
  const {
    headlines: { basic: title = '' } = {},
    editor_note: editorNote = '',
    taxonomy: {
      primary_section: { name: sectionName = '', path: sectionLink = '' } = {},
    } = {},
  } = globalContent || {}

  return (
    <>
      <div className={classes.story}>
        <div className={classes.note}>
          {editorNote ? (
            <p
              itemProp="description"
              dangerouslySetInnerHTML={{ __html: editorNote }}></p>
          ) : (
            <a itemProp="url" href={sectionLink}>
              {sectionName}
            </a>
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

StorySpecialTitle.label = 'Artículo - Título Especial'
StorySpecialTitle.static = true

export default StorySpecialTitle
