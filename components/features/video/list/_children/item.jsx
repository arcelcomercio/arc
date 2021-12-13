import { useAppContext } from 'fusion:context'
import React from 'react'

import { defaultImage } from '../../../../utilities/assets'

const videoListChild = ({
  websiteLink,
  title,
  multimediaLandscapeMD,
  // primarySection,
  // primarySectionLink,
  videoDuration,
  // index,
  // arcSite
  isLazy = false,
}) => {
  // const link = `${websiteLink}?ref=landingvideos&pos=${index + 1}`
  const link = websiteLink // Eliminado query strings por motivos de SEO

  const { contextPath, arcSite } = useAppContext()

  const lazyImg = defaultImage({ contextPath, arcSite })

  return (
    <div className="video-list__item">
      <picture className="block mb-12 video-list__image-box" arcSite={arcSite}>
        <a itemProp="url" className="video-list__link" href={link}>
          <img
            className={`video-list__image object-contain w-full ${
              isLazy ? 'lazy' : ''
            }`}
            src={isLazy ? lazyImg : multimediaLandscapeMD}
            data-src={multimediaLandscapeMD}
            alt={title}
          />

          {!(videoDuration === '00:00' || videoDuration === '00:00:00') && (
            <span className="video-list__duration">{videoDuration}</span>
          )}
          {arcSite === 'trome' && (
            <svg
              className="video-list__play"
              xmlns="http://www.w3.org/2000/svg "
              viewBox="0 0 112 112">
              <path
                className="video-list__icon-play"
                d="M39.67,28V84L86.34,56Z"
              />
            </svg>
          )}
        </a>
      </picture>
      {/* <div className="flex">
        <a
          itemProp="url"
          className="text-gray-200 text-md video-list__section"
          href={primarySectionLink}>
          {primarySection}
        </a>
      </div> */}
      <a itemProp="url" href={link} className="block video-list__title">
        <h3
          itemProp="name"
          className="line-h-xs text-xl font-bold video-list__new">
          {title}
        </h3>
      </a>
      {/* <time className="text-lg text-gray-200" dateTime="">
        13:25
      </time> */}
    </div>
  )
}

export default React.memo(videoListChild)
