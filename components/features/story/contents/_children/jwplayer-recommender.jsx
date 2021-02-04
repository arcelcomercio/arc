import React from 'react'

function StoryContentChildJwplayerRecommender({
  videoId,
  playerId = 'uR4oallO',
}) {
  return (
    <script
      src={`https://cdn.jwplayer.com/players/${videoId}-${playerId}.js?search=__CONTEXTUAL__`}></script>
  )
}

export default StoryContentChildJwplayerRecommender
