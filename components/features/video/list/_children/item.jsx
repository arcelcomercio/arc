import React from 'react'

const videoListChild = ({
  websiteLink,
  title,
  multimediaLandscapeMD,
  // primarySection,
  // primarySectionLink,
  videoDuration,
  index,
}) => {
  const link = `${websiteLink}?ref=landingvideos&pos=${index + 1}`
  return (
    <div className="video-list__item">
      <picture className="block mb-10 video-list__image-box">
        <a itemProp="url" className="video-list__link" href={link}>
          <img
            className="video-list__image object-contain w-full"
            src={multimediaLandscapeMD}
            alt={title}
            loading="lazy"
          />
          {!(videoDuration === '00:00' || videoDuration === '00:00:00') && (
            <span className="video-list__duration">{videoDuration}</span>
          )}
        </a>
      </picture>
      <div className="flex">
        <a
          itemProp="url"
          className="text-gray-200 text-md video-list__section"
          href={primarySectionLink}>
          {primarySection}
        </a>
      </div>
      <a itemProp="url" href={link} className="block mb-10 video-list__title">
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
