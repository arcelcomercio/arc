import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import VideoJwplayer from '../../../../global-components/video-jwplayer'
import { createScript } from '../../../../utilities/client/nodes'

const JwPlayerVideo = ({
  liveStory,
  image,
  videoID,
  time,
  hasAds,
  account,
  title,
}) => {
  const promoItemJwplayer = {
    key: videoID,
    time,
    has_ads: hasAds,
    account,
    title,
  }
  const { siteProperties: { jwplayers = {} } = {} } = useFusionContext()
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player
  const { payload: imgUrl = '' } = image
  // const scr = `"use strict";var jwplayerObserver=function(e,r){e.forEach(function(e){var t=e.isIntersecting,n=e.target;if(t){console.log("target",n);var o=n.getAttribute("id");if((o=o.split("_"))[1]){var a="https://cdn.jwplayer.com/players/"+o[1]+"-"+o[2]+".js",i=document.createElement("script");i.type="text/javascript",i.src=a,document.head.append(i)}r.unobserve(n)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.body.querySelectorAll(".jwplayer-lazy")),r=new IntersectionObserver(jwplayerObserver,{rootMargin:"0px"});e.forEach(function(e){r.observe(e)})}})});`
  // const scr = 'console.log(999);'

  const scriptTag = createScript({
    src: `https://cdn.jwplayer.com/players/${videoID}-${jwplayerId}.js`,
    // defer: true,
  })

  /* useEffect(() => {
    console.log(88)
    document.body
      .querySelector('.headband__fixedvideo__container')
      .append(scriptTag)
  }) */
  const boxVideo = document.body.querySelector(
    '.headband__fixedvideo__container'
  )
  let hasScript = false
  for (let i = 0; i < boxVideo.children.length; i++) {
    if (boxVideo.children[i].tagName === 'SCRIPT') {
      hasScript = true
      break
    }
  }
  if (!hasScript) {
    boxVideo.appendChild(scriptTag)
  }
  return (
    <>
      <div
        className="stories-video__box-jwplayer"
        data-img={imgUrl}
        data-time={time}
        data-live={liveStory}
        data-stream={jwplayerId}
        data-uuid={videoID}
        data-account={account}>
        <VideoJwplayer data={promoItemJwplayer}></VideoJwplayer>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: scr,
          }}
        /> */}

        {/* <script
          type="text/javascript"
          src={`https://cdn.jwplayer.com/players/${videoID}-${jwplayerId}.js`}></script> */}
      </div>
    </>
  )
}

JwPlayerVideo.propTypes = {
  videoID: PropTypes.string.isRequired,
}

export default JwPlayerVideo
