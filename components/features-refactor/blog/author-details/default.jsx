import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorDetailsChildAuthorDetails from './_children/author-details'

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
    return <AuthorDetailsChildAuthorDetails {...data} />
  }
}

BlogAuthorDetails.label = 'Información del Autor'

BlogAuthorDetails.static = true

export default BlogAuthorDetails
