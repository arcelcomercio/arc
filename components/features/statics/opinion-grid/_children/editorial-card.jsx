import React from 'react'

const classes = {
  card: 'p-5',
  wrapper: 'editorial-card__wrapper flex flex-col pt-15 pr-10 pb-15 pl-20',
  group: 'editorial-card__group uppercase font-thin mb-5',
  name: 'editorial-card__name block uppercase primary-font font-bold mb-15',
  description: 'flex',
  imageBox: 'flex position-relative items-start',
  image: 'editorial-card__image object-cover object-top',
  detailsBox: 'pr-5 pl-10',
  title: 'editorial-card__title block font-normal primary-font',
}

const OpinionGridEditorialCard = ({ data: story }) => {
  return (
    <div role="listitem" className={classes.card}>
      <div className={classes.wrapper}>
        <h4 className={classes.group}>{story.section}</h4>
        <h2>
          <a className={classes.name} href={story.link}>
            {story.title}
          </a>
        </h2>
        <div className={classes.description}>
          <div className={classes.imageBox}>
            <a href={story.link}>
              <img
                className={classes.image}
                src={story.authorImage}
                alt={story.author}
              />
            </a>
          </div>
          <div className={classes.detailsBox}>
            <p className={classes.title}>{story.subTitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpinionGridEditorialCard
