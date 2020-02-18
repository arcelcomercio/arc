import React from 'react'

import ItemScore from './item-score'
import ItemTeamFlag from './item-team-flag'
import ItemTeamName from './item-team-name'
import GolList from './gol-list'

const classes = {
  score: 'flex flex-row',
  gol: 'flex flex-row',
}

const LiveScoreMinuteToMinuteTeanScore = ({ firstTeamName = true }) => {
  return (
    <div>
      <div className={classes.score}>
        {firstTeamName ? <ItemTeamName /> : <ItemScore />}
        <ItemTeamFlag />
        {firstTeamName ? <ItemScore /> : <ItemTeamName />}
      </div>
      <div className={classes.gol}>
        {firstTeamName ? (
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
