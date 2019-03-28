import React, { Fragment } from 'react'
import renderHTML from 'react-render-html'

const classes = {
  blockquote: 'pquote',
  pull: 'pquote pquote__pull',
}

export default props => {
  const {
    data: { citation = {}, content_elements: elementos = [], subtype } = {},
  } = props

  return (
    <Fragment>
      <blockquote
        className={
          subtype === 'blockquote' ? classes.blockquote : classes.pull
        }>
        <p>
          {elementos && elementos[0] && renderHTML(elementos[0].content)}
          <br />
          {citation && renderHTML(citation.content)}
        </p>
      </blockquote>
    </Fragment>
  )
}
