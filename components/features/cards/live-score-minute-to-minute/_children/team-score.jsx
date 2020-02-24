import React from 'react'

import ItemScore from './item-score'
// import ItemTeamFlag from './item-team-flag'
import ItemTeamName from './item-team-name'

const classes = {
  scoreBox: 'score__team flex items-center mb-15 pl-20 pr-20',
}

const LiveScoreMinuteToMinuteTeanScore = ({
  homeTeam = true,
  name = '',
  flag = '',
  scoreTeam = 0,
}) => {
  return (
    <div className={classes.scoreBox}>
      {homeTeam ? (
        <ItemTeamName name={name} flags={flag} />
      ) : (
        <ItemScore scoreTeam={scoreTeam} />
      )}

      {homeTeam ? (
        <ItemScore scoreTeam={scoreTeam} />
      ) : (
        <ItemTeamName name={name} flags={flag} />
      )}
    </div>
  )
}

export default LiveScoreMinuteToMinuteTeanScore
