import React from 'react'

const classes = {
  title: 'story-header__news-title pd-left-20 pd-right-20 mg-bottom-20',
}

const StoryHeaderChildHeading = props => {
  const { title } = props || {}

  return title && <h1 className={classes.title}> {title}</h1>
}

export default StoryHeaderChildHeading
