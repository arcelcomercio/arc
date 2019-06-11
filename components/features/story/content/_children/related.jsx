import React from 'react'
import { getIcon } from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'

// Basic flex stuff
const classes = {
  related: 'related-content',
  relatedItem: 'related-content__item',
  relatedTitleItem: 'related-content__title-item',
  relatedMultimedia: 'related-content__multimedia position-relative',
  relatedLink: 'block full-width full-height',
  relatedImage: 'full-width full-height',
  relatedIcon: 'related-content__icon position-absolute',
  relatedAuthor: 'related-content__author uppercase',
  relatedInfo: 'related-content__information',
}

const RenderRelatedContentElement = (elements, i) => {
  const {
    contextPath,
    headlines: { basic: storyTitle } = {},
    website_url: storyUrl,
    promo_items: { basic: imageData = {} } = {},
  } = elements

  const filterData = {
    nameTitle: storyTitle,
    urlTitle: storyUrl,
    multimediaType: imageData.type,
    multimediaImg: imageData.url,
  }

  return (
    <article
      role="listitem"
      className={classes.relatedItem}
      key={UtilListKey(i + 12)}>
      <div className={classes.relatedInfo}>
        <h2 className={classes.relatedTitleItem}>
          <a href={`${contextPath}${filterData.urlTitle}`}>
            {filterData.nameTitle}
          </a>
        </h2>
        <a href={filterData.nameAuthorLink} className={classes.relatedAuthor}>
          {filterData.nameAuthor}
        </a>
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
              className={`${classes.relatedIcon} icon-${getIcon(
                filterData.multimediaType
              )}`}
            />
          )}
        </a>
        {/* <Icon iconClass={story.iconClass} /> */}
      </figure>
    </article>
  )
}

export default RenderRelatedContentElement
