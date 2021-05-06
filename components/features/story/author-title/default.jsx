import { useFusionContext } from 'fusion:context'
import React from 'react'

import ConfigParams from '../../../utilities/config-params'
import { defaultImage } from '../../../utilities/helpers'
import AuthorTitle from './_children/author-title'

const StoryAuthorTitle = () => {
  const { globalContent, arcSite, contextPath, deployment } = useFusionContext()
  const {
    credits: { by = [] },
    websites = {},
  } = globalContent || {}

  const {
    website_section: { path: pathSection = '' },
  } = websites[arcSite] || {}

  const {
    name = '',
    url = '',
    image: {
      url: urlImage = defaultImage({
        deployment,
        contextPath,
        arcSite,
        size: 'sm',
      }),
    } = {},
  } = by[0] || {}

  const data = {
    name,
    url,
    urlImage,
  }

  const isOpinionCorreo =
    ConfigParams.SITE_DIARIOCORREO === arcSite && pathSection === '/opinion'
  return isOpinionCorreo ? <AuthorTitle {...data} /> : <></>
}

StoryAuthorTitle.label = 'Notas - Título del autor'
StoryAuthorTitle.static = true

export default StoryAuthorTitle
