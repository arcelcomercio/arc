import React from 'react'
import { getIcon } from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'
import ConfigParams from '../../../../utilities/config-params'
import DataStory from '../../../../utilities/story-data'

// Basic flex stuff
const classes = {
  related: 'related-content pt-20 pb-20',
  item:
    'related-content__item pt-15 pb-15 border-t-1 border-solid border-base md:justify-between md:flex',
  info: 'related-content__information mb-20 md:mb-0',
  itemTitle: 'related-content__item-title mb-10 text-md line-h-md',
  itemTitleLink: 'related-content__link font-bold',
  multimedia: 'related-content__multimedia position-relative',
  link: 'block w-full h-full',
  image: 'w-full h-full',
  icon: 'related-content__icon position-absolute p-5 rounded-lg title-xl',
  author: 'related-content__author uppercase text-gray-200',
}

const RenderRelatedContentElement = (elements, i) => {
  const get = new DataStory({
    data: elements,
  })
  const filterData = {
    nameTitle: get.title,
    urlTitle: get.link,
    multimediaType: get.multimediaType,
    multimediaImg: get.multimedia,
  }

  return (
    <article role="listitem" className={classes.item} key={UtilListKey(i + 12)}>
      <div className={classes.info}>
        <h2 className={classes.itemTitle}>
          <a href={filterData.urlTitle} className={classes.itemTitleLink}>
            {filterData.nameTitle}
          </a>
        </h2>
        <a href={filterData.nameAuthorLink} className={classes.author}>
          {filterData.nameAuthor}
        </a>
      </div>
      <figure className={classes.multimedia}>
        <a href={filterData.urlTitle} className={classes.link}>
          <img
            src={filterData.multimediaImg}
            alt={filterData.nameTitle}
            className={classes.image}
            loading="lazy"
          />
          {filterData.multimediaType === ConfigParams.IMAGE ||
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
      </figure>
    </article>
  )
}

export default RenderRelatedContentElement
