import React from 'react'

const classes = {
  container: 'position-relative',
  containerText: 'position-absolute',
}

const TitleWithImageChildSpecial = props => {
  const {
    storyTitle = '',
    imageStory: { resized_urls: { landscape_xl: landscapeXL = '' } = {} } = {},
    storySubtitle = '',
  } = props

  return (
    <div className={classes.container}>
      <picture>
        <img src={landscapeXL} alt="" />
      </picture>
      <div className={classes.containerText}>
        <h1>{storyTitle}</h1>
        <h2>{storySubtitle}</h2>
      </div>
    </div>
  )
}

export default TitleWithImageChildSpecial
