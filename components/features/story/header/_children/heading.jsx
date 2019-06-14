import React from 'react'

const classes = {
  title:
    'story-header__news-title pl-20 pr-20 mb-20 primary-font text-gray-300',
}

const StoryHeaderChildHeading = props => {
  const {
    data: { headlines: titleElements = {} },
  } = props || {}

  return (
    titleElements && <h1 className={classes.title}> {titleElements.basic}</h1>
  )
}

export default StoryHeaderChildHeading
