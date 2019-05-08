import React from 'react'

const classes = {
  containerCard: 'br-stories-grid__container--card',
  image: 'br-stories-grid__image',
  detail: 'br-stories-grid__detail',
  category: 'br-stories-grid__category',
  titleDetail: 'br-stories-grid__title--detail',
}
const BlogRelatedStoriesGridChildCard = props => {
  const { title, image, sectionName, link, linkSection } = props
  return (
    <article className={classes.containerCard}>
      <figure className={classes.image}>
        <a href={link}>
          <picture>
            <source srcSet={image} media="(max-width: 640px)" />
            <img src={image} alt={title} />
          </picture>
        </a>
      </figure>
      <div className={classes.detail}>
        <div>
          <h3 className={classes.category}>
            <a href={linkSection}>{sectionName}</a>
          </h3>
        </div>
        <div>
          <h3 className={classes.titleDetail}>
            <a href={link}>{title}</a>
          </h3>
        </div>
      </div>
    </article>
  )
}

export default BlogRelatedStoriesGridChildCard
