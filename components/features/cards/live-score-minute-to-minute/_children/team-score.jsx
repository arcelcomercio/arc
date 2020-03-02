import React from 'react'

import ItemScore from './item-score'
// import ItemTeamFlag from './item-team-flag'
import ItemTeamName from './item-team-name'

const classes = {
  scoreBox: 'score__team flex items-start pl-20 pr-20',
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
        <ItemTeamName name={name} flag={flag} />
      ) : (
        <ItemScore scoreTeam={scoreTeam} />
      )}

      {homeTeam ? (
        <ItemScore scoreTeam={scoreTeam} />
      ) : (
        <ItemTeamName name={name} flag={flag} />
      )}
    </div>
  )
}

export default LiveScoreMinuteToMinuteTeanScore
