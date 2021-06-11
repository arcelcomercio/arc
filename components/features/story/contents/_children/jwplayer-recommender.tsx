import React from 'react'

interface FeatureProps {
  videoId?: string
  playerId?: string
}

const StoryContentChildJwplayerRecommender: React.FC<FeatureProps> = ({
  videoId,
  playerId = 'uR4oallO',
}) => (
  <>
    <div id={`botr_${videoId}_${playerId}_div`} />
    <script
      src={`https://cdn.jwplayer.com/players/${videoId}-${playerId}.js?search=__CONTEXTUAL__`}
    />
  </>
)

export default React.memo(StoryContentChildJwplayerRecommender)
