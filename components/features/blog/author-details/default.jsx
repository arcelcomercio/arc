import React from 'react'
import { useFusionContext } from 'fusion:context'

import AuthorDetails from './_children/author-details'

const BlogAuthorDetails = () => {
  const { globalContent } = useFusionContext()
  const { user: { description = '', first_name: firstName = '' } = {} } =
    globalContent || {}
  const data = {
    description,
    firstName,
    title: 'SOBRE EL AUTOR',
  }
  return <AuthorDetails {...data} />
}

BlogAuthorDetails.label = 'Blog - Detalles del autor'
BlogAuthorDetails.static = true

export default BlogAuthorDetails
