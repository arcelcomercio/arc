import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PostItem from '../../../../resources/components/post-item'
import Paginacion from '../../../../resources/components/paginacion_numerica'

@Consumer
class AuthorList extends PureComponent {
  render() {
    const {
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

    console.log(this.props)
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
          }
          return <PostItem key={post.ID} {...data} />
        })}
        <Paginacion
          totalElements={countPosts}
          storiesQty={postsLimit}
          currentPage={postsOffset || 1}
        />
      </div>
    )
  }
}

AuthorList.label = 'Listado de Post por autor'

export default AuthorList
