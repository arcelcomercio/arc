import { useAppContext } from 'fusion:context'
import * as React from 'react'

import StoryData from '../../../utilities/story-data'
import ElePrincipal from './_children/amp-ele-principal'
import StoryContentChildVideoJwplayer from './_children/amp-video-jwplayer'

const StoryMultimediaLte = () => {
  const {
    arcSite,
    contextPath,
    deployment = {},
    globalContent: data,
    siteProperties: { siteUrl },
  } = useAppContext()

  const { promoItemJwplayer, promoItems } = new StoryData({
    data,
    contextPath,
    deployment,
    arcSite,
  })

  return (
    <>
      {promoItemJwplayer?.key ? (
        <StoryContentChildVideoJwplayer data={promoItemJwplayer} />
      ) : (
        <>
          {promoItems && <ElePrincipal data={promoItems} siteUrl={siteUrl} />}
        </>
      )}
    </>
  )
}

StoryMultimediaLte.label = 'Artículo - multimedia '
StoryMultimediaLte.static = true

export default StoryMultimediaLte
