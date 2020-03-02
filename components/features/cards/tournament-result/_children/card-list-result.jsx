import React from 'react'

import ItemTeamResult from './item-team-result'

const classes = {
  tournamentCard: 'tournament-result__card',
  tournamentCardTitle:
    'tournament-result__card-title font-bold text-primary-color mb-20',
}
const CardListResult = ({
  firstCard = true,
  leagueNme = '',
  listMatchResults = [],
}) => {
  return (
    <div className={classes.tournamentCard}>
      {firstCard ? (
        <div className={classes.tournamentCardTitle}>{leagueNme}</div>
      ) : (
        <div>publicidad</div>
      )}
      {listMatchResults.map(itemResult => (
        <ItemTeamResult {...itemResult} />
      ))}
    </div>
  )
}

export default CardListResult
