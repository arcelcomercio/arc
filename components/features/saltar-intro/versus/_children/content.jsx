/* eslint-disable arrow-body-style */
import React from 'react'

const classes = {
  container: 'saltar-intro-versus__container',
  box: 'saltar-intro-versus__box',
  titleBox: 'saltar-intro-versus__title-box',
  title: 'saltar-intro-versus__title',
  figure: 'saltar-intro-versus__figure',
  image: 'saltar-intro-versus__image',
  section: 'saltar-intro-versus__section',
  linkImage: 'saltar-intro-versus__link-image',
  description: 'saltar-intro-versus__description',
  boxSeeMore: 'saltar-intro-versus__box-see-more',
  author: 'saltar-intro-versus__author',
  seeMore: 'saltar-intro-versus__see-more',
}

const Card = ({ link, lazyImage, isAdmin, image, title, author, chapter }) => {
  return (
    <article className={classes.box}>
      <figure className={classes.figure}>
        <a itemProp="url" href={link} className={classes.linkImage}>
          <img
            src={isAdmin ? image : lazyImage}
            data-src={image}
            alt={title}
            className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
          />
        </a>
      </figure>
      <div className={classes.section}>{chapter}</div>
      <a href={link} className={classes.description}>
        {title}
      </a>
      <div className={classes.author}>{author}</div>
    </article>
  )
}

export default ({ isAdmin, seeMoreLink, data, data2 }) => {
  const { title, image, link, lazyImage, author, chapter } = data
  const {
    title: title2,
    image: image2,
    link: link2,
    lazyImage: lazyImage2,
    author: author2,
    chapter: chapter2,
  } = data2
  return (
    <div className={classes.container}>
      <div className={classes.titleBox}>
        <span className={classes.title}>Versus</span>
      </div>
      <Card
        title={title}
        image={image}
        link={link}
        lazyImage={lazyImage}
        author={author}
        chapter={chapter}
        isAdmin={isAdmin}
      />
      <Card
        title={title2}
        image={image2}
        link={link2}
        author={author2}
        chapter={chapter2}
        lazyImage={lazyImage2}
        isAdmin={isAdmin}
      />

      <div className={classes.boxSeeMore}>
        <a itemProp="url" href={seeMoreLink} className={classes.seeMore}>
          Ver más
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 28.44 26.27">
            <path
              d="M24.79,14.26c0,5.59-4.55,10.09-10.09,10.09c-5.59,0-10.09-4.49-10.09-10.09c0-5.54,4.49-10.03,10.09-10.03
	C20.24,4.23,24.79,8.72,24.79,14.26z M22.18,14.26l-5.59-5.56c-0.61-0.61-1.51-0.61-2.14,0c-0.29,0.26-0.41,0.67-0.41,1.04
	c0,0.41,0.12,0.78,0.41,1.1c0,0,0.96,0.96,1.94,1.94H8.7c-0.81,0-1.51,0.64-1.51,1.48c0,0.84,0.7,1.51,1.51,1.51h7.68
	c-0.99,1.04-1.94,1.94-1.94,1.94c-0.29,0.32-0.41,0.72-0.41,1.1c0,0.41,0.12,0.75,0.41,1.07c0.64,0.61,1.54,0.61,2.14,0L22.18,14.26
	z"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
