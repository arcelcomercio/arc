import React from 'react'
import renderHTML from 'react-render-html'

const classes = {
  blockquote: 'pquote',
  pull: 'pquote pquote__pull',
}

const StoryContentChildBlockQuote = props => {
  const {
    data: { subtype, content_elements: contentElements, citation = {} } = {},
  } = props
  const [{ content = '' } = {}] = contentElements || []

  return (
    <blockquote
      className={subtype === 'blockquote' ? classes.blockquote : classes.pull}>
      <p>
        {content && renderHTML(content)}
        <br />
        {citation && renderHTML(citation.content)}
      </p>
    </blockquote>
  )
}

export default StoryContentChildBlockQuote
