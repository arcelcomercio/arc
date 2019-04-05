import React from 'react';
import { getIcon } from "../utilsJs/helpers"

const CardDestaqueTv = props => {
		const { 
		title: { nameTitle, urlTitle },
		category: { nameSection, urlSection },
		multimedia: { multimediaImg, multimediaType },
		tags
		} = props
		return (
      <div className="card-destaque-tv">
        <div className="card-destaque-tv__container">
          <div className="card-destaque-tv__box-title">
            <h1>
              <a href={urlTitle} className="card-destaque-tv__title">
                {nameTitle}
              </a>
            </h1>
          </div>
          <div className="card-destaque-tv__box-sub">
            <span>
              <a href={urlSection} className="card-destaque-tv__section">
                {nameSection}
              </a>
            </span>
            {/* <span className="card-destaque-tv__social"></span> */}
          </div>
          <a href={urlTitle} className="card-destaque-tv__box-image">
            <img
              className="card-destaque-tv__img"
              src={multimediaImg}
              alt="foto"
            />
						{ multimediaType !== 'basic' && 
							(<span className="card-destaque-tv__icon">{getIcon(multimediaType)}</span>)
						}
          </a>
          {tags && (
            <div className="card-destaque-tv__tags">
              <p className="card-destaque-tv__related">Tag Relacionados:</p>
              <ul className="card-destaque-tv__list">
                {tags.map((el, index) => {
                  return (
                    <li key={index} className="card-destaque-tv__item">
                      <a
                        className="card-destaque-tv__link"
                        href={`/tag/${el.slug}`}>
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

export default CardDestaqueTv;