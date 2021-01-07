import * as React from 'react'
import { useAppContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'

const classes = {
  htmlContainer: 'htmlContainer overflow-x-auto overflow-y-hidden',
  newsEmbed: 'story-content__embed',
  emptyBackground: 'bg-gray-200',
}

const BasicHtmlFeatLite = props => {
  const { customFields: { freeHtml = '' } = {} } = props
  const { isAdmin } = useAppContext()

  return (
    <div className={` ${classes.htmlContainer} `}>
      {freeHtml ? <div dangerouslySetInnerHTML={{ __html: freeHtml }} /> : null}
      {!freeHtml && isAdmin ? (
        <div
          dangerouslySetInnerHTML={{ __html: freeHtml }}
          className={classes.emptyBackground}
        />
      ) : null}
    </div>
  )
}

BasicHtmlFeatLite.propTypes = {
  customFields,
}

BasicHtmlFeatLite.label = 'HTML Básico - Beta'
BasicHtmlFeatLite.static = true

export default BasicHtmlFeatLite
