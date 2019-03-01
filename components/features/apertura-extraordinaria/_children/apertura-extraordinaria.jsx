import React from 'react'
import Data from './data'

const classes = {
  aperturae: 'aperturae padding-normal',
  aperturaeSection: 'aperturae__section text-center',
  aperturaeContent: 'aperturae__content',
  aperturaeTitle: 'aperturae__title',
  aperturaeSubtitle: 'aperturae__subtitle',
  aperturaeAuthor: 'aperturae__author',
  aperturaeMultimedia: 'aperturae__multimedia',
}

const AperturaExtraordinariaChildren = props => {
  const { customFields, data, website, editableField } = props
  const elem = new Data(customFields, data, website)

  return (
    <div
      className={`
            ${classes.aperturae} 
            aperturae--${elem.multimediaOrientation} 
            text-${elem.contentOrientation}
            `}
    >
      <div className={classes.aperturaeSection}>
        <a href={elem.sectionLink} {...editableField('section')}>
          {elem.section}
        </a>
      </div>
      <div className={classes.aperturaeContent}>
        <div className={classes.aperturaeTitle}>
          <a href={elem.link} {...editableField('title')}>
            {elem.title}
          </a>
        </div>
        <div className={classes.aperturaeSubtitle}>
          <a href={elem.link} {...editableField('subTitle')}>
            {elem.subTitle}
          </a>
        </div>
        <div className={classes.aperturaeAuthor}>
          <a href={elem.authorLink}>{elem.author}</a>
        </div>
      </div>
      <div className={classes.aperturaeMultimedia}>
        <img src={elem.multimedia} alt={elem.title} />
      </div>
    </div>
  )
}

export default AperturaExtraordinariaChildren
