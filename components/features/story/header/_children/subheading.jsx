import React from 'react'

const classes = {
  description:
    'story-header__news-summary pl-20 pr-20 mb-20 secondary-font text-gray-300',
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
