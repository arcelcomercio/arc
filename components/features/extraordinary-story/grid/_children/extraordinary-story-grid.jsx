import React from 'react'
import SectionItem from './section-item'
import EmbedMultimedia from '../../../../global-components/embed-multimedia'

const classes = {
  extraordinayStoryGridContainer:
    'extraordinary-story-grid flex position-relative',
  videoBox: 'story-video-box flex-center-vertical position-relative',
  gridContainer: 'sections-grid full-width',
  gridHeaderText: 'sections-grid__text flex-center-vertical',
  gridHeaderImage: 'sections-grid__text-image',
  gridListTitle: 'sections-grid__title',
  gridListItems: 'sections-grid__item-list flex',
}

const ExtraordinaryStoryGridChildExtraordinaryStoryGrid = props => {
  const {
    section1,
    section2,
    section3,
    section4,
    storyData,
    contextPath,
  } = props
  storyData.multimediaOrientation = 'grid'

  return (
    <div className={classes.extraordinayStoryGridContainer}>
      <div className={classes.videoBox}>
        <EmbedMultimedia
          type={storyData.typeMultimediaGeneral}
          title={storyData.title}
          source={storyData.sourceMultimedia}
        />
      </div>
      <div className={classes.gridContainer}>
        <div className={classes.gridHeaderText}>
          Estás viendo
          <img
            className={classes.gridHeaderImage}
            src="https://assets.peru21.pe/img/p21tv/logo_p21tv.png"
            alt=""
          />
        </div>
        <h2 className={classes.gridListTitle}>Programas del día</h2>
        <div className={classes.gridListItems}>
          {section1.id !== '' && (
            <SectionItem path={contextPath} data={section1} />
          )}
          {section2.id !== '' && (
            <SectionItem path={contextPath} data={section2} />
          )}
          {section3.id !== '' && (
            <SectionItem path={contextPath} data={section3} />
          )}
          {section4.id !== '' && (
            <SectionItem path={contextPath} data={section4} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ExtraordinaryStoryGridChildExtraordinaryStoryGrid
