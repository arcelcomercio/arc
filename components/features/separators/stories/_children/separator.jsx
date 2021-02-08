import * as React from 'react'

import SeparatorStory from './separator-story'

const classes = {
  separator: `separator bg-white mt-20 w-full pt-0 pr-20 pb-15 pl-20 border-t-1 border-solid position-relative col-3 `,
  title: 'separator__header-title capitalize pb-20 pt-20 text-left text-lg',
  titleLink: 'separator__header-link font-bold',
  oneline: 'separator__oneline',
  twoline: 'separator__twoline',
  threeline: 'separator__threeline',
  body: 'separator__body mt-0 mb-0 flex justify-between',
}

const SeparatorsBasicChildSeparator = ({
  htmlCode,
  titleLink,
  titleSeparator,
  stories,
  isAuthorVisible,
  design,
  bgColor,
  isSeeMoreVisible,
  isImageVisible,
  responsive,
  requestUri,
  arcSite,
}) => {
  const isRecetasSection = /^(\/recetas\/(.*))$/.test(requestUri)
  return (
    <div
      className={`${classes.separator} ${design} ${bgColor} ${responsive} ${
        isRecetasSection ? 'recetas' : ''
      }`}>
      {htmlCode ? (
        <div
          className={classes.title}
          dangerouslySetInnerHTML={{
            __html: htmlCode
          }}
        />
      ) : (
        titleSeparator && (
          <h2 itemProp="name" className={classes.title}>
            <a itemProp="url" href={titleLink} className={classes.titleLink}>
              {titleSeparator}
            </a>
          </h2>
        )
      )}
      {isSeeMoreVisible && (
        <a
          itemProp="url"
          href={titleLink}
          className="separator__button position-absolute right-0 text-sm font-normal border-1 border-gray border-solid p-10 text-gray-200">
          VER MÁS
        </a>
      )}
      <div role="list" className={classes.body}>
        {stories.map(
          ({
            id,
            title,
            websiteLink,
            multimediaType,
            imageUrl,
            author,
            authorLink,
          }) => (
            <SeparatorStory
              key={`separator-st-${id}`}
              title={title}
              websiteLink={websiteLink}
              multimediaType={multimediaType}
              imageUrl={imageUrl}
              author={author}
              authorLink={authorLink}
              isAuthorVisible={isAuthorVisible}
              isImageVisible={isImageVisible}
              arcSite={arcSite}
            />
          )
        )}
      </div>
    </div>
  )
}

export default SeparatorsBasicChildSeparator
