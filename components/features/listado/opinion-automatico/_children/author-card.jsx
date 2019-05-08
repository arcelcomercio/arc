import React from 'react'
import StoryData from '../../../../../resources/components/utils/data-story'

const AuthorCard = props => {
  const { arcSite, data } = props
  const element = new StoryData({}, arcSite)
  element.__data = data
  return (
    <div className="author-card">
      <div className="author-card__wrapper">
        <div className="author-card__box-image">
          <img
            className="author-card__image"
            src={element.authorImage}
            alt={element.author}
          />
        </div>
        <div className="author-card__box-detail">
          <h2>
            <a className="author-card__name" href={element.authorLink}>
              {element.author}
            </a>
          </h2>
          <p className="author-card__grupo">{element.section}</p>
          <h2>
            <a className="author-card__title" href={element.link}>
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

export default AuthorCard
