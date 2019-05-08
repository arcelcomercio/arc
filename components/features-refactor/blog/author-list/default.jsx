import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PostItem from './_children/post-item'

@Consumer
class BlogAuthorList extends PureComponent {
  render() {
    const { globalContent, arcSite } = this.props
    const { posts = [], user: { first_name: author = '' } = {} } =
      globalContent || {}

    return (
      <div>
        {posts &&
          posts.map(post => {
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
              arcSite,
            }
            return <PostItem key={post.ID} {...data} />
          })}
      </div>
    )
  }
}

BlogAuthorList.label = 'Blog - Posts por autor'
BlogAuthorList.static = true

export default BlogAuthorList
