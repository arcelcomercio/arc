import React from 'react'
import { FIXTURESTATE, POSTPONEDSTATE } from '../../../../utilities/constants'

const classes = {
  scoreItem: 'score__team-number font-bold text-black primary-font',
}
const ItemScore = ({ scoreTeam = 0, matchstatus = '' }) => {
  const textStatusValidation = [FIXTURESTATE, POSTPONEDSTATE].includes(
    matchstatus
  )
  return (
    <div className={classes.scoreItem}>
      {!textStatusValidation ? scoreTeam : ''}
    </div>
  )
}

export default ItemScore
