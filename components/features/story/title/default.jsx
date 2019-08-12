import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryTitleChildHeading from './_children/heading'
import StoryTitleChildShareSubheading from './_children/subheading'
import StoryData from '../../../utilities/story-data'

const classes = {
  story: 'w-full text-white ',
}

const StoryTitle = () => {
  const { contextPath, globalContent: data } = useFusionContext()

  const { title, subTitle } = new StoryData({
    data,
    contextPath,
  })

  const parameters = { title, subTitle }

  return (
    <>
      <div className={classes.story}>
        <StoryTitleChildHeading {...parameters} />
        <StoryTitleChildShareSubheading {...parameters} />
      </div>
    </>
  )
}

StoryTitle.label = 'Artículo - Título'
StoryTitle.static = true

export default StoryTitle
