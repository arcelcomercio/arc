import React from 'react'
import { ResizeImageUrl, getFullDateIso8601 } from '../utilsJs/helpers'

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

const PostItem = ({
  postTitle = '',
  postPermaLink = '',
  postDate = '',
  image = '',
  author = '',
  arcSite = '',
}) => {
  const { day, month, fullYear } = getFullDateIso8601(postDate)
  const postFormatDate = `${day}/${month}/${fullYear}`
  const DEFAULT_IMG =
    'https://img.gestion.pe/bundles/appcms/images/gestion/default_blog.jpg'

  return (
    <article className={classes.container}>
      <div className={classes.date}>
        <p>{postFormatDate}</p>
      </div>
      <div className={classes.content}>
        <figure className={classes.figure}>
          <img
            className={classes.image}
            src={
              ResizeImageUrl(arcSite, image, '3:4', '232x140') || DEFAULT_IMG
            }
            alt={author || 'Gestion'}
          />
        </figure>
        <div className={classes.description}>
          <a href={postPermaLink}>
            <h3 className={classes.title}>{postTitle}</h3>
          </a>
          <a href={postPermaLink}>
            <h5 className={classes.author}>{author}</h5>
          </a>
        </div>
      </div>
    </article>
  )
}

PostItem.static = true

export default PostItem
