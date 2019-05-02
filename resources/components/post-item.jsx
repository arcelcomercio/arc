import React from 'react'
import { formatDate } from '../utilsJs/helpers'

const classes = {
  container: 'post-item__container',
  date: 'post-item__date',
  content: 'post-item__content',
  figure: 'post-item__figure',
  image: 'post-item__image',
  description: 'post-item__description',
  title: 'post-item__title',
  author: 'post-item__author',
}

const PostItem = props => {
  const {
    data: { post_title, post_permalink, post_date, post_thumbnail } = {},
  } = props
  const { author } = props
  const DEFAULT_IMG =
    'https://img.gestion.pe/bundles/appcms/images/gestion/default_blog.jpg'

  return (
    <article className={classes.container}>
      <div className={classes.date}>
        <p>{formatDate(post_date)}</p>
      </div>
      <div className={classes.content}>
        <figure className={classes.figure}>
          <img
            className={classes.image}
            src={post_thumbnail.guid || DEFAULT_IMG}
            alt={author || 'Gestion'}
          />
        </figure>
        <div className={classes.description}>
          <a href={post_permalink}>
            <h3 className={classes.title}>{post_title}</h3>
          </a>
          <a href={post_permalink}>
            <h5 className={classes.author}>{author}</h5>
          </a>
        </div>
      </div>
    </article>
  )
}

export default PostItem
