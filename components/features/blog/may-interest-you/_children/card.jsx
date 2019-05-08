import React from 'react'

const classes = {
  containerCard: 'bm-interest-you__container--card',
  image: 'bm-interest-you__image',
  detail: 'bm-interest-you__detail',
  category: 'bm-interest-you__category',
  titleDetail: 'bm-interest-you__title--detail',
}
const BlogMayInterestYouChildCard = props => {
  const { title, image, sectionName, link, linkSection } = props
  return (
    <article className={classes.containerCard}>
      <figure className={classes.image}>
        <a href={link}>
          <picture>
            <source srcset={image} media="(max-width: 640px)" />
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

export default BlogMayInterestYouChildCard
