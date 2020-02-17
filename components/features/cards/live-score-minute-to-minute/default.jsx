import React from 'react'

import TeanScore from './_children/team-score'

const classes = {
  liveScore: 'flex flex-row',
}

const LiveScoreMinuteToMinute = () => {
  const teanScoreParams1 = {
    firstTeamName: true,
  }
  const teanScoreParams2 = {
    firstTeamName: false,
  }
  return (
    <div className={classes.liveScore}>
      <TeanScore {...teanScoreParams1} />
      <span>Fin</span>
      <TeanScore {...teanScoreParams2} />
    </div>
  )
}

LiveScoreMinuteToMinute.label = 'Score en vivo minuto a minuto'

export default LiveScoreMinuteToMinute
