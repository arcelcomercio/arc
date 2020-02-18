import React from 'react'

import ItemScore from './item-score'
import ItemTeamFlag from './item-team-flag'
import ItemTeamName from './item-team-name'
import GolList from './gol-list'

const classes = {
  score: 'flex flex-row',
  gol: 'flex flex-row',
}

const LiveScoreMinuteToMinuteTeanScore = ({ localTeam = true }) => {
  return (
    <div>
      <div className={classes.score}>
        {localTeam ? <ItemTeamName /> : <ItemScore />}
        <ItemTeamFlag />
        {localTeam ? <ItemScore /> : <ItemTeamName />}
      </div>
      <div className={classes.gol}>
        {localTeam ? (
          <>
            <GolList />
            <span>icono</span>
          </>
        ) : (
          <>
            <span>icono</span>
            <GolList />
          </>
        )}
      </div>
    </div>
  )
}

export default LiveScoreMinuteToMinuteTeanScore
