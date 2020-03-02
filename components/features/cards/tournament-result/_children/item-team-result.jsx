import React from 'react'

import { PLAYING, PLAYED } from '../../../../utilities/constants'

const classes = {
  itemTeamResult: 'tournament-result__item flex',
  itemName: 'tournament-result__name text-black',
  itemFigure: 'tournament-result__figure',
  itemImg: 'tournament-result__img w-full h-full objet-cover',
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
      <div className={classes.itemName}>{homeTeamShortName}</div>
      <div className={classes.itemFigure}>
        <img src="" alt="{homeTeamFlag}" className={classes.itemImg} />
      </div>
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
