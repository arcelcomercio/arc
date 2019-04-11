import React from 'react'
import renderHTML from 'react-render-html'
import { getIcon } from '../utilsJs/helpers'

const classes = {
  aperturaE: `apertura-e padding-normal`,
  aperturaESection: 'apertura-e__section text-center',
  aperturaEContent: 'apertura-e__content',
  aperturaETitle: 'apertura-e__title',
  aperturaESubtitle: 'apertura-e__subtitle',
  aperturaEAuthor: 'apertura-e__author',
  aperturaEMultimedia: 'apertura-e__multimedia',
  iconGallery: 'apertura-e__icon-gallery',
  iconVideo: 'apertura-e__video',
}

const getMultimediaIcon = mediaType => {
  let icon
  switch (mediaType) {
    case 'G':
      icon = classes.iconGallery
      break
    default:
      return ''
  }
  return (
    <span className={`contenedor-${icon}`}>
      <i className={`icons-${icon}`}>{mediaType}</i>
    </span>
  )
}
const AperturaExtraordinaria = props => {
  const {
    data,
    multimediaOrientation = 'bottom',
    contentOrientation = 'left',
    isSection = false,
    multimediaType,
  } = props

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
        {renderHTML(data.embedMultimedia)}
        <script src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaBoot.js?org=elcomercio" />
        {getMultimediaIcon(getIcon(multimediaType))}
      </div>
    </div>
  )
}

export default AperturaExtraordinaria
