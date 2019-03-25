import React, { Component } from 'react';
import DataStory from './utils/data-story'

// eslint-disable-next-line react/prefer-stateless-function
class CardEditorial extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(...props) {
    super(...props)
  }

	render() {
    const { arcSite, data } = this.props
    const element = new DataStory({}, arcSite)
    element.__data = data
    return (
      <div className="card-editorial">
        <div className="card-editorial__wrapper">
          <h4 className="card-editorial__grupo">{element.section}</h4>
          <h2>
            <a className="card-editorial__name" href={element.link}>
              {element.title}
            </a>
          </h2>
          <div className="card-editorial__description">
            <div className="card-editorial__box-image">
              <a href={element.link}>
                <img
                  className="card-editorial__image"
                  src={element.authorImage}
                  alt={element.author}
                />
              </a>
            </div>
            <div className="card-editorial__box-detail">
              <p className="card-editorial__title">{element.subTitle}</p>
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



export default CardEditorial