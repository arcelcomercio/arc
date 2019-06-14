import React from 'react'

const classes = {
  containerCard: 'br-stories-grid__card',
  imageContainer: 'br-stories-grid__image-container overflow-hidden',
  imageLink: 'br-stories-grid__image-link text-gray-300',
  image: 'w-full h-full',
  detail: 'br-stories-grid__detail',
  categoryContainer: 'br-stories-grid__category-container text-center text-xs',
  categoryLink: 'br-stories-grid__category-link text-gray-200',
  detailTitle:
    'br-stories-grid__detail-title position-relative text-center overflow-hidden font-bold text-md',
  detailTitleLink: 'br-stories-grid__detail-title-link line-h-sm',
}
const BlogRelatedPostsGridChildCard = ({
  title,
  imageLink,
  sectionName,
  postLink,
  sectionLink,
}) => {
  return (
    <article role="listitem" className={classes.containerCard}>
      <figure className={classes.imageContainer}>
        <a className={classes.imageLink} href={postLink}>
          <picture>
            <source srcSet={imageLink} media="(max-width: 640px)" />
            <img className={classes.image} src={imageLink} alt={title} />
          </picture>
        </a>
      </figure>
      <div className={classes.detail}>
        <div>
          <h3 className={classes.categoryContainer}>
            <a className={classes.categoryLink} href={sectionLink}>
              {sectionName}
            </a>
          </h3>
        </div>
        <div>
          <h3 className={classes.detailTitle}>
            <a className={classes.detailTitleLink} href={postLink}>
              {title}
            </a>
          </h3>
        </div>
      </div>
    </article>
  )
}

export default BlogRelatedPostsGridChildCard
