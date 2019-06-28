import React from 'react'

const NewElement = props => {
  const {
    nameElement = 'Element',
    propsNewElement = {},
    children: childrenElement = [],
  } = props
  const Element = React.createElement(
    nameElement,
    propsNewElement,
    childrenElement
  )
  return Element
}
export default NewElement
