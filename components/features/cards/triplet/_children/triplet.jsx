import React from 'react'
import PropTypes from 'prop-types'
import { getMultimediaIcon } from '../../../../utilities/helpers'

const TripletChildTriplet = props => {
  const {
    arcSite,
    editableField,
    data = [],
    multimediaOrientation = 'right',
  } = props
  const classes = {
    triplet: 'triplet bg-white border-solid border-1 border-gray p-20 row-1',
    link: 'triplet__title-link text-lg',
    item: `triplet__item flex justify-between border-b-1 border-solid pt-15 pb-15 triplet__item--${multimediaOrientation}`,
    title: 'triplet__title overflow-hidden',
    oneline: 'triplet--oneline',
    twoline: 'triplet--twoline',
    threeline: 'triplet--threeline',
    author: 'triplet__author uppercase text-xs text-gray-200',
    authorLink: 'triplet__link text-gray-200',
    multimedia: 'triplet__multimedia',
    mLink: 'w-full h-full block position-relative',
    image: 'object-cover w-full h-full',
    icon: `triplet__icon position-absolute flex items-center justify-center rounded title-md text-white`,
    information: `triplet__information flex justify-between flex-col`,
  }

  let numline = ''

  switch (arcSite) {
    case 'elcomercio':
      numline = classes.threeline
      break
    case 'depor':
      numline = classes.twoline
      break
    default:
      numline = classes.twoline
      break
  }

  return (
    <div role="list" className={classes.triplet}>
      {data.map((story, index) => (
        <article
          className={classes.item}
          role="listitem"
          key={`triplet-${story.index}`}>
          <div className={classes.information}>
            <div className={`${classes.title} ${numline}`}>
              <h2>
                <a
                  className={classes.link}
                  href={story.link}
                  {...editableField(`title${index + 1}`)}
                  suppressContentEditableWarning>
                  {story.title}
                </a>
              </h2>
            </div>
            <address className={classes.author}>
              <a
                className={classes.authorLink}
                href={story.authorOrSectionLink}>
                {/*  {story.authorOrSection} */}Aurtor autor
              </a>
            </address>
          </div>
          <figure className={classes.multimedia}>
            <a className={classes.mLink} href={story.link}>
              <img
                className={classes.image}
                src={story.multimedia}
                alt={story.title}
              />
              {getMultimediaIcon(story.multimediaType) && (
                <i
                  className={`${getMultimediaIcon(story.multimediaType)} ${
                    classes.icon
                  }`}
                />
              )}
            </a>
          </figure>
        </article>
      ))}
    </div>
  )
}

TripletChildTriplet.propTypes = {
  arcSite: PropTypes.string,
  editableField: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string,
      multimedia: PropTypes.string,
      multimediaType: PropTypes.string,
      authorOrSection: PropTypes.string,
      authorOrSectionLink: PropTypes.string,
    })
  ),
  multimediaOrientation: PropTypes.string,
}

export default TripletChildTriplet
