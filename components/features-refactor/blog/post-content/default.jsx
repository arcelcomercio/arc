import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import renderHTML from 'react-render-html'
import { getFullDateIso8601 } from '../../../utilities/helpers'

const classes = {
  content: 'bp-content padding-normal',
  header: 'bp-content__header',
  author: 'bp-content__author',
  date: 'bp-content__date',
  news: 'bp-content__news',
}

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
      <div className={classes.content}>
        <div className={classes.header}>
          <span className={classes.author}>{firstName}</span>{' '}
          <time className={classes.date}>
            {formatDate && `${day}/${month}/${fullYear} ${hours}:${minutes}`}
          </time>
        </div>
        <div className={classes.news}>
          {postContent && renderHTML(postContent)}
        </div>
      </div>
    )
  }
}

BlogPostContent.label = 'Blog - Contenido del post'
BlogPostContent.static = true

export default BlogPostContent
