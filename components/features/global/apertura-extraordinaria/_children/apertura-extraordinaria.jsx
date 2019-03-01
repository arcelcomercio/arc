import React from 'react'
import Data from './data'

const classes = {
  aperturaE: 'apertura-e padding-normal',
  aperturaESection: 'apertura-e__section text-center',
  aperturaEContent: 'apertura-e__content',
  aperturaETitle: 'apertura-e__title',
  aperturaESubtitle: 'apertura-e__subtitle',
  aperturaEAuthor: 'apertura-e__author',
  aperturaEMultimedia: 'apertura-e__multimedia',
}

const AperturaExtraordinariaChildren = props => {
  const { customFields, data, website, editableField } = props
  const elem = new Data(customFields, data, website)

  return (
    <div
      className={`
            ${classes.aperturaE} 
            apertura-e--${elem.multimediaOrientation} 
            text-${elem.contentOrientation}
            `}
    >
      <div className={classes.aperturaESection}>
        <a href={elem.sectionLink} {...editableField('section')}>
          {elem.section}
        </a>
      </div>
      <div className={classes.aperturaEContent}>
        <div className={classes.aperturaETitle}>
          <a href={elem.link} {...editableField('title')}>
            {elem.title}
          </a>
        </div>
        <div className={classes.aperturaESubtitle}>
          <a href={elem.link} {...editableField('subTitle')}>
            {elem.subTitle}
          </a>
        </div>
        <div className={classes.aperturaEAuthor}>
          <a href={elem.authorLink}>{elem.author}</a>
        </div>
      </div>
      <div className={classes.aperturaEMultimedia}>
        <img src={elem.multimedia} alt={elem.title} />
      </div>
    </div>
  )
}

export default AperturaExtraordinariaChildren
