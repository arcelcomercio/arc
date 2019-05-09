import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PostItem from './_children/post-item'
import Pagination from '../../../global-components/pagination'

@Consumer
class BlogAuthorList extends PureComponent {
  render() {
    const {
      contextPath,
      globalContent = {},
      globalContentConfig = {},
      arcSite = '',
    } = this.props

    const {
      posts = [],
      user: { first_name: author = '' } = {},
      blog: { count_posts: countPosts = '' } = {},
    } = globalContent || {}

    const {
      query: {
        posts_limit: postsLimit = '',
        posts_offset: postsOffset = '',
      } = {},
    } = globalContentConfig

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
            arcSite,
            contextPath,
          }
          return <PostItem key={post.ID} {...data} />
        })}
        <Pagination
          totalElements={countPosts}
          storiesQty={postsLimit}
          currentPage={postsOffset || 1}
        />
      </div>
    )
  }
}

BlogAuthorList.label = 'Blog - Posts por autor'
BlogAuthorList.static = true

export default BlogAuthorList
