import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PostItem from '../../../../resources/components/post-item'

@Consumer
class AuthorList extends PureComponent {
  render() {
    const { globalContent } = this.props

    const { posts = [] } = globalContent || {}

    const { user: { first_name: firstName = '' } = {} } = globalContent
    return (
      <div>
        {posts.map(post => {
          return (
            <PostItem key={post.ID} author={firstName} data={post} />
          )
        })}
      </div>
    )
  }
}

AuthorList.label = 'Listado de Post por autor'

export default AuthorList
