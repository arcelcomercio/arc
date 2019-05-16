import React from 'react'
import SectionItem from './section-item'
import EmbedMultimedia from '../../../../global-components/embed-multimedia'

const ExtraordinaryStoryChildGridStories = props => {
  const { section1, section2, section3, section4, dataStory } = props

  dataStory.multimediaOrientation = 'grid'

  return (
    <div className="extraordinary-story-grid flex position-relative">
      <div className="story-video-box flex-center-vertical">
        <EmbedMultimedia
          type={dataStory.typeMultimediaGeneral}
          title={dataStory.title}
          source={dataStory.sourceMultimedia}
        />
        <script src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaBoot.js?org=elcomercio" />
      </div>
      <div className="stories-grid">
        <div className="stories-grid__text flex-center-vertical">
          Estas viendo
          <img
            className="stories-grid__text-image"
            src="https://assets.peru21.pe/img/p21tv/logo_p21tv.png"
            alt=""
          />
        </div>
        <h2 className="stories-grid__title">Programas del dia</h2>
        <div className="stories-grid__item-list flex">
          {Object.keys(section1).length > 0 && <SectionItem {...section1} />}
          {Object.keys(section2).length > 0 && <SectionItem {...section2} />}
          {Object.keys(section3).length > 0 && <SectionItem {...section3} />}
          {Object.keys(section4).length > 0 && <SectionItem {...section4} />}
        </div>
      </div>
    </div>
  )
}

export default ExtraordinaryStoryChildGridStories
