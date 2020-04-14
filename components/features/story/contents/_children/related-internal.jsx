import React from 'react'
import { IMAGE } from '../../../../utilities/constants/multimedia-types'
import StoryData from '../../../../utilities/story-data'

// Basic flex stuff
const classes = {
  related: 'related-internal position-relative p-20',
  item: 'related-internal__item flex flex-row mt-20',
  title: 'related-internal__title uppercase mb-20',
  multimedia: 'related-internal__figure position-relative',
  linkAuthor: 'related-internal__link-author',
  image: 'w-full h-full lazy',
  icon:
    'related-internal__multimedia-icon position-absolute p-5 rounded-lg title-xl',
  info:
    'related-internal__information w-full md:pr-10 pl-20',
  titleLink: 'related-internal__title-link underline font-bold',
}

// Funcion extraida de helpersW
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

const RelatedItem = ({ data, imageDefault } /* , i */) => {
 
  const get = new StoryData({
    data,
    defaultImgSize: 'sm',
  })
  const filterData = {
    title: get.title,
    websiteLink: get.link,
    multimediaType: get.multimediaType,
    multimediaImg: get.multimediaLandscapeMD
  }

  return (
    <>
      <div className={classes.item}>
        <figure className={classes.multimedia}>
          <a href={filterData.websiteLink}>
            <img
              src={imageDefault}
              data-src={filterData.multimediaImg}
              alt={filterData.title}
              className={classes.image}
            />
            {filterData.multimediaType === IMAGE || filterData.multimediaType === '' ? (
              ''
            ) : (
              <span
                className={`${classes.icon} icon-${getIcon(filterData.multimediaType)}`}
              />
            )}
          </a>
        </figure>
        <div className={`${classes.info}`}>
          <h2 className={classes.titleLink}>
            <a href={filterData.websiteLink}>{filterData.title}</a>
          </h2>
        </div>
      </div>
    </>
  )
}

const StoryContentChildRelatedInternal = ({ stories, ids, imageDefault }) => {
  const keyinternal = 'story-related-internal'

  return (
    <div className={classes.related}>
      <div className={classes.title}>Mira También:</div>
      {stories.map((item, index) =>
        ids.includes(item._id) ? (
          <RelatedItem
            key={keyinternal.concat(item._id).concat(index)}
            data={item}
            imageDefault={imageDefault}
          />
        ) : null
      )}
    </div>
  )
}

export default StoryContentChildRelatedInternal
