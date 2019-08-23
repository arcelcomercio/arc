import React from 'react'
import SectionItem from './section-item'
import EmbedMultimedia from '../../../../global-components/embed-multimedia'

const classes = {
  extraordinayStoryGridContainer: `extraordinary-story-grid flex position-relative p-10 flex-col md:flex-row`,
  videoBox: `story-video-box flex items-center position-relative w-full rounded-sm md:p-10`,
  gridContainer: 'sections-grid w-full pl-10 md:pl-30',
  gridHeaderText: `sections-grid__text flex position-absolute items-center text-lg text-gray-200 pl-10`,
  gridHeaderImage: 'sections-grid__text-image ml-10',
  gridListTitle: 'sections-grid__title p-10 title-sm text-white',
  gridListItems: 'flex flex-wrap',
}

const ExtraordinaryStoryGridChildExtraordinaryStoryGrid = props => {
  const {
    section1,
    section2,
    section3,
    section4,
    storyData,
    deployment,
    contextPath,
    arcSite,
    imgLogo,
  } = props
  storyData.multimediaOrientation = 'grid'

  return (
    <div className={classes.extraordinayStoryGridContainer}>
      <div className={classes.videoBox}>
        <EmbedMultimedia
          type={storyData.typeMultimediaGeneral}
          title={storyData.title}
          source={storyData.sourceMultimedia}
          deployment={deployment}
          contextPath={contextPath}
          website={arcSite}
          storyLink={storyData.link}
        />
      </div>
      <div className={classes.gridContainer}>
        <div className={classes.gridHeaderText}>
          Estás viendo
          <a href={storyData.primarySectionLink}>
            <img
              className={classes.gridHeaderImage}
              src={imgLogo}
              alt={`Logo especial de ${arcSite}`}
            />
          </a>
        </div>
        <a href={storyData.primarySectionLink}>
          <h2 className={classes.gridListTitle}>Programas del día</h2>
        </a>
        <div role="list" className={classes.gridListItems}>
          {section1.id !== '' && <SectionItem data={section1} />}
          {section2.id !== '' && <SectionItem data={section2} />}
          {section3.id !== '' && <SectionItem data={section3} />}
          {section4.id !== '' && <SectionItem data={section4} />}
        </div>
      </div>
    </div>
  )
}

export default ExtraordinaryStoryGridChildExtraordinaryStoryGrid
