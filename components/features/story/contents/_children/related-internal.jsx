import React from 'react'
import { IMAGE } from '../../../../utilities/constants/multimedia-types'
import StoryData from '../../../../utilities/story-data'
import { createResizedParams } from '../../../../utilities/resizer/resizer'

// Basic flex stuff
const classes = {
  related: 'related-internal position-relative p-20 mb-20 mt-20 border-1',
  item: 'related-internal__item flex flex-row mt-20',
  title: 'related-internal__title uppercase mb-20',
  multimedia: 'related-internal__figure position-relative',
  linkAuthor: 'related-internal__link-author',
  image: 'w-full h-full object-cover',
  icon:
    'related-internal__multimedia-icon position-absolute p-5 rounded-lg title-xl',
  info: 'related-internal__information w-full md:pr-10 pl-20',
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

const RelatedItem = ({ data, imageDefault, arcSite, isAdmin } /* , i */) => {
  const get = new StoryData({
    data,
    defaultImgSize: 'sm',
  })

  const { landscape_md: landscapeMD = {} } =
    createResizedParams({
      url: get.multimediaLandscapeMD,
      presets: 'landscape_md:314x157',
      arcSite,
    }) || {}

  const filterData = {
    title: get.title,
    websiteLink: get.link,
    multimediaType: get.multimediaType,
    multimediaImg: landscapeMD,
  }

  return (
    <>
      <div className={classes.item}>
        <figure className={classes.multimedia}>
          <a itemProp="url" href={filterData.websiteLink}>
            <img
              src={isAdmin ? filterData.multimediaImg : imageDefault}
              data-src={filterData.multimediaImg}
              alt={filterData.title}
              className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
            />
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
        <div className={`${classes.info}`}>
          <h2 itemProp="name" className={classes.titleLink}>
            <a itemProp="url" href={filterData.websiteLink}>
              {filterData.title}
            </a>
          </h2>
        </div>
      </div>
    </>
  )
}

const StoryContentChildRelatedInternal = ({
  stories,
  ids,
  imageDefault,
  arcSite,
  isAdmin,
}) => {
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
            arcSite={arcSite}
            isAdmin={isAdmin}
          />
        ) : null
      )}
    </div>
  )
}
export default StoryContentChildRelatedInternal
