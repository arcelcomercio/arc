import React from 'react'

const ContentBodyChildSpecial = props => {
  const { contentElements = [] } = props

  return contentElements.map(el => {
    return <p>{el.content}</p>
  })
}

export default ContentBodyChildSpecial
