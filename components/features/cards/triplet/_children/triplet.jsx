import React from 'react'
import { getIcon } from '../../../../utilities/helpers'

export const TripletChildTriplet = props => {
  const { data, multimediaOrientation = 'right', arcSite } = props
  const classes = {
    triplet: 'triplet pd-left-20 pd-right-20',
    tripletItem: `triplet__item triplet__item--${multimediaOrientation}`,
    tripletTitle: 'triplet__title',
    oneline: 'triplet--oneline',
    twoline: 'triplet--twoline',
    threeline: 'triplet--threeline',
    tripletAuthor: 'triplet__author',
    tripletMultimedia: 'triplet__multimedia',
    tripletIcon: 'triplet__icon',
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
      {data.map(story => (
        <article className={classes.tripletItem}>
          <div className={`${classes.tripletTitle} ${numline}`}>
            <h2>
              <a href={story.link}>{story.title}</a>
            </h2>
          </div>
          <figure className={classes.tripletMultimedia}>
            <a href={story.link}>
              <img
                className="object-fit-cover full-width full-height"
                src={story.multimedia}
                alt={story.title}
              />
              {story.multimediaType === 'basic' ||
              story.multimediaType === '' ? (
                ''
              ) : (
                <span className={classes.tripletIcon}>
                  {getIcon(story.multimediaType)}
                </span>
              )}
            </a>
            {/* <Icon iconClass={story.iconClass} /> */}
          </figure>
          <div className={classes.tripletAuthor}>
            <a href={story.authorOrSectionLink}>{story.authorOrSection}</a>
          </div>
        </article>
      ))}
    </div>
  )
}

export const Icon = props => {
  const classes = {
    tripletBoxIcon: 'triplet__box-icon',
    tripletIcon: 'triplet__icon',
  }

  const html = (
    <span className={`${classes.tripletBoxIcon}`}>
      <i
        className={`${classes.tripletIcon} ${classes.tripletIcon}--${
          props.iconClass
        }`}
      />
    </span>
  )
  return props.iconClass ? html : ''
}
