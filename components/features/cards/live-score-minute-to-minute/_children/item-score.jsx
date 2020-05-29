import React from 'react'
import { FIXTURESTATE, POSTPONEDSTATE } from '../../../../utilities/constants'

const classes = {
  scoreItem: 'score__team-number font-bold text-black primary-font',
}
const ItemScore = ({ scoreTeam = 0, matchstatus = '', homeTeam }) => {
  const textStatusValidation = [FIXTURESTATE, POSTPONEDSTATE].includes(
    matchstatus
  )
  return (
    <>
      {homeTeam ? (
        <div className={classes.scoreItem} id="hometeamScoreTextId">
          {!textStatusValidation ? scoreTeam : ''}
        </div>
      ) : (
        <div className={classes.scoreItem} id="awayteamScoreTextId">
          {!textStatusValidation ? scoreTeam : ''}
        </div>
      )}
    </>
  )
}

export default ItemScore
