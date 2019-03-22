import React, { Component } from 'react';
import DataStory from './utils/data-story'
import { formatDate } from '../utilsJs/helpers'

// eslint-disable-next-line react/prefer-stateless-function
class BarraAutor extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(...props) {
    super(...props)
  }

	render() {
    const { arcSite, data } = this.props
    const element = new DataStory({}, arcSite)
    element.__data = data
		return (
      <div className="barra-autor">
        <div className="barra-autor__wrapper">
          <div className="barra-autor__social">
            <span className="barra-autor__fecha movil">
              {formatDate(element.date)}
            </span>
            {/* <div className="barra-autor__icons">
              <a href="/">t</a>
              <a href="/">f</a>
            </div> */}
          </div>
          <div className="barra-autor__content">
            <div className="barra-autor__box-image">
              <a href={element.link} className="barra-autor__image">
                <img src={element.authorImage} alt={element.author} />
              </a>
            </div>
            <div className="barra-autor__box-desc">
              <span className="barra-autor__fecha">
                {formatDate(element.date)}
              </span>
              <h2>
                <a href={element.authorLink} className="barra-autor__name">
                  {element.author}
                </a>
              </h2>
              <p>
                <a href={element.link} className="barra-autor__subtitle">
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

export default BarraAutor;