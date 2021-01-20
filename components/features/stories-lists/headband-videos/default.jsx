import React from 'react'
// import { useFusionContext } from 'fusion:context'
import customFieldsInput from './_dependencies/custom-fields'
import ProcessItem from './_children/process-item'

const classes = {
  container: 'headband__container',
}

const HeadbandVideo = props => {
  // const { contextPath, arcSite } = useFusionContext()

  const {
    customFields: {
      story1 = '',
      story2 = '',
      story3 = '',
      story4 = '',
      story5 = '',
      live1 = false,
      live2 = false,
      live3 = false,
      live4 = false,
      live5 = false,
    } = {},
  } = props

  const stories = [story1, story2, story3, story4, story5]
  const storiesLive = [live1, live2, live3, live4, live5]

  return (
    <div className={classes.container}>
      cintillo video
      {stories.map((url, index) => {
        const uniqueKey = Math.floor(Math.random() * index)
        return (
          <ProcessItem
            storyUrl={url}
            storyLive={storiesLive[0]}
            key={`cintillo-p21tv-${uniqueKey}`}
          />
        )
      })}
    </div>
  )
}

HeadbandVideo.propTypes = {
  customFields: customFieldsInput,
}

HeadbandVideo.label = 'Cintillo de Videos'
HeadbandVideo.static = true

export default HeadbandVideo
