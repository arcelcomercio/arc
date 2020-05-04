import React, { memo } from 'react'
import PropTypes from 'prop-types'

const classes = {
  listItemTitle: 'stories-video__item-title text-white mb-10',
  listItemInfo: 'stories-video__item-text text-white',
  listItemImg:
    'stories-video__item-img w-full h-full object-cover object-center mr-15',
  listItemImgDefault:
    'stories-video__item-default w-full h-full object-cover object-center mr-15',
  live: 'stories-video__item-live flex items-center uppercase',
}

const YoutubeVideoNoDestacado = ({
  isAdmin,
  title,
  liveStory,
  image,
  imageDefault,
  videoID,
}) => {
  const imageclass =
    imageDefault === false ? classes.listItemImg : classes.listItemImgDefault
  return (
    <>
      <img
        src={isAdmin ? image : ''}
        data-src={image}
        data-video={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
        alt={title}
        className={`${imageclass} ${isAdmin ? '' : 'lazy'}`}
      />
      <div className={classes.listItemInfo}>
        <h2 className={classes.listItemTitle}>{title}</h2>
        {liveStory && <p className={classes.live}>EN VIVO</p>}
      </div>
    </>
  )
}

YoutubeVideoNoDestacado.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  imageDefault: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  videoID: PropTypes.string.isRequired,
  liveStory: PropTypes.bool.isRequired,
}

export default memo(YoutubeVideoNoDestacado)
