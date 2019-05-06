import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import renderHTML from 'react-render-html'
import { getFullDateIso8601 } from '../../../utilities/helpers'

@Consumer
class BlogPostContent extends PureComponent {
  render() {
    const {
      globalContent: { post, user },
    } = this.props || {}
    const { post_content: postContent, post_date: postDate } = post || {}
    const { first_name: firstName } = user || {}
    const formatDate = getFullDateIso8601(postDate)
    const { day, month, fullYear, hours, minutes } = formatDate || {}
    return (
      <div className="bp-content padding-normal">
        <div className="bp-content__header">
          <span className="bp-content__author">{firstName}</span>{' '}
          <time className="bp-content__date">
            {formatDate && `${day}/${month}/${fullYear} ${hours}:${minutes}`}
          </time>
        </div>
        <div className="bp-content__news">
          {postContent && renderHTML(postContent)}
        </div>
      </div>
    )
  }
}

BlogPostContent.label = 'Blog - Contenido del post'
BlogPostContent.static = true

export default BlogPostContent
