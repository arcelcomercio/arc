import React from 'react'

import { PLAYING, PLAYED } from '../../../../utilities/constants'

const classes = {
  itemTeamResult:
    'tournament-result__item flex items-center justify-between mb-20 w-full mx-auto',
  itemName: 'tournament-result__name secondary-font text-black',
  itemDetails: 'tournament-result__details flex items-center',
  itemFigure: 'tournament-result__figure',
  itemImg: 'tournament-result__img w-full h-full objet-cover',
  itemScore: 'tournament-result__score',
  itemScoreBox: 'tournament-result__score-box flex justify-evenly items-center',
  itemScoreText:
    'tournament-result__score-text font-bold secondary-font text-black',
  itemScoreEnVivo:
    'tournament-result__score-live text-center font-bold secondary-font uppercase',
  itemScoreMatch: 'tournament-result__match',
  itemScoreDate:
    'tournament-result__date text-center secondary-font text-black font-bold',
  itemScoreTime:
    'tournament-result__time text-center secondary-font text-black',
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
      <div className={classes.itemDetails}>
        <div className={classes.itemName}>{homeTeamShortName}</div>
        <div className={classes.itemFigure} />
        {/* <img src="" alt="{homeTeamFlag}" className={classes.itemImg} /> */}
      </div>
      <div className={classes.itemScore}>
        <div className={classes.itemScoreBox}>
          <p className={classes.itemScoreText}>{homeTeamScore}</p>
          <p className={classes.itemScoreText}>{awayTeamScore}</p>
        </div>
        {matchStatus === PLAYING && (
          <p className={classes.itemScoreEnVivo}>En vivo</p>
        )}
        {matchStatus === PLAYED && (
          <div className={classes.itemScoreMatch}>
            <p className={classes.itemScoreDate}>{matchDate}</p>
            <p className={classes.itemScoreTime}>{matchTime}</p>
          </div>
        )}
      </div>
      <div className={classes.itemDetails}>
        <div className={classes.itemFigure}>
          {/*   <img src="" alt=" {awayTeamFlag}" className={classes.itemImg} /> */}
        </div>
        <div className={classes.itemName}>{awayTeamShortName}</div>
      </div>
    </div>
  )
}

export default ItemTeamResult
