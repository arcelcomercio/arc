import React from 'react'

import { useFusionContext } from 'fusion:context'

import StorySocialChildSocial from './_children/social'

const classes = {
  story: 'story-header__header-social w-full text-white',
}

const StorySocial = () => {
  const { arcSite, globalContent: data } = useFusionContext()

  const { website_url: websiteLink = '' } = () => {
    const { websites = {} } = data || {}
    return websites[arcSite] || {}
  }

  return (
    <>
      <div className={classes.story}>
        <StorySocialChildSocial url={websiteLink} />
      </div>
    </>
  )
}

StorySocial.label = 'Artículo - redes sociales'
StorySocial.static = true

export default StorySocial
