import React, { PureComponent } from 'react'
import ArticleItem from './article-item'
import EmbedMultimedia from '../../../../global-components/embed-multimedia'

class ExtraordinaryStoryChildGridStories extends PureComponent {
  constructor(props) {
    super(props)
    this.lol = ''
  }

  build = () => {
    console.log('adasd')
  }

  render() {
    const { dataStory } = this.props

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
    dataStory.multimediaOrientation = 'grid'

    return (
      <div className="extraordinary-story-grid flex position-relative">
        <div className="story-video-box flex-center-vertical">
          <EmbedMultimedia
            type={dataStory.typeMultimediaGeneral}
            title={dataStory.title}
            source={dataStory.sourceMultimedia}
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
            <ArticleItem {...notes.note1} />
            <ArticleItem {...notes.note2} />
            <ArticleItem {...notes.note3} />
            <ArticleItem {...notes.note4} />
          </div>
        </div>
      </div>
    )
  }
}

export default ExtraordinaryStoryChildGridStories
