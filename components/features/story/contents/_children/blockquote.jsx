import React from 'react'
import ConfigParams from '../../../../utilities/config-params'

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
        subtype === ConfigParams.ELEMENT_BLOCKQUOTE
          ? classes.blockquote
          : classes.pull
      }>
      <div className={classes.text}>
        {content && <p dangerouslySetInnerHTML={{ __html: content }}></p>}
        <br />
        {citation && (
          <p dangerouslySetInnerHTML={{ __html: citation.content }}></p>
        )}
      </div>
    </blockquote>
  )
}

export default StoryContentChildBlockQuote
