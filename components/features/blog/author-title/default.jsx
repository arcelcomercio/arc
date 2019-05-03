import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorTitleComponent from '../../../../resources/components/author-title'

@Consumer
class AuthorTitle extends PureComponent {
  render() {
    const { globalContent } = this.props
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
    }
    return (
      // Componente titulo
      <AuthorTitleComponent {...data} />
    )
  }
}

AuthorTitle.label = 'Titulo autor'
AuthorTitle.static = true

export default AuthorTitle
