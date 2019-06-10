import React from 'react'

const classes = {
  description: 'story-header__news-summary pd-left-20 pd-right-20 mg-bottom-20',
}

const StoryHeaderChildShareSubheading = data => {
  const {
    data: { subheadlines: description = {} },
  } = data || {}

  return (
    description && <h2 className={classes.description}> {description.basic}</h2>
  )
}

export default StoryHeaderChildShareSubheading
