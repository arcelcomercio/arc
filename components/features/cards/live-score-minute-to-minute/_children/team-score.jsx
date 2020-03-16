import React from 'react'

import ItemScore from './item-score'
import ItemTeamName from './item-team-name'

const classes = {
  scoreBox: 'score__team flex items-center md:items-end pl-20 pr-20',
}

const LiveScoreMinuteToMinuteTeanScore = ({
  homeTeam = true,
  matchstatus = '',
  name = '',
  flag = '',
  scoreTeam = 0,
}) => {
  return (
    <div className={classes.scoreBox}>
      {homeTeam ? (
        <ItemTeamName name={name} flag={flag} />
      ) : (
        <ItemScore scoreTeam={scoreTeam} matchstatus={matchstatus} />
      )}

      {homeTeam ? (
        <ItemScore scoreTeam={scoreTeam} matchstatus={matchstatus} />
      ) : (
        <ItemTeamName name={name} flag={flag} />
      )}
    </div>
  )
}

export default LiveScoreMinuteToMinuteTeanScore
