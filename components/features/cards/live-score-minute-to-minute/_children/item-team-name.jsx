import React from 'react'
import ItemTeamFlag from './item-team-flag'

const classes = {
  scoreDetails: 'score__team-details flex items-center',
  scoreName: 'score__team-name font-bold text-black primary-font text-center',
}
const ItemTeamName = ({ name, flag }) => {
  return (
    <div className={classes.scoreDetails}>
      <div className={classes.scoreName}>{name}</div>
      <ItemTeamFlag flag={flag} />
    </div>
  )
}

export default ItemTeamName
