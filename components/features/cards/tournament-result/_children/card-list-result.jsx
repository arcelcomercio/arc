import React from 'react'

import ItemTeamResult from './item-team-result'

const classes = {
  tournamentContent: 'tournament-result__content w-full',
  tournamentCard:
    'tournament-result__card bg-white p-20 border-solid mb-20 lg:mb-0 overflow-y-auto',
  tournamentCardLig:
    'tournament-result__card-league font-bold text-black mb-15',
  tournamentCardSponsor:
    'tournament-result__card-sponsor flex items-center justify-between mb-15',
  tournamentSponsorText:
    'tournament-result__card-text text-black secondary-font',
  tournamentCardFigure: 'tournament-result__card-figure h-full',
  tournamentCardImg: 'tournament-result__card-img w-full h-full object-cover',
}
const CardListResult = ({
  firstCard = true,
  leagueName = '',
  leagueNameText,
  sponsorName,
  listMatchResults = [],
}) => {
  return (
    <div className={classes.tournamentContent}>
      {firstCard ? (
        <div className={classes.tournamentCardLig}>
          {leagueNameText !== '' ? leagueNameText : leagueName}
        </div>
      ) : (
        <div className={classes.tournamentCardSponsor}>
          <p className={classes.tournamentSponsorText}>{sponsorName}</p>

          {/* imagen para la publicdad */}
          <figure className={classes.tournamentCardFigure}>
            <img src="" alt="" className={classes.tournamentCardImg} />
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
