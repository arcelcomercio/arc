import React from 'react'

const classes = {
  containerCard: 'br-stories-grid__card',
  image: 'br-stories-grid__image overflow-hidden',
  detail: 'br-stories-grid__detail',
  category: 'br-stories-grid__category text-center',
  detailTitle:
    'br-stories-grid__detail-title position-relative text-center overflow-hidden',
}
const BlogRelatedPostsGridChildCard = ({
  title,
  imageLink,
  sectionName,
  postLink,
  sectionLink,
}) => {
  return (
    <article className={classes.containerCard}>
      <figure className={classes.image}>
        <a href={postLink}>
          <picture>
            <source srcSet={imageLink} media="(max-width: 640px)" />
            <img src={imageLink} alt={title} />
          </picture>
        </a>
      </figure>
      <div className={classes.detail}>
        <div>
          <h3 className={classes.category}>
            <a href={sectionLink}>{sectionName}</a>
          </h3>
        </div>
        <div>
          <h3 className={classes.detailTitle}>
            <a href={postLink}>{title}</a>
          </h3>
        </div>
      </div>
    </article>
  )
}

export default BlogRelatedPostsGridChildCard
