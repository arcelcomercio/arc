import React from 'react'

import ItemTeamResult from './item-team-result'

const classes = {
  tournamentContent: 'tournament-result__card',
  tournamentCard:
    'tournament-result__card-content bg-white p-20 border-solid mb-20 lg:mb-0',
  tournamentCardTitle:
    'tournament-result__card-title font-bold text-primary-color mb-20',
}
const CardListResult = ({
  firstCard = true,
  leagueNme = '',
  listMatchResults = [],
}) => {
  return (
    <div className={classes.tournamentContent}>
      {firstCard ? (
        <div className={classes.tournamentCardTitle}>{leagueNme}</div>
      ) : (
        <div className={classes.tournamentCardTitle}>publicidad</div>
      )}
      <div className={classes.tournamentCard}>
        {listMatchResults.map(itemResult => (
          <ItemTeamResult {...itemResult} />
        ))}
      </div>
    </div>
  )
}

export default CardListResult
