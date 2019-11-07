import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../../../global-components/multimedia-icon'
import { createMarkup } from '../../../../utilities/helpers'

const TripletChildTriplet = props => {
  const {
    arcSite,
    editableField,
    isAdmin,
    data = [],
    multimediaOrientation = 'right',
    getSpace = "",
    getSpace2 = "",
    getSpace3 = "",
  } = props
  const classes = {
    triplet: 'triplet bg-white border-solid border-1 border-gray p-20 row-1',
    item: `triplet__item flex justify-between border-b-1 border-solid border-base pt-15 pb-15 triplet__item--${multimediaOrientation}`,
    title: 'triplet__title overflow-hidden text-lg line-h-sm',
    titleLink: 'triplet__title-link',
    oneline: 'triplet--oneline',
    twoline: 'triplet--twoline',
    threeline: 'triplet--threeline',
    author: 'triplet__author uppercase text-xs',
    authorLink: 'triplet__link text-gray-200',
    multimedia: 'triplet__multimedia overflow-hidden',
    mLink: 'w-full h-full block position-relative',
    image: 'object-cover w-full h-full',
    icon: `triplet__icon`,
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
      numline = classes.threeline
      break
  }

  return (
    <div role="list" className={classes.triplet}>
      {data.map((story, index) => {
        console.log("indice =>" + index)
        if (index === 0) {
          if (getSpace)
          return (
            <div dangerouslySetInnerHTML={createMarkup(getSpace)} />
          )
        }else if (index === 1) {
          if (getSpace2)
          return (
            <div dangerouslySetInnerHTML={createMarkup(getSpace2)} />
          )
        }else if (index === 2) {
          if (getSpace3)
          return (
            <div dangerouslySetInnerHTML={createMarkup(getSpace3)} />
          )
        }
       return (
        <article
          className={classes.item}
          role="listitem"
          key={`triplet-${story.index}`}>
          <div className={classes.information}>
            <h2 className={`${classes.title} ${numline}`}>
              <a
                className={classes.titleLink}
                href={story.websiteLink}
                {...editableField(`title${index + 1}`)}
                suppressContentEditableWarning>
                {story.title}
              </a>
            </h2>
            <address className={classes.author}>
              <a
                className={classes.authorLink}
                href={story.authorOrSectionLink}>
                {story.authorOrSection}
              </a>
            </address>
          </div>
          <figure className={classes.multimedia}>
            <a className={classes.mLink} href={story.websiteLink}>
              <img
                className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                src={
                  isAdmin
                    ? story.multimediaPortraitXS
                    : story.multimediaLazyDefault
                }
                data-src={story.multimediaPortraitXS}
                alt={story.title}
                title={story.title}
              />
              <Icon type={story.multimediaType} iconClass={classes.icon} />
            </a>
          </figure>
        </article>
       )
      })}
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
