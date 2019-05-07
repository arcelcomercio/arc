import React, { Component } from 'react'
import DataStory from '../../../../../resources/components/utils/data-story'

// eslint-disable-next-line react/prefer-stateless-function
class EditorialCard extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(...props) {
    super(...props)
  }

  render() {
    const { arcSite, data } = this.props
    const element = new DataStory({}, arcSite)
    element.__data = data
    return (
      <div className="editorial-card">
        <div className="editorial-card__wrapper">
          <h4 className="editorial-card__grupo">{element.section}</h4>
          <h2>
            <a className="editorial-card__name" href={element.link}>
              {element.title}
            </a>
          </h2>
          <div className="editorial-card__description">
            <div className="editorial-card__box-image">
              <a href={element.link}>
                <img
                  className="editorial-card__image"
                  src={element.authorImage}
                  alt={element.author}
                />
              </a>
            </div>
            <div className="editorial-card__box-detail">
              <p className="editorial-card__title">{element.subTitle}</p>
            </div>
          </div>
          {/* <div className="card-editorial__social">
          <a href="/" className="card-editorial__icono">
            <span>f</span>
          </a>
          <a href="/" className="card-editorial__icono">
            <span>t</span>
          </a>
        </div> */}
        </div>
      </div>
    )
  }
}

export default EditorialCard
