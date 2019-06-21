import React from 'react'
import renderHTML from 'react-render-html'
import ConfigParams from '../../../../utilities/config-params'

const classes = {
  blockquote: 'pquote',
  pull: 'pquote pquote__pull',
  text: 'pquote pquote__text',
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
      <p className={classes.text}>
        {content && renderHTML(content)}
        <br />
        {citation && renderHTML(citation.content)}
      </p>
    </blockquote>
  )
}

export default StoryContentChildBlockQuote
