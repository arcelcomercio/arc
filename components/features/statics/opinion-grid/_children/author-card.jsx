import React from 'react'
import withSizes from 'react-sizes'

const classes = {
  card: 'author-card p-5 position-relative',
  wrapper:
    'author-card__wrapper flex flex-col items-center lg:pt-25 md:pt-25 xs:pt-25 pt-25 pb-60 md:pb-25 lg:pb-25',
  imageBox: 'flex flex-col items-center ',
  image: 'author-card__image bg-white',
  defaultImage:'author-card__image-default icon-marca',
  detailsBox: 'author-card__detail flex flex-col items-center',
  group: 'author-card__group uppercase font-thin mb-5 text-xs',
  name:
    'author-card__name block mb-15 secondary-font font-bold title-sm text-gray-300 line-h-xs',
  title:
    'block secondary-font text-lg text-gray-300 line-h-sm font-bold md:font-normal',
  icono: 'author-card__icono icon-marca position-absolute mb-20',
  iconImg: 'author-card__icon-img',
}

const OpinionGridAuthorCard = ({
  isMobile,
  data: story,
}) => {
  // const opinionImageDefault = deployment(
  //   `${contextPath}/resources/dist/${arcSite}/images/authorOpinion.png`
  // )

  const existImageAuthor = story.authorImage.includes('author.png')
  
  return (
    <article role="listitem" className={classes.card}>
      <div className={classes.wrapper}>
        <figure className={classes.imageBox}>
          {existImageAuthor ? (
            <i className={classes.defaultImage}></i>
          ) : (
            <img
              className={classes.image}
              src={story.authorImage}
              alt={story.author}
            />
          )}
        </figure>
        <div className={classes.detailsBox}>
          {isMobile ? (
            <>
              <h3>
                <a className={classes.name} href={story.authorLink}>
                  {story.author}
                </a>
              </h3>
              <p className={classes.group}>{story.authorOccupation}</p>
            </>
          ) : (
            <>
              <h3>
                <a className={classes.name} href={story.authorLink}>
                  {story.author}
                </a>
              </h3>
              <p className={classes.group}>{story.authorOccupation}</p>
            </>
          )}
          <h2>
            <a className={classes.title} href={story.link}>
              {story.title}
            </a>
          </h2>
        </div>
        <i className={classes.icono}></i>
      </div>
    </article>
  )
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 640,
})

export default withSizes(mapSizesToProps)(OpinionGridAuthorCard)
