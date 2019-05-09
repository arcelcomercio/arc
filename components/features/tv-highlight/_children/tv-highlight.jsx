import React from 'react'
import { getIcon } from '../../../utilities/helpers'

const TVHighlightChild = props => {
  const {
    title: { nameTitle, urlTitle },
    category: { nameSection, urlSection },
    multimedia: { multimediaImg, multimediaType },
    tags,
  } = props
  return (
    <div className="tv-highlight">
      <div className="tv-highlight__container">
        <div className="tv-highlight__box-title">
          <h1>
            <a href={urlTitle} className="tv-highlight__title">
              {nameTitle}
            </a>
          </h1>
        </div>
        <div className="tv-highlight__box-sub">
          <span>
            <a href={urlSection} className="tv-highlight__section">
              {nameSection}
            </a>
          </span>
        </div>
        <a href={urlTitle} className="tv-highlight__box-image">
          <img className="tv-highlight__img" src={multimediaImg} alt="foto" />
          {multimediaType !== 'basic' && (
            <span className="tv-highlight__icon">
              {getIcon(multimediaType)}
            </span>
          )}
        </a>
        {tags && (
          <div className="tv-highlight__tags">
            <p className="tv-highlight__related">Tag Relacionados:</p>
            <ul className="tv-highlight__list">
              {tags.map(el => {
                return (
                  <li key={el.slug} className="tv-highlight__item">
                    <a className="tv-highlight__link" href={`/tag/${el.slug}`}>
                      {el.description}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TVHighlightChild
