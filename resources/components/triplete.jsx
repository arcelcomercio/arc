import React from 'react'
import { getIcon } from '../utilsJs/helpers'

export const Triplete = props => {
  const { data, multimediaOrientation = 'right'} = props
  const classes = {
    triplete: 'triplete',
    tripleteItem: `triplete__item triplete__item--${multimediaOrientation}`,
    tripleteTitle: 'triplete__title',
    tripleteAuthor: 'triplete__author',
    tripleteMultimedia: 'triplete__multimedia',
    tripleteIcon: 'triplete__icon'
  }
  return (
    <div className={classes.triplete}>
      {data.map(elem => (
        <article className={classes.tripleteItem}>
          <div className={classes.tripleteTitle}>
            <h2>
              <a href={elem.link}>{elem.title}</a>
            </h2>
          </div>
          <figure className={classes.tripleteMultimedia}>
            <a href={elem.link}>
              <img src={elem.multimedia} alt={elem.title} />
              {elem.multimediaType === 'basic' ||
                elem.multimediaType === '' ? (
                ''
              ) : (
                <span className={classes.tripleteIcon}>
                  {getIcon(elem.multimediaType)}
                </span>
              )}
            </a>
            <Icon iconClass={elem.iconClass} />
          </figure>
          <div className={classes.tripleteAuthor}>
            <a href={elem.authorOrSectionLink}>{elem.authorOrSection}</a>
          </div>
        </article>
      ))}
    </div>
  )
}

export const Icon = props => {
  const classes = {
    tripleteBoxIcon: 'triplete__box-icon',
    tripleteIcon: 'triplete__icon',
  }
  const html = (
    <span className={`${classes.tripleteBoxIcon}`}>
      <i
        className={`${classes.tripleteIcon} ${classes.tripleteIcon}--${
          props.iconClass
        }`}
      />
    </span>
  )
  return props.iconClass ? html : ''
}
