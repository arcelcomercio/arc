import React from 'react'
// import StoryData from '../../../../utilities/story-data'
import { getIcon } from '../../../../utilities/helpers'
import ConfigParams from '../../../../utilities/config-params'

// Basic flex stuff
const classes = {
  related: 'related-internal margin-top',
  relatedItem: 'related-internal__item',
  relatedTitleItem: 'related-internal__title-item',
  relatedTitle: 'related-internal__title',
  relatedMultimedia: 'related-internal__multimedia',
  relatedLink: 'related-internal__multimedia-link',
  relatedImage: 'related-internal__multimedia-img',
  relatedIcon: 'related-internal__multimedia-icon icon-',
  relatedInfo: 'related-internal__information',
}

const RelartedItem = ({ data } /* , i */) => {
  const {
    contextPath,
    headlines: { basic: storyTitle } = {},
    website_url: storyUrl,
    promo_items: { basic: imageData = {} } = {},
  } = data

  const filterData = {
    nameTitle: storyTitle,
    urlTitle: storyUrl,
    multimediaType: imageData.type,
    multimediaImg: imageData.url,
  }

  return (
    <>
      <div className={classes.related}>
        <div className={classes.relatedTitle}>Siga Leyendo </div>
        <div className={`${classes.relatedInfo}`}>
          <h2 className={`${classes.relatedTitleItem}`}>
            <a href={`${contextPath}${filterData.urlTitle}`}>
              {filterData.nameTitle}
            </a>
          </h2>
        </div>
        <figure className={classes.relatedMultimedia}>
          <a
            href={`${contextPath}${filterData.urlTitle}`}
            className={classes.relatedLink}>
            <img
              src={filterData.multimediaImg}
              alt={filterData.nameTitle}
              className={classes.relatedImage}
            />
            {filterData.multimediaType === ConfigParams.IMAGE ||
            filterData.multimediaType === '' ? (
              ''
            ) : (
              <span
                className={`${classes.relatedIcon}${getIcon(
                  filterData.multimediaType
                )}`}
              />
            )}
          </a>
          {/* <Icon iconClass={story.iconClass} /> */}
        </figure>
      </div>
    </>
  )
}

const StoryContentChildRelatedInternal = ({ stories, id, contextPath }) => {
  const keyinternal = 'story-related-internal'

  return (
    <>
      {stories.map((item, index) =>
        item._id === id ? (
          <RelartedItem
            key={keyinternal.concat(item._id).concat(index)}
            data={item}
            contextPath={contextPath}
          />
        ) : null
      )}
    </>
  )
}

export default StoryContentChildRelatedInternal
