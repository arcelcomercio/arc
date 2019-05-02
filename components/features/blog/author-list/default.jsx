import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PostItem from '../../../../resources/components/post-item'

@Consumer
class AuthorList extends PureComponent {
  render() {
    const { globalContent } = this.props

    const { posts = [] } = globalContent || {}

    const { user: { first_name: author = '' } = {} } = globalContent
    return (
      <div>
        {posts.map(post => {
          const {
            post_title: postTitle,
            post_permalink: postPermaLink,
            post_date: postDate,
            post_thumbnail: { guid: image = '' } = {},
          } = post
          const data = {
            postTitle,
            postPermaLink,
            postDate,
            image,
            author,
          }
          return <PostItem key={post.ID} {...data} />
        })}
      </div>
    )
  }
}

AuthorList.label = 'Listado de Post por autor'

export default AuthorList
