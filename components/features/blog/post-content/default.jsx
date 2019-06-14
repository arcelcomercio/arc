import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import renderHTML from 'react-render-html'
import { getFullDateIso8601 } from '../../../utilities/helpers'

const classes = {
  content: 'bp-content p-20',
  header: 'bp-content__header uppercase inline-b mb-25 text-xs',
  author: 'bp-content__author font-bold pr-5',
  date: 'bp-content__date',
  story: 'bp-content__story full primary-font mb-30 title-sm line-h-sm',
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
        <div className={classes.story}>
          {postContent && renderHTML(postContent)}
        </div>
      </div>
    )
  }
}

BlogPostContent.label = 'Blog - Contenido del post'
BlogPostContent.static = true

export default BlogPostContent
