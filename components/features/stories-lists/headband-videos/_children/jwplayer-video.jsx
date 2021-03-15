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

  const uriScript = `https://cdn.jwplayer.com/players/${videoID}-${jwplayerId}.js`
  const scriptTag = createScript({
    src: uriScript,
    // defer: true,
  })

  /* useEffect(() => {
    console.log(88)
    document.body
      .querySelector('.headband__fixedvideo__container')
      .append(scriptTag)
  }) */

  const buildVideoId = (url) => {
    const [,,,,dataIds] = url.split('/')
    const [ids,] = dataIds.split('.')
    const [videoId, playerJwId] = ids.split('-')
    return `botr_${videoId}_${playerJwId}_div`
  }

  if (typeof window !== 'undefined') {
    const boxVideo = document.body.querySelector(
      '.headband__fixedvideo__container'
    )
    const idDiv = `botr_${videoID}_${jwplayerId}_div`
    let hasScript = false
    for (let i = 0; i < boxVideo.children.length; i++) {
      const element = boxVideo.children[i]
      if (element.tagName === 'SCRIPT') {
        const urlCurrentScript = element.getAttribute('src')
        hasScript = true
        if(urlCurrentScript !== uriScript){
          const videoContainer = document.body.querySelector(`#${buildVideoId(urlCurrentScript)}`)
          if(videoContainer){
            videoContainer.setAttribute('id', idDiv)
          }
          element.remove()
          hasScript = false
        }
        break
      }
    }
    if (!hasScript) {
      boxVideo.appendChild(scriptTag)
    }
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

      </div>
    </>
  )
}

JwPlayerVideo.propTypes = {
  videoID: PropTypes.string.isRequired,
}

export default JwPlayerVideo
