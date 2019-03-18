/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react'
import renderHTML from 'react-render-html'

const styles = {
  blockquote: 'pquote',
  pull: 'pquote pquote__pull',
}

const Blockquote = props => {
  const { citation, content_elements: elementos, subtype } = props.data
  return (
    <Fragment>
      <blockquote
        className={subtype === 'blockquote' ? styles.blockquote : styles.pull}>
        <p>
          {elementos && elementos[0] && renderHTML(elementos[0].content)}
          <br />
          {citation && renderHTML(citation.content)}
        </p>
      </blockquote>
    </Fragment>
  )
}

export default Blockquote
