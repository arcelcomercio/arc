import React from 'react'

const getModel = model => {
  const type = {
    basic: 'row-1',
    twoCol: 'col-2',
    full: 'col-2 row-2',
  }
  return type[model] || type.basic
}

export default ({
  author,
  authorLink,
  primarySectionLink,
  title,
  multimediaLandscapeL,
  multimediaPortraitMD,
  multimediaSquareXL,
  websiteLink,
  multimediaType,
  crossY,
  crossX,
  model,
  section,
}) => {
  return (
    <div className={`feature-fullimage ${crossY} ${crossX} ${getModel(model)}`}>
      <div className="feature-fullimage__box-image">
        {getModel(model) === 'col-2' && (
          <img
            src={multimediaLandscapeL}
            alt={title}
            className="feature-fullimage__image"
          />
        )}
        {getModel(model) === 'col-2 row-2' && (
          <img
            src={multimediaSquareXL}
            alt={title}
            className="feature-fullimage__image"
          />
        )}
        {getModel(model) === 'row-1' && (
          <img
            src={multimediaPortraitMD}
            alt={title}
            className="feature-fullimage__image"
          />
        )}
      </div>
      <div className="feature-fullimage__box-detail">
        <h3>
          <a
            className="feature-fullimage__section text-white text-md"
            href={primarySectionLink}>
            {section}
          </a>
        </h3>
        <h2>
          <a
            className="feature-fullimage__title text-white block mt-10 mb-10 title-xs line-h-sm "
            href={websiteLink}
            title={title}>
            {title}
          </a>
        </h2>
        <p>
          <a
            className="feature-fullimage__author font-thin text-xs uppercase text-white"
            href={authorLink}>
            {author}
          </a>
        </p>
      </div>
      <div className="feature-fullimage__box-icon">
        <i className="feature-fullimage__icon icon-video" />
      </div>
    </div>
  )
}
