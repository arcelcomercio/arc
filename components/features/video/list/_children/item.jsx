import React from 'react'

export default ({
  websiteLink,
  title,
  multimediaSquareMD,
  primarySection,
  primarySectionLink,
}) => {
  return (
    <div className="video-list__item">
      <picture className="block mb-10">
        <a className="video-list__link" href={websiteLink}>
          <img
            className="video-list__image object-cover w-full"
            src={multimediaSquareMD}
            alt={title}
          />
        </a>
      </picture>
      <div className="flex">
        <span className="text-gray-200 text-md pr-5 hidden">01:20</span>
        <a className="text-gray-200 text-md" href={primarySectionLink}>
          {primarySection}
        </a>
      </div>
      <a href={websiteLink} className="block mb-10">
        <h3 className="line-h-xs text-xl font-bold">{title}</h3>
      </a>
      {/* <time className="text-lg text-gray-200" dateTime="">
        13:25
      </time> */}
    </div>
  )
}
