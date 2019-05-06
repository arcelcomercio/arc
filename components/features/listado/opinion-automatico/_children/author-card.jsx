import React, { Component } from 'react'
import DataStory from '../../../../../resources/components/utils/data-story'

// eslint-disable-next-line react/prefer-stateless-function
class AuthorCard extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(...props) {
    super(...props)
  }

  render() {
    const { arcSite, data } = this.props
    const element = new DataStory({}, arcSite)
    element.__data = data
    return (
      <div className="card-autor">
        <div className="card-autor__wrapper">
          <div className="card-autor__box-image">
            <img
              className="card-autor__image"
              src={element.authorImage}
              alt={element.author}
            />
          </div>
          <div className="card-autor__box-detail">
            <h2>
              <a className="card-autor__name" href={element.authorLink}>
                {element.author}
              </a>
            </h2>
            <p className="card-autor__grupo">{element.section}</p>
            <h2>
              <a className="card-autor__title" href={element.link}>
                {element.title}
              </a>
            </h2>
            {/* <div className="card-autor__social">
            <a href="/" className="card-autor__icono">
              <span>f</span>
            </a>
            <a href="/" className="card-autor__icono">
              <span>t</span>
            </a>
          </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default AuthorCard
