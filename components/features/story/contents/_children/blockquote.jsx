import React from 'react'
import { ELEMENT_BLOCKQUOTE } from '../../../../utilities/constants/element-types'

const classes = {
  blockquote: 'pquote',
  pull: 'pquote pquote__pull',
  text: 'pquote__text title-xs line-h-sm p-15 text-primary-color',
}

const StoryContentChildBlockQuote = props => {
  const {
    data: { subtype, content_elements: contentElements, citation = {} } = {},
  } = props
  const [{ content = '' } = {}] = contentElements || []

  return (
    <blockquote
      className={
        subtype === ELEMENT_BLOCKQUOTE ? classes.blockquote : classes.pull
      }>
      <div className={classes.text}>
        {content && (
          <p
            itemProp="description"
            dangerouslySetInnerHTML={{ __html: content }}></p>
        )}
        <br />
        {citation && (
          <p
            itemProp="description"
            dangerouslySetInnerHTML={{ __html: citation.content }}></p>
        )}
      </div>
    </blockquote>
  )
}

export default StoryContentChildBlockQuote
