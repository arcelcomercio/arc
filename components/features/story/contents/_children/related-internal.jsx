import React from 'react'
// import StoryData from '../../../../utilities/story-data'
import { getIcon } from '../../../../utilities/helpers'
import ConfigParams from '../../../../utilities/config-params'
import DataStory from '../../../../utilities/story-data'

// Basic flex stuff
const classes = {
  related:
    'related-internal position-relative mt-20 md:pb-10 md:pt-10 md:pr-20 md:pl-20',
  title: 'related-internal__title font-bold uppercase mb-10',
  multimedia: 'position-relative',
  image: 'w-full',
  icon:
    'related-internal__multimedia-icon position-absolute p-5 rounded-lg title-xl',
  info:
    'related-internal__information pt-20 pb-20 md:pt-20 md:pb-20 md:pr-10 md:pl-10',
}

const RelartedItem = ({ data } /* , i */) => {
  const get = new DataStory({
    data,
  })

  const filterData = {
    nameTitle: get.title,
    urlTitle: get.link,
    multimediaType: get.multimediaType,
    multimediaImg: get.multimedia,
  }

  return (
    <>
      <div className={classes.related}>
        <div className={classes.title}>Siga Leyendo </div>
        <div className={`${classes.info}`}>
          <h2>
            <a href={filterData.urlTitle}>{filterData.nameTitle}</a>
          </h2>
        </div>
        <figure className={classes.multimedia}>
          <a href={filterData.urlTitle}>
            <img
              src={filterData.multimediaImg}
              alt={filterData.nameTitle}
              className={classes.image}
              
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
      </div>
    </>
  )
}

const StoryContentChildRelatedInternal = ({ stories, id }) => {
  const keyinternal = 'story-related-internal'

  return (
    <>
      {stories.map((item, index) =>
        item._id === id ? (
          <RelartedItem
            key={keyinternal.concat(item._id).concat(index)}
            data={item}
          />
        ) : null
      )}
    </>
  )
}

export default StoryContentChildRelatedInternal
