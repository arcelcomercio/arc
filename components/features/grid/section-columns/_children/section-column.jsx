import React from 'react'

const getMultimediaIcon = multimediaType => {
  let icon = ''
  switch (multimediaType) {
    case 'basic_video':
      icon = 'icon-video'
      break
    case 'basic_gallery':
      icon = 'icon-img'
      break
    default:
      return ''
  }
  return icon
}

const ChildrenSectionColumn = ({
  sectionName,
  sectionUrl,
  contentElements,
}) => {
  return (
    <div className="stories-l-section bg-white flex flex-col">
      <div className="stories-l-header flex items-center w-auto pr-20 pl-20 stories-l-section__header-font-position bg-info">
        <a
          href={sectionUrl}
          className="stories-l-header__title flex items-center full-height">
          <h4 className="uppercase font-bold stories-l-section__header-font-color">
            {sectionName}
          </h4>
        </a>
      </div>

      <div
        role="list"
        className="stories-l-card__list bg-white overflow-y-auto h-full">
        {contentElements.map(
          (
            {
              title,
              storyUrl,
              authorName,
              authorUrl,
              imageUrl,
              multimediaType,
            },
            i
          ) => (
            <article
              role="listitem"
              className="stories-l-item flex flex-col w-auto pt-10 pb-10"
              key={storyUrl}>
              {i === 0 && (
                <figure className="position-relative mb-10 overflow-hidden">
                  {getMultimediaIcon(multimediaType) && (
                    <i
                      className={`${getMultimediaIcon(
                        multimediaType
                      )} position-absolute text-center multimedia__icon mx-auto rounded text-gray-100`}
                    />
                  )}
                  {imageUrl && (
                    <a href={storyUrl}>
                      <picture>
                        <img
                          className="stories-l-card__image w-full object-center object-cover"
                          src={imageUrl}
                          alt={title}
                        />
                      </picture>
                    </a>
                  )}
                </figure>
              )}
              <div className="stories-l-item__information pr-20 pl-20">
                <div className="stories-l-item__link-box flex flex-col text-gray-300 border-b-1 border-dashed border-gray pb-10">
                  <a href={storyUrl}>
                    <h3 className="stories-l-item__link mb-15 text-gray-300 line-h-sm font-bold overflow-hidden">
                      {title}
                    </h3>
                  </a>
                  <span>
                    <a
                      className="stories-l-item__autor text-gray-200"
                      href={authorUrl}>
                      {authorName}
                    </a>
                  </span>
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </div>
  )
}

export default ChildrenSectionColumn
