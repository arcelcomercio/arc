import React from 'react'

const AperturaExtraordinaria = props => {
  const {
    data,
    multimediaOrientation = 'bottom',
    contentOrientation = 'left',
    isSection = false,
  } = props

  const classes = {
    aperturaE: `apertura-e padding-normal apertura-e--${multimediaOrientation} text-${contentOrientation}`,
    aperturaESection: 'apertura-e__section text-center',
    aperturaEContent: 'apertura-e__content',
    aperturaETitle: 'apertura-e__title',
    aperturaESubtitle: 'apertura-e__subtitle',
    aperturaEAuthor: 'apertura-e__author',
    aperturaEMultimedia: 'apertura-e__multimedia',
  }

  return (
    <div className={classes.aperturaE}>
      <div
        id="powa-26829ba2-370c-4d75-81e2-dcbed324e826"
        data-env="sandbox"
        data-api="sandbox"
        data-org="elcomercio"
        data-uuid="26829ba2-370c-4d75-81e2-dcbed324e826"
        data-aspect-ratio="0.562"
        className="powa">
        <script src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaBoot.js?org=elcomercio" />
      </div>
      {!isSection && (
        <div className={classes.aperturaESection}>
          <a href={data.sectionLink}>{data.section}</a>
        </div>
      )}
      <div className={classes.aperturaEContent}>
        <div className={classes.aperturaETitle}>
          <a href={data.link}>{data.title}</a>
        </div>
        <div className={classes.aperturaESubtitle}>
          <a href={data.link}>{data.subTitle}</a>
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
