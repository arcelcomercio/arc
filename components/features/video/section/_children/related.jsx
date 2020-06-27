import React from 'react'
import UtilListKey from '../../../../utilities/list-keys'
import { IMAGE } from '../../../../utilities/constants/multimedia-types'
import DataStory from '../../../../utilities/story-data'

const getIcon = type => {
  switch (type) {
    case 'basic_gallery':
      return 'img'
    case 'basic_video':
      return 'video'
    default:
      return ''
  }
}

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
  image: 'w-full h-full object-cover',
  icon: 'related-content__icon position-absolute p-5 rounded-lg title-xl',
  author: 'related-content__author uppercase text-gray-200',
}

const RenderRelatedContentElement = (props, i, isAmp) => {
  const { deployment, contextPath, arcSite } = props

  const get = new DataStory({
    data: props,
    contextPath,
    deployment,
    arcSite,
    defaultImgSize: 'sm',
  })
  const filterData = {
    nameTitle: get.title,
    urlTitle: get.link,
    multimediaType: get.multimediaType,
    multimediaImg: get.multimediaLandscapeMD,
  }

  return (
    <article role="listitem" className={classes.item} key={UtilListKey(i + 12)}>
      <div className={classes.info}>
        <h2 itemProp="name" className={classes.itemTitle}>
          <a
            itemProp="url"
            href={filterData.urlTitle}
            className={classes.itemTitleLink}>
            {filterData.nameTitle}
          </a>
        </h2>
        {filterData.nameAuthor && (
          <a
            itemProp="url"
            href={filterData.nameAuthorLink}
            className={classes.author}>
            {filterData.nameAuthor}
          </a>
        )}
      </div>
      <figure className={classes.multimedia}>
        <a itemProp="url" href={filterData.urlTitle} className={classes.link}>
          {isAmp ? (
            <amp-img
              src={filterData.multimediaImg}
              alt={filterData.nameTitle}
              class={classes.image}
              height="285"
              width="514"
              layout="responsive"
            />
          ) : (
            <img
              src={filterData.multimediaImg}
              alt={filterData.nameTitle}
              className={classes.image}
            />
          )}

          {filterData.multimediaType === IMAGE ||
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
