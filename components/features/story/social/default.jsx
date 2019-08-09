import React from 'react'

import { useFusionContext } from 'fusion:context'

import StorySocialChildSocial from './_children/social'
import StorySocialChildSocialGestion from './_children/social-gestion' // TODO Salida de gestion
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'

const classes = {
  story: 'w-full text-white',
}

const StorySocial = () => {
  const { contextPath, globalContent: data, arcSite } = useFusionContext()

  const { link } = new StoryData({
    data,
    contextPath,
  })

  return (
    <>
      <div className={classes.story}>
        {arcSite !== ConfigParams.SITE_GESTION ? ( // TODO Salida de gestion 30 de julio
          <StorySocialChildSocial url={link} />
        ) : (
          <StorySocialChildSocialGestion url={link} />
        )}
      </div>
    </>
  )
}

StorySocial.label = 'Artículo - redes sociales'

export default StorySocial
