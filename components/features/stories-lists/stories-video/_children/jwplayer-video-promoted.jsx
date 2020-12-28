import React from 'react'
import PropTypes from 'prop-types'
import VideoJwplayer from '../../../../global-components/video-jwplayer'

const classes = {
  listItemText:
    'stories-video__content pt-10 lg:pt-20 pl-10 lg:pl-20 pr-10 lg:pr-20 pb-10 w-full position-relative',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  closeSticky:
    'stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold',
}

const ItemVideoCenterDestacado = ({
  title,
  liveStory,
  image,
  videoID,
  time,
  hasAds,
  account,
  duration,
}) => {
  const promoItemJwplayer = {
    key: videoID,
    duration,
    has_ads: hasAds,
    account,
    title,
  }
  return (
    <>
      <div data-img={image} data-time={time} data-live={liveStory}>
        <VideoJwplayer data={promoItemJwplayer}></VideoJwplayer>
      </div>

      <div className={classes.listItemText}>
        <div className={classes.listBorder}>
          <h2 itemProp="name" className={classes.listItemTitleDest}>
            {title}
          </h2>
        </div>
        <span role="button" tabIndex="0" className={classes.closeSticky}>
          X
        </span>
      </div>
    </>
  )
}

ItemVideoCenterDestacado.propTypes = {
  // isAdmin: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  videoID: PropTypes.string.isRequired,
  // autoPlayVideo: PropTypes.bool.isRequired,
}

export default ItemVideoCenterDestacado
