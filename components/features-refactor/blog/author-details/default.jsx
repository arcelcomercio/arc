import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorDetails from './_children/author-details'

@Consumer
class BlogAuthorDetails extends PureComponent {
  render() {
    const { globalContent } = this.props
    const { user: { description = '', first_name: firstName = '' } = {} } =
      globalContent || {}
    const data = {
      description,
      firstName,
      title: 'SOBRE EL AUTOR',
    }
    return <AuthorDetails {...data} />
  }
}

BlogAuthorDetails.label = 'Blog - Detalles del autor'
BlogAuthorDetails.static = true

export default BlogAuthorDetails
