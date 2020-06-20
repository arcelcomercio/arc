import React from 'react'
import Markdown from 'react-markdown/with-html'

export default props => (
  <Markdown
    unwrapDisallowed
    disallowedTypes={['paragraph']}
    escapeHtml={false}
    {...props}
  />
)
