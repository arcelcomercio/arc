import React from 'react'
import { FIXTURE, POSTPONED } from '../../../../utilities/constants'

const classes = {
  scoreItem: 'score__team-number font-bold text-black primary-font',
}
const ItemScore = ({ scoreTeam = 0, matchstatus = '' }) => {
  return (
    <div className={classes.scoreItem}>
      {matchstatus !== FIXTURE && matchstatus !== POSTPONED ? scoreTeam : ''}
    </div>
  )
}

export default ItemScore
