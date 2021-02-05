import React from 'react'

function StoryContentChildJwplayerRecommenderAmp({
  videoId,
  playerId = 'uR4oallO',
}) {
  return (
    <amp-script
      src={`https://cdn.jwplayer.com/players/${videoId}-${playerId}.js?search=__CONTEXTUAL__`}></amp-script>
  )
}

export default StoryContentChildJwplayerRecommenderAmp
