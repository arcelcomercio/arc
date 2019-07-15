import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorTitle from './_children/author-title'
import { defaultImage } from '../../../utilities/helpers'

@Consumer
class BlogAuthorTitle extends PureComponent {
  render() {
    const { globalContent, arcSite, contextPath, deployment } = this.props
    const {
      user: {
        first_name: firstName = '',
        user_avatarb: {
          guid = defaultImage({
            deployment,
            contextPath,
            arcSite,
            size: 'sm',
          }),
        } = {},
      } = {},
      blog: { blogname = '', path = '' } = {},
    } = globalContent || {}

    const data = {
      firstName,
      guid,
      blogname,
      path: `/blog/${path}/`,
      // TODO:CARLOS: Verificar si estas urls general / al final. Sino, agregar
    }
    return <AuthorTitle {...data} />
  }
}

BlogAuthorTitle.label = 'Blog - Título del autor'
BlogAuthorTitle.static = true

export default BlogAuthorTitle
