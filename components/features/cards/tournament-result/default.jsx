import React from 'react'
// import PropTypes from 'prop-types'
// import { useContent } from 'fusion:content'

// children
import CardListResult from './_children/card-list-result'
import AddTournamentResult from './_children/add-tournament-result'

const classes = {
  tournamentResult: 'flex flex-row',
}

const TournamentResult = () => {
  return (
    <div className={classes.tournamentResult}>
      <CardListResult />
      <CardListResult />
      <AddTournamentResult />
    </div>
  )
}

TournamentResult.label = 'Resultado de torneo'
export default TournamentResult
