/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react'
import renderHTML from 'react-render-html'

export default props => <Fragment>{props && renderHTML(props.data)}</Fragment>
