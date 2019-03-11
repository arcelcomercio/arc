import React, { Component } from 'react'
import DataStory from './utils/data-story'
import { reduceWord, formatDate } from './../utilsJs/helpers'

class CardNotice extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  static getIcon(type) {
    switch (type) {
      case 'basic_gallery':
        return 'G'
      case 'basic_video':
        return 'V'
      default:
        return ''
    }
  }

  render() {
    const { arcSite, data } = this.props
    const element = new DataStory({}, arcSite)
    return (
      <div>
        {data.map((el, index) => {
          element.__data = el
          return (
            <div key={index} className="card-notice">
              <div className="card-notice__top">
                <a href={element.sectionLink} className="card-notice__section">
                  {element.section}
                </a>
                <p className="card-notice__date">
                  {formatDate(element.date)}
                </p>
              </div>
              <div className="card-notice__bottom">
                <div className="card-notice__left">
                  <div>
                    <h2>
                      <a className="card-notice__title" href={element.link}>
                        {element.title}
                      </a>
                    </h2>
                    <p className="card-notice__subtitle">
                      {reduceWord(element.subTitle)}
                    </p>
                  </div>
                  <div>
                    <a
                      href={element.authorLink}
                      className="card-notice__author"
                    >
                      {element.author}
                    </a>
                  </div>
                </div>
                <div className="card-notice__right">
                  <a href={element.link}>
                    {element.multimediaType === 'basic' ? (
                      ''
                    ) : (
                      <span className="card-notice__icon">
                        {CardNotice.getIcon(element.multimediaType)}
                      </span>
                    )}
                    <img
                      alt={element.title}
                      className="card-notice__figure"
                      src={element.multimedia}
                    />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default CardNotice
