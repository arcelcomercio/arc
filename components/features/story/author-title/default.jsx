import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorTitle from './_children/author-title'
import { defaultImage } from '../../../utilities/helpers'
import ConfigParams from '../../../utilities/config-params'

@Consumer
class StoryAuthorTitle extends PureComponent {
  render() {
    const { globalContent, arcSite, contextPath, deployment } = this.props
    const {
      credits: { by = [] },
      taxonomy: { primary_section: { path: pathSection = '' } = {} } = {},
    } = globalContent || {}

    const {
      name,
      url,
      image: {
        url: urlImage = defaultImage({
          deployment,
          contextPath,
          arcSite,
          size: 'sm',
        }),
      },
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
}

StoryAuthorTitle.label = 'Notas - Título del autor'
StoryAuthorTitle.static = true

export default StoryAuthorTitle
