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
  leagueNameText,
  sponsorName,
  listMatchResults = [],
}) => {
  return (
    <div className={classes.tournamentContent}>
      {firstCard ? (
        <div className={classes.tournamentCardTitle}>
          {leagueNameText !== '' ? leagueNameText : leagueNme}
        </div>
      ) : (
        <div className={classes.tournamentCardTitle}>
          {sponsorName}
          <div>
            {/* imagen para la publicdad */}
            <figure>
              <img src="" alt="" />
            </figure>
          </div>
        </div>
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
