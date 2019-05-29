import React, { Fragment } from 'react'
import UtilListKey from '../../../../utilities/list-keys'
import StoryData from '../../../../utilities/story-data'
import { getIcon } from '../../../../utilities/helpers'

// Basic flex stuff
const classes = {
  related: 'related-interna margin-top',
  relatedItem: 'related-interna__item',
  relatedTitleItem: 'related-interna__title-item',
  relatedTitle: 'related-interna__title',
  relatedMultimedia: 'related-interna__multimedia',
  relatedLink: 'related-interna__multimedia-link',
  relatedImage: 'related-interna__multimedia-img',
  relatedIcon: 'related-interna__multimedia-icon icon-',
  relatedInfo: 'related-interna__information',
}

const RelartedItem = ({ data }, i) => {
  const {
    contextPath,
    headlines: { basic: articleTitle } = {},
    website_url: articleUrl,
    promo_items: { basic: imageData = {} } = {},
  } = data

  const filterData = {
    nameTitle: articleTitle,
    urlTitle: articleUrl,
    multimediaType: imageData.type,
    multimediaImg: imageData.url,
  }

  return (
    <Fragment>
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
            {filterData.multimediaType === 'basic' ||
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
    </Fragment>
  )
}

const ArticleBodyChildRelatedInternal = ({ stories, id, contextPath }) => {
  return (
    <Fragment>
      {stories.map((item, index) =>
        item._id === id ? (
          <RelartedItem
            key={UtilListKey(index)}
            data={item}
            contextPath={contextPath}
          />
        ) : null
      )}
    </Fragment>
  )
}

export default ArticleBodyChildRelatedInternal
