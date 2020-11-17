import * as React from 'react'
import { useAppContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'

const classes = {
  htmlContainer: 'htmlContainer overflow-x-auto overflow-y-hidden',
  newsEmbed: 'story-content__embed',
}

const BasicHtmlFeatLite = props => {
  const { customFields: { freeHtml = '' } = {} } = props
  const { isAdmin } = useAppContext()

  const addEmptyBackground = () => (!freeHtml && isAdmin ? 'bg-gray-200' : '')

  return (
    <div className={` ${classes.htmlContainer} `}>
      {freeHtml && <div dangerouslySetInnerHTML={{ __html: freeHtml }} />}
      {!freeHtml && isAdmin && (
        <div
          dangerouslySetInnerHTML={{ __html: freeHtml }}
          className={addEmptyBackground()}
        />
      )}
    </div>
  )
}

BasicHtmlFeatLite.propTypes = {
  customFields,
}

BasicHtmlFeatLite.label = 'HTML Básico - Beta'
BasicHtmlFeatLite.static = true

export default BasicHtmlFeatLite
