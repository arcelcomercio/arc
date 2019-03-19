/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react'
import renderHTML from 'react-render-html'

const Video = props => {
  return (
    <Fragment>
      {props && renderHTML(props.data)}
    </Fragment>
  )
}

export default Video
