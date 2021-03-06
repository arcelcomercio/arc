import React from 'react'

const classes = {
  title:
    'story-header__news-title pr-20 pl-20 mb-20 primary-font line-h-xs text-gray-300 title-xl',
}

const StoryHeaderChildHeading = ({ title }) =>
  title && (
    <h1 itemProp="name" className={classes.title}>
      {' '}
      {title}
    </h1>
  )

export default StoryHeaderChildHeading
