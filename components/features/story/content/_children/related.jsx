import React from 'react'
import { getIcon } from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'

// Basic flex stuff
const classes = {
  related: 'related-content pt-20 pb-20',
  item: 'related-content__item pt-15 pb-15 border-solid',
  info: 'related-content__information mb-20',
  itemTitle: 'related-content__item-title mb-10',
  multimedia: 'related-content__multimedia position-relative',
  link: 'block w-full h-full',
  image: 'w-full h-full',
  icon: 'related-content__icon position-absolute p-5',
  author: 'related-content__author uppercase',
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
    <article role="listitem" className={classes.item} key={UtilListKey(i + 12)}>
      <div className={classes.info}>
        <h2 className={classes.itemTitle}>
          <a href={`${contextPath}${filterData.urlTitle}`}>
            {filterData.nameTitle}
          </a>
        </h2>
        <a href={filterData.nameAuthorLink} className={classes.author}>
          {filterData.nameAuthor}
        </a>
      </div>
      <figure className={classes.multimedia}>
        <a
          href={`${contextPath}${filterData.urlTitle}`}
          className={classes.link}>
          <img
            src={filterData.multimediaImg}
            alt={filterData.nameTitle}
            className={classes.image}
          />
          {filterData.multimediaType === 'basic' ||
          filterData.multimediaType === '' ? (
            ''
          ) : (
            <span
              className={`${classes.icon} icon-${getIcon(
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
