import React from 'react'
import SectionItem from './section-item'
import EmbedMultimedia from '../../../../global-components/embed-multimedia'

const classes = {
  extraordinayStoryGridContainer:
    'extraordinary-story-grid flex position-relative',
  videoBox: 'story-video-box flex-center-vertical position-relative',
  gridContainer: 'stories-grid full-width',
  gridHeaderText: 'stories-grid__text flex-center-vertical',
  gridHeaderImage: 'stories-grid__text-image',
  gridListTitle: 'stories-grid__title',
  gridListItems: 'stories-grid__item-list flex',
}

const ExtraordinaryStoryChildGridStories = props => {
  const { section1, section2, section3, section4, storyData } = props
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
          {section1.id !== '' && <SectionItem data={section1} />}
          {section2.id !== '' && <SectionItem data={section2} />}
          {section3.id !== '' && <SectionItem data={section3} />}
          {section4.id !== '' && <SectionItem data={section4} />}
        </div>
      </div>
    </div>
  )
}

export default ExtraordinaryStoryChildGridStories
