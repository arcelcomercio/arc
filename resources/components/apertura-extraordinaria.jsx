import React from 'react'

const classes = {
  aperturaE: 'apertura-e padding-normal',
  aperturaESection: 'apertura-e__section text-center',
  aperturaEContent: 'apertura-e__content',
  aperturaETitle: 'apertura-e__title',
  aperturaESubtitle: 'apertura-e__subtitle',
  aperturaEAuthor: 'apertura-e__author',
  aperturaEMultimedia: 'apertura-e__multimedia',
}

const AperturaExtraordinaria = props => {
  const { data, multimediaOrientation='bottom', contentOrientation='left', editableField = () =>{} } = props
  return (
    <div
      className={`
            ${classes.aperturaE} 
            apertura-e--${multimediaOrientation} 
            text-${contentOrientation}
            `}>
      <div className={classes.aperturaESection}>
        <a href={data.sectionLink} {...editableField('section')}>
          {data.section}
        </a>
      </div>
      <div className={classes.aperturaEContent}>
        <div className={classes.aperturaETitle}>
          <a href={data.link} {...editableField('title')}>
            {data.title}
          </a>
        </div>
        <div className={classes.aperturaESubtitle}>
          <a href={data.link} {...editableField('subTitle')}>
            {data.subTitle}
          </a>
        </div>
        <div className={classes.aperturaEAuthor}>
          <a href={data.authorLink}>{data.author}</a>
        </div>
      </div>
      <div className={classes.aperturaEMultimedia}>
        <img src={data.multimedia} alt={data.title} />
      </div>
    </div>
  )
}

export default AperturaExtraordinaria
