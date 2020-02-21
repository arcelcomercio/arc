import React from 'react'
import { createMarkup } from '../../../../utilities/helpers'
import Icon from '../../../../global-components/multimedia-icon'

const SeparatorItemComplete = ({
  websiteLink,
  multimediaType,
  title,
  imageUrlMobile,
  imageUrl,
  multimediaLazyDefault,
  isAdmin,
  index,
}) => (
  <a
    href={websiteLink}
    className={`sep-opt__item gradient block position-relative mb-20 md:mb-10 ${
      index === 0 ? '' : 'md:ml-5'
    }`}>
    <Icon type={multimediaType} iconClass="sep-opt__icon" />

    <h3 className="sep-opt__title position-absolute overflow-hidden font-bold text-white line-h-sm bottom-0 m-15">
      {title}
    </h3>

    <picture className="">
      <source
        className={isAdmin ? '' : 'lazy'}
        media="(max-width: 639px)"
        type="image/jpeg"
        srcSet={isAdmin ? imageUrlMobile : multimediaLazyDefault}
        data-srcset={imageUrlMobile}
      />
      <img
        src={isAdmin ? imageUrl : multimediaLazyDefault}
        data-src={imageUrl}
        alt={title}
        className={`${
          isAdmin ? '' : 'lazy'
        } sep-opt__img w-full md:h-full object-cover`}
      />
    </picture>
  </a>
)

const SeparatorItemPartial = ({
  websiteLink,
  multimediaType,
  title,
  imageUrlMobile,
  imageUrl,
  multimediaLazyDefault,
  isAuthorVisible,
  authorLink,
  author,
  isAdmin,
  index,
}) => (
  <div
    className={`sep-opt__item block position-relative mb-20 md:mb-10 bg-base-300 ${
      index === 0 ? '' : 'md:ml-5'
    }`}>
    <Icon type={multimediaType} iconClass="sep-opt__icon" />
    <picture className="block">
      <source
        className={isAdmin ? '' : 'lazy'}
        media="(max-width: 639px)"
        type="image/jpeg"
        srcSet={isAdmin ? imageUrlMobile : multimediaLazyDefault}
        data-srcset={imageUrlMobile}
      />
      <img
        src={isAdmin ? imageUrl : multimediaLazyDefault}
        data-src={imageUrl}
        alt={title}
        className={`${isAdmin ? '' : 'lazy'} sep-opt__img w-full object-cover`}
      />
    </picture>
    <h3 className="sep-opt__title overflow-hidden font-bold line-h-sm bottom-0 m-10">
      {title}
    </h3>
    {isAuthorVisible && (
      <a
        href={authorLink}
        className="z-10 position-relative block text-sm uppercase text-gray-200 ml-15 br-15 mt-0 mb-20">
        {author}
      </a>
    )}
    <a
      className="font-0 position-absolute h-full w-full top-0"
      href={websiteLink}>
      {title}
    </a>
  </div>
)

const SeparatorsBasicChildSeparator = ({
  htmlCode,
  titleLink,
  titleSeparator,
  stories,
  isAuthorVisible,
  isAdmin,
  design,
  // bgColor,
  isSeeMoreVisible,
  responsive,
}) => {
  return (
    <div className={`sep-opt col-3 position-relative ${responsive} ${design}`}>
      {htmlCode ? (
        <div className="" dangerouslySetInnerHTML={createMarkup(htmlCode)} />
      ) : (
        titleSeparator && (
          <h2 className="sep-opt__main-title font-bold pt-20 pb-30">
            <a href={titleLink} className="">
              {titleSeparator}
            </a>
          </h2>
        )
      )}
      {isSeeMoreVisible && (
        <a
          href={titleLink}
          className="position-absolute text-sm text-gray-200 right-0 top-0 border-1 border-gray border-solid p-10 mt-10">
          VER MÁS
        </a>
      )}
      <div role="list" className="sep-opt__list flex flex-col md:flex-row">
        {stories.map((story, index) => {
          if (design === 'custom') {
            return (
              <SeparatorItemComplete
                {...{
                  ...story,
                  index,
                  isAuthorVisible,
                  isAdmin,
                  design,
                }}
              />
            )
          }
          return (
            <SeparatorItemPartial
              {...{
                ...story,
                index,
                isAuthorVisible,
                isAdmin,
                design,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SeparatorsBasicChildSeparator
