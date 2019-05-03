import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorDetailsComponent from '../../../../resources/components/author-details'

@Consumer
class AuthorDetails extends PureComponent {
  render() {
    const { globalContent } = this.props
    const { user: { description = '', first_name: firstName = '' } = {} } =
      globalContent || {}
    const data = {
      description,
      firstName,
      title: 'SOBRE EL AUTOR',
    }
    return <AuthorDetailsComponent {...data} />
  }
}

AuthorDetails.label = 'Información del Autor'

export default AuthorDetails
