import React from 'react'

const classes = {
  card: 'author-card p-5',
  wrapper: 'author-card__wrapper flex position-relative md:flex-row-reverse',
  imageBox: `author-card__box-image flex items-start position-relative pt-15 pb-15 pr-10 pl-10 md:p-0 md:right-0 md:bottom-0`,
  image:
    'author-card__image bg-white object-cover object-top rounded md:w-full md:h-full',
  detailsBox: 'w-full pt-15 pr-0 pb-10 pl-20',
  name: `author-card__name block mb-15 secondary-font font-bold title-sm text-gray-300 line-h-xs`,
  group: 'author-card__group uppercase font-thin mb-5 text-xs',
  title: `author-card__title block secondary-font text-lg text-gray-300 line-h-sm`,
}

const OpinionGridAuthorCard = ({ data: story }) => {
  return (
    <div role="listitem" className={classes.card}>
      <div className={classes.wrapper}>
        <div className={classes.imageBox}>
          <img
            className={classes.image}
            src={story.authorImage}
            alt={story.author}
          />
        </div>
        <div className={classes.detailsBox}>
          <h2>
            <a className={classes.name} href={story.authorLink}>
              {story.author}
            </a>
          </h2>
          <p className={classes.group}>{story.section}</p>
          <h2>
            <a className={classes.title} href={story.link}>
              {story.title}
            </a>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default OpinionGridAuthorCard
