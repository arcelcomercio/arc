import React from 'react'

import ItemTeamResult from './item-team-result'

const classes = {
  tournamentContent: 'tournament-result__content w-full',
  tournamentCard:
    'tournament-result__card bg-white p-20 border-solid mb-20 lg:mb-0 overflow-y-auto',
  tournamentCardLig:
    'tournament-result__card-league font-bold text-black mb-20',
  tournamentCardSponsor:
    'tournament-result__card-sponsor text-black mb-20 flex justify-between secondary-font',
  tournamentCardFigure:
    'tournament-result__card-patron text-black mb-20 flex justify-between secondary-font',
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
        <div className={classes.tournamentCardLig}>
          {leagueNameText !== '' ? leagueNameText : leagueNme}
        </div>
      ) : (
        <div className={classes.tournamentCardSponsor}>
          {sponsorName}

          {/* imagen para la publicdad */}
          <figure className={classes.tournamentCardFigure}>
            <img src="" alt="" />
          </figure>
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
