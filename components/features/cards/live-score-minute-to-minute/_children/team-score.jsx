import React from 'react'

import ItemScore from './item-score'
import ItemTeamFlag from './item-team-flag'
import ItemTeamName from './item-team-name'
import GolList from './gol-list'

const classes = {
  score: 'flex flex-row',
  gol: 'flex flex-row',
}

const LiveScoreMinuteToMinuteTeanScore = ({
  homeTeam = true,
  name = '',
  flag = '',
  scoreTeam = 0,
  goalList = [],
}) => {
  return (
    <div>
      <div className={classes.score}>
        {homeTeam ? (
          <ItemTeamName name={name} />
        ) : (
          <ItemScore scoreTeam={scoreTeam} />
        )}
        <ItemTeamFlag flag={flag} />
        {homeTeam ? (
          <ItemScore scoreTeam={scoreTeam} />
        ) : (
          <ItemTeamName name={name} />
        )}
      </div>
      <div className={classes.gol}>
        {homeTeam ? (
          <>
            <GolList homeTeam={homeTeam} goalList={goalList} />
            <span>icono</span>
          </>
        ) : (
          <>
            <span>icono</span>
            <GolList homeTeam={homeTeam} goalList={goalList} />
          </>
        )}
      </div>
    </div>
  )
}

export default LiveScoreMinuteToMinuteTeanScore
