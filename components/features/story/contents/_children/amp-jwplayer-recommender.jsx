import React from 'react'

function StoryContentChildJwplayerRecommenderAmp({
  videoId,
  playerId = 'uR4oallO',
}) {
  return (
    <amp-jwplayer
      data-media-id={`${videoId}`}
      data-player-id={playerId}
      layout="responsive"
      width="16"
      height="9"
      data-content-search="__CONTEXTUAL__"
      data-content-backfill="true"
      // dock="#my-dock-slot"
    />
  )
}

export default StoryContentChildJwplayerRecommenderAmp
