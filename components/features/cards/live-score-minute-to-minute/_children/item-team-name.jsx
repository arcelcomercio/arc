import React from 'react'

const classes = {
  scoreName: 'score__team-name font-bold text-gray-300',
}
const ItemTeamName = ({ name }) => {
  return <div className={classes.scoreName}>{name}</div>
}

export default ItemTeamName
