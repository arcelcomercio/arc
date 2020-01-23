import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { Parser } from 'html-to-react'
import { getFullDateIso8601 } from '../../../utilities/helpers'
import Ads from '../../../global-components/ads'

const classes = {
  content: 'post-content bg-white p-20',
  header: 'post-content__header uppercase inline-block mb-25 text-md',
  author: 'post-content__author font-bold pr-5',
  date: 'post-content__date text-gray-200',
  story: 'post-content__story full primary-font mb-30 title-sm line-h-sm',
}

@Consumer
class BlogPostContent extends PureComponent {
  render() {
    const {
      globalContent,
      siteProperties: { isDfp = false },
    } = this.props
    const {
      post: { post_content: postContent, post_date: postDate } = {},
      user: { first_name: firstName } = {},
    } = globalContent || {}
    const formatDate = getFullDateIso8601(postDate)
    const { day, month, fullYear, hours, minutes } = formatDate || {}

    const htmlParser = new Parser()

    return (
      <div className={classes.content}>
        <div className={classes.header}>
          <span className={classes.author}>{firstName}</span>{' '}
          <time className={classes.date}>
            {formatDate && `${day}/${month}/${fullYear} ${hours}:${minutes}`}
          </time>
        </div>
        <div className={classes.story} id="contenedor">
          <Ads adElement="inline" isDesktop isMobile={false} isDfp={isDfp} />
          <Ads
            adElement="movil_video"
            isDesktop={false}
            isMobile
            isDfp={isDfp}
          />
          <Ads adElement="movil3" isDesktop={false} isMobile isDfp={isDfp} />
          <section>{postContent && htmlParser.parse(postContent)}</section>
        </div>
      </div>
    )
  }
}

BlogPostContent.label = 'Blog - Contenido del post'
BlogPostContent.static = true

export default BlogPostContent
