import React from 'react'
import withSizes from 'react-sizes'

const classes = {
  card: 'author-card p-5 position-relative',
  wrapper:
    'author-card__wrapper flex flex-col items-center lg:pt-25 md:pt-25 xs:pt-25 pt-25 pb-60 md:pb-25 lg:pb-25',
  imageBox: 'flex flex-col items-center ',
  image: 'author-card__image bg-white',
  detailsBox: 'author-card__detail flex flex-col items-center',
  group: 'author-card__group uppercase font-thin mb-5 text-xs',
  name:
    'author-card__name block mb-15 secondary-font font-bold title-sm text-gray-300 line-h-xs',
  title:
    'block secondary-font text-lg text-gray-300 line-h-sm font-bold md:font-normal',
  icono: 'author-card__icono bg-white position-absolute mb-20',
  iconImg: 'author-card__icon-img',
  // card: 'author-card p-5',
  // wrapper:
  //   'author-card__wrapper flex position-relative h-full md:flex-row-reverse',
  // imageBox: `author-card__box-image flex items-start position-relative pt-15 pb-15 pr-15 pl-15 md:p-0 md:right-0 md:bottom-0`,
  // image:
  //   'author-card__image bg-white object-cover object-top rounded md:w-full md:h-full',
  // detailsBox: 'w-full pt-15 pr-0 pb-10 md:pl-20',
  // group: 'author-card__group uppercase font-thin mb-5 text-xs',
  // name: `author-card__name block mb-15 secondary-font font-bold title-sm text-gray-300 line-h-xs`,
  // title: `author-card__title block secondary-font text-lg text-gray-300 line-h-sm font-bold md:font-normal`,
}

const OpinionGridAuthorCard = ({
  isMobile,
  data: story,
  deployment,
  contextPath,
  arcSite,
}) => {
  const opinionImageDefault = deployment(
    `${contextPath}/resources/dist/${arcSite}/images/authorOpinion.png`
  )

  const opinionImage = story.authorImage.includes('author.png')
    ? opinionImageDefault
    : story.authorImage
  return (
    <article role="listitem" className={classes.card}>
      <div className={classes.wrapper}>
        <figure className={classes.imageBox}>
          <img
            className={classes.image}
            src={opinionImage}
            alt={story.author}
          />
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
        {/* maria */}
        <i></i>
      </div>
    </article>
  )
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 640,
})

export default withSizes(mapSizesToProps)(OpinionGridAuthorCard)
