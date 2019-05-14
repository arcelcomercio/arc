import React, { PureComponent } from 'react'

class ExtraordinaryStoryChildGridStories extends PureComponent {
  build = () => {
    console.log('adasd')
  }

  render() {
    return (
      <div className="extraordinary-story-grid flex position-relative">
        <div className="story-video-box flex-center-vertical">
          <figure className="full-width">
            <img
              className="full-width"
              src="https://img.peru21.pe/files/listing_p21_portada_p21tv_v3_destaque/uploads/2019/05/13/5cd994b00a0a8.jpeg"
              alt=""
            />
          </figure>
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
            <div className="stories-grid-item">
              <a href="#">
                <img
                  className="full-width"
                  src="http://peru21.pe/img/p21tv/21noticias.jpg"
                  alt=""
                />
                <p className="stories-grid-item__title text-left">titulo</p>
              </a>
            </div>
            <div className="stories-grid-item">
              <a href="#">
                <img
                  className="full-width"
                  src="http://peru21.pe/img/p21tv/lavozdel21.jpg"
                  alt=""
                />
                <p className="stories-grid-item__title text-left">titulo</p>
              </a>
            </div>
            <div className="stories-grid-item">
              <a href="#">
                <img
                  className="full-width"
                  src="http://peru21.pe/img/p21tv/deportes21.jpg?v2"
                  alt=""
                />
                <p className="stories-grid-item__title text-left">titulo</p>
              </a>
            </div>
            <div className="stories-grid-item">
              <a href="#">
                <img
                  className="full-width"
                  src="http://peru21.pe/img/p21tv/informe21.jpg?v2"
                  alt=""
                />
                <p className="stories-grid-item__title text-left">titulo</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExtraordinaryStoryChildGridStories
