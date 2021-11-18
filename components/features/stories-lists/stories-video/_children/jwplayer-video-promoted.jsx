import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'
import React from 'react'

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
  section,
}) => {
  const promoItemJwplayer = {
    key: videoID,
    time,
    has_ads: hasAds,
    account,
    title,
    section,
  }
  const { siteProperties: { jwplayers = {} } = {} } = useFusionContext()
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player
  // const scr = `"use strict";var jwplayerObserver=function(e,r){e.forEach(function(e){var t=e.isIntersecting,n=e.target;if(t){console.log("target",n);var o=n.getAttribute("id");if((o=o.split("_"))[1]){var a="https://cdn.jwplayer.com/players/"+o[1]+"-"+o[2]+".js",i=document.createElement("script");i.type="text/javascript",i.src=a,document.head.append(i)}r.unobserve(n)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.body.querySelectorAll(".jwplayer-lazy")),r=new IntersectionObserver(jwplayerObserver,{rootMargin:"0px"});e.forEach(function(e){r.observe(e)})}})});`
  return (
    <>
      <div
        className="stories-video__box-jwplayer"
        data-img={image}
        data-time={time}
        data-live={liveStory}
        data-stream={jwplayerId}
        data-uuid={videoID}
        data-account={account}>
        <VideoJwplayer data={promoItemJwplayer} />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: scr,
          }}
        /> */}
        {/* <script
          src={`https://cdn.jwplayer.com/players/${videoID}-${jwplayerId}.js`}></script> */}
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
