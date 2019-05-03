import React from 'react'
import renderHTML from 'react-render-html'
import { getIcon } from '../../components/utilities/helpers'

const classes = {
  aperturaE: `apertura-e padding-normal`,
  aperturaESection: 'apertura-e__section text-center',
  aperturaEContent: 'apertura-e__content',
  aperturaETitle: 'apertura-e__title',
  oneline: 'apertura-e-oneline',
  twoline: 'apertura-e-twoline',
  threeline: 'apertura-e-threeline',
  aperturaESubtitle: 'apertura-e__subtitle',
  aperturaEAuthor: 'apertura-e__author',
  aperturaEMultimedia: 'apertura-e__multimedia',
  iconGallery: 'apertura-e__icon-gallery',
  iconGalleryContainer: 'apertura-e__icon-gallery-container',
}

const getMultimediaIcon = mediaType => {
  if (mediaType === 'G') {
    return (
      <span className={`${classes.iconGallery}-G`}>
        <span className={`${classes.iconGalleryContainer}-G`}>
          <i>{mediaType}</i>
        </span>
      </span>
    )
  }
  return null
}
const AperturaExtraordinaria = props => {
  const {
    data,
    multimediaOrientation = 'bottom',
    contentOrientation = 'left',
    isSection = false,
    multimediaType,
    arcSite,
  } = props

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
    <div
      className={`${
        classes.aperturaE
      } apertura-e--${multimediaOrientation} text-${contentOrientation}`}>
      {!isSection && (
        <div className={classes.aperturaESection}>
          <a href={data.sectionLink}>{data.section}</a>
        </div>
      )}
      <div className={classes.aperturaEContent}>
        <div className={`${classes.aperturaETitle} ${numline}`}>
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
        {renderHTML(data.embedMultimedia)}
        <script src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaBoot.js?org=elcomercio" />
        {getMultimediaIcon(getIcon(multimediaType))}
      </div>
    </div>
  )
}

export default AperturaExtraordinaria
