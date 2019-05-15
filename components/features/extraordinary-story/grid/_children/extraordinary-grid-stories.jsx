import React, { Component } from 'react'
import SectionItem from './section-item'
import EmbedMultimedia from '../../../../global-components/embed-multimedia'

class ExtraordinaryStoryChildGridStories extends Component {
  build = () => {
    console.log('adasd')
  }

  render() {
    const { section1, section2, section3, section4 } = this.props
    const notes = {
      note1: {
        urlNote: '#',
        urlImage: 'http://peru21.pe/img/p21tv/informe21.jpg?v2',
        title: 'titulo',
      },
      note2: {
        urlNote: '#',
        urlImage: 'http://peru21.pe/img/p21tv/lavozdel21.jpg',
        title: 'titulo',
      },
      note3: {
        urlNote: '#',
        urlImage: 'http://peru21.pe/img/p21tv/deportes21.jpg?v2',
        title: 'titulo',
      },
      note4: {
        urlNote: '#',
        urlImage: 'http://peru21.pe/img/p21tv/21noticias.jpg',
        title: 'titulo',
      },
    }
    return (
      <div className="extraordinary-story-grid flex position-relative">
        <div className="story-video-box flex-center-vertical">
          <EmbedMultimedia
            type="image"
            source="http://resizer.shared.arcpublishing.com/NHM-72hdnyWwaCgLPbm23WBaXJA=/500x400/smart/arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/LH2OSHSE2RG3LCPS5HBSALKC3U.jpeg"
          />
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
