import React from 'react'
import ItemTeamFlag from './item-team-flag'

const classes = {
  scoreDetails: 'score__team-details flex items-center',
  scoreName: 'score__team-name font-bold text-black primary-font text-center',
}
const ItemTeamName = ({ name, flag, homeTeam }) => {
  return (
    <div className={classes.scoreDetails}>
      {homeTeam ? (
        <div className={classes.scoreName} id="homeTeamNameId">
          {name}
        </div>
      ) : (
        <div className={classes.scoreName} id="awayTeamNameId">
          {name}
        </div>
      )}
      <ItemTeamFlag flag={flag} />
    </div>
  )
}

export default ItemTeamName
