import React from 'react'

import { useFusionContext } from 'fusion:context'

import StorySocialChildSocial from './_children/social'
import StoryData from '../../../utilities/story-data'

const classes = {
  story: 'story-header__header-social w-full text-white',
}

const StorySocial = () => {
  const { contextPath, globalContent: data } = useFusionContext()

  const { link } = new StoryData({
    data,
    contextPath,
  })

  return (
    <>
      <div className={classes.story}>
        <StorySocialChildSocial url={link} />
      </div>
    </>
  )
}

StorySocial.label = 'Artículo - redes sociales'

export default StorySocial
