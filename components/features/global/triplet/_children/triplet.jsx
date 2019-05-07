import React from 'react'
import { getIcon } from '../../../../utilities/helpers'

export const Triplet = props => {
  const { data, multimediaOrientation = 'right', arcSite } = props
  const classes = {
    triplet: 'triplet',
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
      {data.map(elem => (
        <article className={classes.tripletItem}>
          <div className={`${classes.tripletTitle} ${numline}`}>
            <h2>
              <a href={elem.link}>{elem.title}</a>
            </h2>
          </div>
          <figure className={classes.tripletMultimedia}>
            <a href={elem.link}>
              <img src={elem.multimedia} alt={elem.title} />
              {elem.multimediaType === 'basic' || elem.multimediaType === '' ? (
                ''
              ) : (
                <span className={classes.tripletIcon}>
                  {getIcon(elem.multimediaType)}
                </span>
              )}
            </a>
            {/* <Icon iconClass={elem.iconClass} /> */}
          </figure>
          <div className={classes.tripletAuthor}>
            <a href={elem.authorOrSectionLink}>{elem.authorOrSection}</a>
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
