import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorTitle from './_children/author-title'

@Consumer
class BlogAuthorTitle extends PureComponent {
  render() {
    const { globalContent, arcSite, contextPath } = this.props
    const {
      user: {
        first_name: firstName = '',
        user_avatarb: { guid = '' } = {},
      } = {},
      blog: { blogname = '', path = '' } = {},
    } = globalContent || {}

    const data = {
      firstName,
      guid,
      blogname,
      path,
      arcSite,
      contextPath,
    }
    return <AuthorTitle {...data} />
  }
}

BlogAuthorTitle.label = 'Blog - Título del autor'
BlogAuthorTitle.static = true

export default BlogAuthorTitle
