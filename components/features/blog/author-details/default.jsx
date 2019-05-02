import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorDetails from '../../../../resources/components/author-details'

@Consumer
class InfoAuthor extends PureComponent {
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

InfoAuthor.label = 'Información del Autor'

export default InfoAuthor
