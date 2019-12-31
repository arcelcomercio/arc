import React from 'react'
import { useFusionContext } from 'fusion:context'

import AuthorTitle from './_children/author-title'
import { defaultImage } from '../../../utilities/helpers'

const BlogAuthorTitle = () => {
  const { globalContent, arcSite, contextPath, deployment } = useFusionContext()

  const {
    user: {
      first_name: firstName = '',
      user_avatarb: {
        resized_urls: {
          author_sm: authorImg = defaultImage({
            deployment,
            contextPath,
            arcSite,
            size: 'sm',
          }),
        } = {},
      } = {},
    } = {},
    blog: { blogname: blogName = '', path = '' } = {},
  } = globalContent || {}

  const data = {
    firstName,
    authorImg,
    blogName,
    path: `/blog/${path}/`,
    // TODO:CARLOS: Verificar si estas urls general / al final. Sino, agregar
  }
  return <AuthorTitle {...data} />
}

BlogAuthorTitle.label = 'Blog - Título del autor'
BlogAuthorTitle.static = true

export default BlogAuthorTitle
