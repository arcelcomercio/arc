import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import { createMarkup } from '../../../utilities/helpers'
import Icon from '../../../global-components/multimedia-icon'
import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
// import SeparatorList from './_children/separator'

const classes = {
  separator: `separator bg-white mt-20 w-full pt-0 pr-20 pb-15 pl-20 border-t-1 border-solid`,
  title: 'separator__header-title capitalize pb-20 pt-20 text-left text-lg',
  titleLink: 'separator__header-link font-bold',
  oneline: 'separator__oneline',
  twoline: 'separator__twoline',
  threeline: 'separator__threeline',
  body: 'separator__body mt-0 mb-0 flex justify-between',

  item: 'separator__item hidden w-full h-full p-0 position-relative',
  detail: 'separator__detail position-absolute bottom-0 pr-15 pl-15 pb-15',
  text: 'separator__title overflow-hidden text-white text-md line-h-sm',
  imgBox: 'p-0 m-0 w-full h-full overflow-hidden',
  img: 'separator__img w-full h-full object-cover object-center',
  icon: `separator__icon`,
  article: `separator__article h-full`,
}

const SeparatorStories = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      titleSeparator,
      titleLink,
      htmlCode,
      isThreeCol,
      isAuthorVisible,
    } = {},
  } = props

  const { arcSite, isAdmin, contextPath, deployment } = useFusionContext()

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter,
    }) || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const stories = contentElements.map(story => {
    storyData._data = story
    const {
      title,
      link,
      multimediaLazyDefault,
      multimediaPortraitMD,
      multimediaLandscapeL,
      multimediaLandscapeS,
      multimediaType,
      author,
      authorLink,
    } = storyData
    return {
      title,
      link,
      multimediaLazyDefault,
      imageUrl:
        arcSite === 'peru21' ? multimediaPortraitMD : multimediaLandscapeS,
      imageUrlMobile:
        arcSite === 'peru21' ? multimediaPortraitMD : multimediaLandscapeL,
      multimediaType,
      author,
      authorLink,
    }
  })

  return (
    <div className={`${classes.separator}${isThreeCol ? ' col-3' : ''}`}>
      {htmlCode ? (
        <div
          className={classes.title}
          dangerouslySetInnerHTML={createMarkup(htmlCode)}
        />
      ) : (
        <h2 className={classes.title}>
          <a href={titleLink} className={classes.titleLink}>
            {titleSeparator}
          </a>
        </h2>
      )}
      <div role="list" className={classes.body}>
        {stories.map(
          ({
            title,
            link,
            multimediaLazyDefault,
            multimediaType,
            imageUrl,
            author,
            authorLink,
            imageUrlMobile,
          }) => (
            <div className={classes.item}>
              <article role="listitem" className={classes.article}>
                <Icon type={multimediaType} iconClass={classes.icon} />
                <div className={classes.detail}>
                  <h3 className={classes.text}>
                    <a href={link} title={title}>
                      {title}
                    </a>
                  </h3>
                  {isAuthorVisible && (
                    <h2>
                      <a
                        href={authorLink}
                        className="block text-sm uppercase text-gray-200 mt-10 mb-20">
                        {author}
                      </a>
                    </h2>
                  )}
                </div>
                <a href={link}>
                  <picture className={classes.imgBox}>
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
                      className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
                    />
                  </picture>
                </a>
              </article>
            </div>
          )
        )}
      </div>
    </div>
  )
}

SeparatorStories.label = 'Separador - noticias'
SeparatorStories.static = true

SeparatorStories.propTypes = {
  customFields,
}

export default SeparatorStories
