import { useContent } from 'fusion:content'
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
  titleColor,
  stories,
  isAuthorVisible,
  design,
  bgColor,
  isSeeMoreVisible,
  isImageVisible,
  responsive,
  requestUri,
  arcSite,
  isDeporBetsDesign,
  deporBetsText,
  deporBetsImg,
  deporBetsUrl,
  deporBetsAlt,
}) => {
  const isRecetasSection = /^(\/recetas\/(.*))$/.test(requestUri)

  const { resized_urls: { image: resizedDeporBetsImg } = {} } =
    useContent(
      arcSite === 'depor' && isDeporBetsDesign && deporBetsImg
        ? {
            source: 'photo-resizer',
            query: {
              url: deporBetsImg,
              presets: 'image:0x44',
              quality: 100,
              format: /\.png$/.test(deporBetsImg) ? 'png' : '',
            },
          }
        : {}
    ) || {}

  return (
    <div
      className={`${classes.separator} ${design} ${bgColor} ${responsive} ${
        isRecetasSection ? 'recetas' : ''
      } ${arcSite === 'depor' && isDeporBetsDesign ? 's-bets' : ''}`}>
      {htmlCode ? (
        <div
          className={classes.title}
          dangerouslySetInnerHTML={{
            __html: htmlCode,
          }}
        />
      ) : (
        titleSeparator && (
          <h2 itemProp="name" className={classes.title}>
            <a
              itemProp="url"
              href={titleLink}
              className={classes.titleLink}
              style={{ color: titleColor || '' }}>
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
      {arcSite === 'depor' && isDeporBetsDesign && (
        <div className="separator__sponsored">
          <span className="separator__sponsored-txt">
            {deporBetsText || 'Auspiciado por:'}
          </span>
          <a className="separator__sponsored-link" href={deporBetsUrl}>
            <img
              className="separator__sponsored-img"
              src={resizedDeporBetsImg}
              alt={deporBetsAlt}
            />
          </a>
        </div>
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
            isPremium,
          }) => (
            <SeparatorStory
              key={`separator-st-${id}`}
              title={title}
              websiteLink={websiteLink}
              multimediaType={multimediaType}
              imageUrl={imageUrl}
              author={author}
              authorLink={authorLink}
              isPremium={isPremium}
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
