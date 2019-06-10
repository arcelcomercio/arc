import React from 'react'

const classes = {
  title: 'story-header__news-title pd-left-20 pd-right-20 mg-bottom-20',
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
