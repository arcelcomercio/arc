import React, { Component } from 'react'
import DataStory from '../../../../../resources/components/utils/data-story'
import { formatDate } from '../../../../utilities/helpers'

// eslint-disable-next-line react/prefer-stateless-function
class AuthorListItem extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(...props) {
    super(...props)
  }

  render() {
    const { arcSite, data } = this.props
    const element = new DataStory({}, arcSite)
    element.__data = data
    return (
      <div className="author-item">
        <div className="author-item__wrapper">
          <div className="author-item__social">
            <span className="author-item__fecha movil">
              {formatDate(element.date)}
            </span>
            {/* <div className="author-item__icons">
              <a href="/">t</a>
              <a href="/">f</a>
            </div> */}
          </div>
          <div className="author-item__content">
            <div className="author-item__box-image">
              <a href={element.link} className="author-item__image">
                <img src={element.authorImage} alt={element.author} />
              </a>
            </div>
            <div className="author-item__box-desc">
              <span className="author-item__fecha">
                {formatDate(element.date)}
              </span>
              <h2>
                <a href={element.authorLink} className="author-item__name">
                  {element.author}
                </a>
              </h2>
              <p>
                <a href={element.link} className="author-item__subtitle">
                  {element.title}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AuthorListItem
