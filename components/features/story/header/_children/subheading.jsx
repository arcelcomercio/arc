import React from 'react'

const classes = {
  description:
    'story-header__news-summary pl-20 pr-20 mb-20 secondary-font line-h-sm text-gray-300',
}

const StoryHeaderChildShareSubheading = data => {
  const { subTitle } = data || {}

  return subTitle && <h2 className={classes.description}> {subTitle}</h2>
}

export default StoryHeaderChildShareSubheading
