import React from 'react'
import { useFusionContext } from 'fusion:context'

import ShareButtons from '../../../global-components/lite/share'

const classes = {
  container: 'st-social f',
  section: 'st-social__txt f f-center',
  buttons: 'st-social__share',
}

const StorySocialLite = () => {
  const { globalContent } = useFusionContext()

  const {
    taxonomy: {
      primary_section: { name = '', path = '' } = {},
      sections = [],
    } = {},
  } = globalContent || {}

  // En caso de que el primary section no devuelva "path" ni "name"
  const { name: auxName = '', path: auxPath = '' } = sections[0] || {}

  const primarySection = name || auxName
  const primarySectionLink = path || auxPath

  return (
    <div className={classes.container}>
      <h2 className={classes.section}>
        {primarySectionLink ? (
          <a href={primarySectionLink}>{primarySection}</a>
        ) : (
          primarySection
        )}
      </h2>
      <div className={classes.buttons}>
        <ShareButtons />
      </div>
    </div>
  )
}

export default StorySocialLite
