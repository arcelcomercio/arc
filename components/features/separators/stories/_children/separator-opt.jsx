import * as React from 'react'

import SeparatorOptPartial from './separator-opt-partial'
import SeparatorOptComplete from './separator-opt-complete'

const SeparatorsBasicChildSeparator = ({
  htmlCode,
  titleLink,
  titleSeparator,
  stories,
  isAuthorVisible,
  design,
  isSeeMoreVisible,
  isImageVisible,
  responsive,
  arcSite
}) => {
  return (
    <div className={`sep-opt col-3 position-relative ${responsive} ${design}`}>
      {htmlCode ? (
        <div className="" dangerouslySetInnerHTML={{
          __html: htmlCode
        }} />
      ) : (
        titleSeparator && (
          <h2
            itemProp="name"
            className="sep-opt__main-title font-bold pt-20 pb-30">
            <a itemProp="url" href={titleLink} className="">
              {titleSeparator}
            </a>
          </h2>
        )
      )}
      {isSeeMoreVisible && (
        <a
          itemProp="url"
          href={titleLink}
          className="position-absolute text-sm text-gray-200 right-0 top-0 border-1 border-gray border-solid p-10 mt-10">
          VER MÁS
        </a>
      )}
      <div
        role={design === 'custom' ? 'navigation' : 'list'}
        className="sep-opt__list flex flex-col md:flex-row">
        {stories.map((story, index) => {
          if (design === 'custom') {
            return (
              <SeparatorOptComplete
                key={`separator-opt-c-${story.id}`}
                websiteLink={story.websiteLink}
                multimediaType={story.multimediaType}
                title={story.title}
                imageUrl={story.imageUrl}
                index={index}
                isImageVisible={isImageVisible}
                arcSite={arcSite}
              />
            )
          }
          return (
            <SeparatorOptPartial
              key={`separator-opt-p-${story.id}`}
              websiteLink={story.websiteLink}
              multimediaType={story.multimediaType}
              title={story.title}
              imageUrl={story.imageUrl}
              authorLink={story.authorLink}
              author={story.author}
              index={index}
              isAuthorVisible={isAuthorVisible}
              isImageVisible={isImageVisible}
              arcSite={arcSite}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SeparatorsBasicChildSeparator
