import React from 'react'
import { useFusionContext } from 'fusion:context'

import AuthorTitle from './_children/author-title'
import { defaultImage } from '../../../utilities/helpers'
import ConfigParams from '../../../utilities/config-params'

const StoryAuthorTitle = () => {
  const { globalContent, arcSite, contextPath, deployment } = useFusionContext()
  const {
    credits: { by = [] },
    taxonomy: { primary_section: { path: pathSection = '' } = {} } = {},
  } = globalContent || {}

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
