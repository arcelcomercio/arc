import React, { Component } from 'react'
import renderHTML from 'react-render-html'
import SectionItem from './section-item'
import EmbedMultimedia from '../../../../global-components/embed-multimedia'

class ExtraordinaryStoryChildGridStories extends Component {
  constructor(props) {
    super(props)
    this.lol = ''
  }

  render() {
    const { section1, section2, section3, section4 } = this.props
    const { dataStory } = this.props

    dataStory.multimediaOrientation = 'grid'

    return (
      <div className="extraordinary-story-grid flex position-relative">
        <div className="story-video-box flex-center-vertical">
          {renderHTML(dataStory.embedMultimedia)}
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
            <SectionItem {...section1} />
            <SectionItem {...section2} />
            <SectionItem {...section3} />
            <SectionItem {...section4} />
          </div>
        </div>
      </div>
    )
  }
}

export default ExtraordinaryStoryChildGridStories
