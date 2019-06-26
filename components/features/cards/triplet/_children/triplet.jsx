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
    triplet:
      'triplet bg-white border-solid border-1 border-gray pl-20 pr-20 row-1 pt-10 pb-10',
    link: 'triplet__link text-lg',
    item: `triplet__item grid border-b-1 border-solid pt-10 pb-10 triplet__item--${multimediaOrientation}`,
    title: 'triplet__title overflow-hidden font-bold',
    oneline: 'triplet--oneline',
    twoline: 'triplet--twoline',
    threeline: 'triplet--threeline',
    author: 'triplet__author uppercase pt-10 text-xs text-gray-200',
    authorLink: 'triplet__link',
    multimedia: 'triplet__multimedia',
    mLink: 'w-full h-full block position-relative',
    image: 'object-cover w-full h-full',
    icon: `triplet__icon position-absolute flex items-center justify-center rounded title-md text-white`,
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
    <div className={classes.triplet}>
      {data.map((story, index) => (
        <article className={classes.item} key={`triplet-${story.index}`}>
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
          <div className={classes.author}>
            <a className={classes.authorLink} href={story.authorOrSectionLink}>
              {story.authorOrSection}
            </a>
          </div>
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
