import React from 'react'

import ItemScore from './item-score'
import ItemTeamFlag from './item-team-flag'
import ItemTeamName from './item-team-name'

const LiveScoreMinuteToMinuteTeanScore = ({ firstTeamName = true }) => {
  return (
    <>
      <div>
        {firstTeamName ? <ItemTeamName /> : <ItemScore />}
        <ItemTeamFlag />
        {firstTeamName ? <ItemScore /> : <ItemTeamName />}
        <div>eventos</div>
      </div>
    </>
  )
}

export default LiveScoreMinuteToMinuteTeanScore
