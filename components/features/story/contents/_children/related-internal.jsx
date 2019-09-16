import React from 'react'
// import StoryData from '../../../../utilities/story-data'
import { getIcon } from '../../../../utilities/helpers'
import ConfigParams from '../../../../utilities/config-params'
import DataStory from '../../../../utilities/story-data'

// Basic flex stuff
const classes = {
  related: 'related-internal position-relative md:pb-10 md:pr-20 md:pl-20',
  title: 'related-internal__title font-bold uppercase mb-10',
  multimedia: 'related-internal__figure position-relative',
  linkAuthor: 'related-internal__link-author',
  image: 'w-full',
  icon:
    'related-internal__multimedia-icon position-absolute p-5 rounded-lg title-xl',
  info:
    'related-internal__information pt-20 pb-20 md:pt-20 md:pb-20 md:pr-10 md:pl-10',
  titleLink: 'related-internal__title-link',
}

const RelartedItem = ({ data } /* , i */) => {
  const {
    title,
    link,
    multimediaType,
    multimedia,
    authorLink,
    author,
  } = new DataStory({
    data,
  })

  return (
    <>
      <div className={classes.related}>
        <div className={classes.title}>Siga Leyendo </div>
        <div className={`${classes.info}`}>
          <h2 className={classes.titleLink}>
            <a href={link}>{title}</a>
          </h2>
          <a className={classes.linkAuthor} href={authorLink} title={author}>
            {author}
          </a>
        </div>
        <figure className={classes.multimedia}>
          <a href={link}>
            <img src={multimedia} alt={title} className={classes.image} />
            {multimediaType === ConfigParams.IMAGE || multimediaType === '' ? (
              ''
            ) : (
              <span
                className={`${classes.icon} icon-${getIcon(multimediaType)}`}
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
