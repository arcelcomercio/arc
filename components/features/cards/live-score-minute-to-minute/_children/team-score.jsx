import React from 'react'

import ItemScore from './item-score'
import ItemTeamFlag from './item-team-flag'
import ItemTeamName from './item-team-name'
import GolList from './gol-list'

const classes = {
  scoreBox: 'score__box flex flex-col items-center',
  scoreTeam: 'score__team flex items-center mb-15 pl-20 pr-20',
  gol: 'score__gol-wrapper flex',
  golImg: 'score__gol-img w-full h-full object-cover',
}

const LiveScoreMinuteToMinuteTeanScore = ({
  homeTeam = true,
  name = '',
  flag = '',
  scoreTeam = 0,
  goalList = [],
}) => {
  return (
    <div className={classes.scoreBox}>
      <div className={classes.scoreTeam}>
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

            <img src="" alt="" className={classes.golImg} />
          </>
        ) : (
          <>
            <img src="" alt="" className={classes.golImg} />

            <GolList homeTeam={homeTeam} goalList={goalList} />
          </>
        )}
      </div>
    </div>
  )
}

export default LiveScoreMinuteToMinuteTeanScore
