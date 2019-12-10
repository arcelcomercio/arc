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
  urlTitle,
  titleList,
  isAdmin,
  stories = [],
}) => {
  return (
    <div className="stories-l-section bg-white flex flex-col">
      <div className="stories-l-header flex items-center w-auto pr-20 pl-20 stories-l-section__header-font-position bg-info">
        <a
          href={urlTitle}
          className="stories-l-header__title flex items-center full-height">
          <h4 className="uppercase font-bold stories-l-section__header-font-color">
            {titleList}
          </h4>
        </a>
      </div>

      <div
        role="list"
        className="stories-l-card__list bg-white overflow-y-auto h-full">
        {stories.map(
          (
            {
              multimediaType,
              multimedia,
              urlNews,
              lazyImage,
              title,
              urlAutor,
              author,
            },
            i
          ) =>
            i === 0 ? (
              <figure className="position-relative mb-10 overflow-hidden">
                {getMultimediaIcon(multimediaType) && (
                  <i
                    className={`${getMultimediaIcon(
                      multimediaType
                    )} position-absolute text-center multimedia__icon mx-auto rounded text-gray-100`}
                  />
                )}
                {multimedia && (
                  <a href={urlNews}>
                    <picture>
                      <img
                        className={`${
                          isAdmin ? '' : 'lazy'
                        } stories-l-card__image w-full object-center object-cover`}
                        src={isAdmin ? multimedia : lazyImage}
                        data-src={multimedia}
                        alt=""
                      />
                    </picture>
                  </a>
                )}
              </figure>
            ) : (
              <div className="stories-l-item__information pr-20 pl-20">
                <div className="stories-l-item__link-box flex flex-col text-gray-300 border-b-1 border-dashed border-gray pb-10">
                  <a href={urlNews}>
                    <h3 className="stories-l-item__link mb-15 text-gray-300 line-h-sm font-bold overflow-hidden">
                      {title}
                    </h3>
                  </a>
                  <span>
                    <a
                      className="stories-l-item__autor text-gray-200"
                      href={urlAutor}>
                      {author}
                    </a>
                  </span>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default ChildrenSectionColumn
