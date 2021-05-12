import * as React from 'react'

import StoryData from '../utilities/story-data'

const classes = {
  storySimple: `story-simple__container`,
  title: 'story-simple__title',
  subtitle: 'story-simple__subtitle',
}

const StoriesList = ({ data, deployment, contextPath, arcSite }) => {
  const element = new StoryData({
    data,
    deployment,
    contextPath,
    arcSite,
  })

  return (
    <div className={classes.storySimple}>
      <h2 className={classes.title}>
        <a href={element.primarySectionLink}>
          {`///${element.primarySection}`}
        </a>
      </h2>
      <p itemProp="description" className={classes.subtitle}>
        <a itemProp="url" href={element.websiteLink}>
          {element.title}
        </a>
      </p>
    </div>
  )
}

export default React.memo(StoriesList)
