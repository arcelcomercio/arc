import React from 'react'

import { PLAYING, PLAYED } from '../../../../utilities/constants'

const classes = {
  itemTeamResult: 'flex flex-row',
}

const ItemTeamResult = ({
  homeTeamShortName = '',
  awayTeamShortName = '',
  homeTeamScore = 0,
  awayTeamScore = 0,
  homeTeamFlag = '',
  awayTeamFlag = '',
  matchTime = '',
  matchDate = '',
  matchStatus = '',
}) => {
  return (
    <div className={classes.itemTeamResult}>
      <div>{homeTeamShortName}</div>
      <div>{homeTeamFlag}</div>
      <div>
        <div>
          <span>{homeTeamScore}</span>
          <span>{awayTeamScore}</span>
        </div>
        {matchStatus === PLAYING && <span>En vivo</span>}
        {matchStatus === PLAYED && (
          <div>
            <span>{matchDate}</span>
            <span>{matchTime}</span>
          </div>
        )}
      </div>
      <div>{awayTeamFlag}</div>
      <div>{awayTeamShortName}</div>
    </div>
  )
}

export default ItemTeamResult
