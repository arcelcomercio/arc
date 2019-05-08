import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import renderHTML from 'react-render-html'
import { getFullDateIso8601 } from '../../../utilities/helpers'

const classes ={
  bpcontent:'bp-content',
  pdnormal:'padding-normal',
  bpcontentheader:'bp-content__header',
  bpcontentauthor:'bp-content__author',
  bpcontentdate:'bp-content__date',
  bpcontentnews:'bp-content__news',
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
      <div className={`${classes.bpcontent} ${classes.pdnormal}`} >
        <div className= {classes.bpcontentheader}>
          <span className={classes.bpcontentauthor}>{firstName}</span>{' '}
          <time className={classes.bpcontentdate}>
            {formatDate && `${day}/${month}/${fullYear} ${hours}:${minutes}`}
          </time>
        </div>
        <div className={classes.bpcontentnews}>
          {postContent && renderHTML(postContent)}
        </div>
      </div>
    )
  }
}

BlogPostContent.label = 'Blog - Contenido del post'
BlogPostContent.static = true

export default BlogPostContent
