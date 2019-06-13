import React from 'react'

const classes = {
  description: 'story-header__news-summary pd-left-20 pd-right-20 mg-bottom-20',
}

const StoryHeaderChildShareSubheading = data => {
  const { subTitle } = data || {}

  return subTitle && <h2 className={classes.description}> {subTitle}</h2>
}

export default StoryHeaderChildShareSubheading
