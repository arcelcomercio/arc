import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorDetails from '../../../../resources/components/author-details'

@Consumer
class InfoAuthor extends PureComponent {
  render() {
    const { globalContent } = this.props
    const { user = [] } = globalContent || {}
    return <AuthorDetails data={user} />
  }
}

InfoAuthor.label = 'Información del Autor'

export default InfoAuthor
