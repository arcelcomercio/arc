import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'

const classes = {
  listItemTitle: 'stories-video__item-title text-white mb-10',
  listItemInfo: 'stories-video__item-text text-white',
  listItemImg:
    'stories-video__item-img w-full h-full object-cover object-center mr-15',
  listItemImgDefault:
    'stories-video__item-default w-full h-full object-cover object-center mr-15',
  listItemTime:
    'stories-video__item-time position-absolute icon-video text-white flex justify-center items-center',
  live: 'stories-video__item-live flex items-center uppercase',
}

const ItemVideoCenterNoDestacado = ({
  isAdmin,
  title = '',
  liveStory,
  image = '',
  videoID = '',
  time,
  account = 'gec',
  hasAds = '',
}) => {
  const { siteProperties: { jwplayers = {} } = {} } = useFusionContext()
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player

  return (
    <>
      <img
        src={isAdmin ? image : ''}
        data-src={image}
        alt={title}
        className={`${classes.listItemImg} ${isAdmin ? '' : 'lazy'}`}
        data-stream={jwplayerId}
        data-uuid={videoID}
        account={account}
      />
      <span className={classes.listItemTime}>{time}</span>
      <div className={classes.listItemInfo}>
        <h2 itemProp="name" className={classes.listItemTitle}>
          {title}
        </h2>
        {liveStory && (
          <p itemProp="description" className={classes.live}>
            EN VIVO
          </p>
        )}
      </div>
    </>
  )
}

ItemVideoCenterNoDestacado.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  liveStory: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  videoID: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
}

export default memo(ItemVideoCenterNoDestacado)
