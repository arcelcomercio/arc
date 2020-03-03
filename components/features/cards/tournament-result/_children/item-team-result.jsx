import React from 'react'

import { PLAYING, PLAYED } from '../../../../utilities/constants'

const classes = {
  itemTeamResult:
    'tournament-result__item flex items-center justify-between mb-20 w-full',
  itemName: 'tournament-result__name secondary-font text-black',
  itemFigure: 'tournament-result__figure',
  itemImg: 'tournament-result__img w-full h-full objet-cover',
  itemScore: 'tournament-result__score',
  itemScoreBox: 'tournament-result__score-box flex justify-evenly items-center',
  itemScoreText:
    'tournament-result__score-text font-bold secondary-font text-black',
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
        {/* <img src="" alt="{homeTeamFlag}" className={classes.itemImg} /> */}
      </div>
      <div className={classes.itemScore}>
        <div className={classes.itemScoreBox}>
          <p className={classes.itemScoreText}>{homeTeamScore}</p>
          <p className={classes.itemScoreText}>{awayTeamScore}</p>
        </div>
        {matchStatus === PLAYING && <span>En vivo</span>}
        {matchStatus === PLAYED && (
          <div>
            <p>{matchDate}</p>
            <p>{matchTime}</p>
          </div>
        )}
      </div>
      <div className={classes.itemFigure}>
        {/*   <img src="" alt=" {awayTeamFlag}" className={classes.itemImg} /> */}
      </div>
      <div className={classes.itemName}>{awayTeamShortName}</div>
    </div>
  )
}

export default ItemTeamResult
