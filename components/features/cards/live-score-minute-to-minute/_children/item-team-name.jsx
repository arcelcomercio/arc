import React from 'react'
import ItemTeamFlag from './item-team-flag'

const classes = {
  scoreName: 'score__team-name font-bold text-gray-300',
}
const ItemTeamName = ({ name, flag }) => {
  return (
    <div>
      <div className={classes.scoreName}>{name}</div>
      <ItemTeamFlag flag={flag} />
    </div>
  )
}

export default ItemTeamName
