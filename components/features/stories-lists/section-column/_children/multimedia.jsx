import React from 'react'
import { getMultimediaIcon } from '../../../../utilities/helpers'

const classes = {
  figure: 'position-relative mb-10 overflow-hidden block',
  icon:
    'sec-col__icon m-icon position-absolute text-center mx-auto rounded text-gray-100',
  image: 'sec-col__image w-full object-center object-cover',
}

const StoriesListsCardChildMultimedia = ({
  urlNews,
  multimedia,
  lazyImage,
  multimediaType,
  isAdmin,
}) => {
  return (
    <a itemProp="url" href={urlNews} className={classes.figure}>
      {getMultimediaIcon(multimediaType) && (
        <i className={`${getMultimediaIcon(multimediaType)} ${classes.icon}`} />
      )}

      <img
        className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
        src={isAdmin ? multimedia : lazyImage}
        data-src={multimedia}
        alt=""
      />
    </a>
  )
}

export default StoriesListsCardChildMultimedia
