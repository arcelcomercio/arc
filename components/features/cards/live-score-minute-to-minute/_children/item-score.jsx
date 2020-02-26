import React from 'react'

const classes = {
  scoreItem: 'score__team-number font-bold text-black primary-font',
}
const ItemScore = ({ scoreTeam = 0 }) => {
  return <div className={classes.scoreItem}>{scoreTeam}</div>
}

export default ItemScore
