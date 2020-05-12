import React from 'react'
import { useEditableContent } from 'fusion:content'
import { fetchLive } from '../_dependencies/scripts'

const LiveScoreChild = props => {
  const {
    isAdmin,
    title,
    subTitle,
    websiteLink,
    multimediaLazyDefault,
    imgUrl,
    codeField,
    titleField,
    subTitleField,
    isLive,
  } = props

  const { editableField } = useEditableContent()

  return (
    <div className="extraordinary-l-score bg-gray-300 lg:flex flex-row-reverse">
      <a
        className="extraordinary-l-score__img-link block lg:p-20"
        href={websiteLink}>
        <picture className="extraordinary-l-score__picture">
          <img
            className={`${
              isAdmin ? '' : 'lazy'
            } extraordinary-l-score__img w-full object-cover`}
            src={isAdmin ? imgUrl : multimediaLazyDefault}
            data-src={imgUrl}
            alt={title}
          />
        </picture>
      </a>
      <div className="extraordinary-l-score__content p-10 lg:p-20">
        {codeField && (
          <a
            href={websiteLink}
            className="extraordinary-l-score__score-content text-white flex mb-15"
            data-id={codeField}>
            <div
              className="extraordinary-l-score__team p-10 text-xl font-bold flex-1 flex justify-end items-center"
              id="firstName"></div>
            <div
              className="extraordinary-l-score__score p-10 title-xs font-bold bg-black flex items-center"
              id="score"></div>
            <div
              className="extraordinary-l-score__team p-10 text-xl font-bold flex-1 flex items-center"
              id="secondName"></div>
          </a>
        )}
        <h1 className="extraordinary-l-score__title mb-15 overflow-hidden">
          {isLive && (
            <div className="extraordinary-l-score__live text-white inline-block mr-10">
              <span className="extraordinary-l-score__live-icon inline-block rounded mr-5" />
              EN VIVO
            </div>
          )}
          <a
            href={websiteLink}
            className="extraordinary-l-score__title-link text-white title-md font-bold line-h-xs"
            {...editableField('titleField')}
            suppressContentEditableWarning>
            {titleField || title}
          </a>
        </h1>
        <p
          className="extraordinary-l-score__subtitle text-white hidden md:block text-lg line-h-sm mb-20"
          {...editableField('subTitleField')}
          suppressContentEditableWarning>
          {subTitleField || subTitle}
        </p>
      </div>

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `"use strict";${fetchLive.replace('<<id>>', codeField)}`,
        }}
      />
    </div>
  )
}

export default React.memo(LiveScoreChild)
