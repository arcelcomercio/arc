import React from 'react'

import ItemTeamResult from './item-team-result'

const classes = {
  tournamentContent: 'tournament-result__content w-full',
  tournamentCard:
    'tournament-result__card bg-white p-20 border-solid mb-20 lg:mb-0 overflow-y-auto',
  tournamentCardLig:
    'tournament-result__card-league font-bold text-black mb-15 overflow-hidden',
  tournamentCardSponsor:
    'tournament-result__card-sponsor flex items-center justify-between mb-15',
  tournamentSponsorText:
    'tournament-result__card-text text-black secondary-font overflow-hidden',
  tournamentCardFigure: 'tournament-result__card-figure h-full',
  tournamentCardImg: 'tournament-result__card-img w-full h-full object-cover',
}
const CardListResult = ({
  firstCard = true,
  leagueName = '',
  leagueNameText = '',
  urlLeagueNameText = '',
  sponsorName = '',
  UrlImageSponsor = '',
  listMatchResults = [],
}) => {
  return (
    <div className={classes.tournamentContent}>
      {firstCard ? (
        <div className={classes.tournamentCardLig}>
          {leagueNameText === '' && urlLeagueNameText === '' && leagueName}
          {leagueNameText !== '' && urlLeagueNameText === '' && leagueNameText}
          {leagueNameText !== '' && urlLeagueNameText !== '' && (
            <a itemProp="url" href={urlLeagueNameText}>
              {leagueNameText}
            </a>
          )}
        </div>
      ) : (
        <div className={classes.tournamentCardSponsor}>
          <p itemProp="description" className={classes.tournamentSponsorText}>
            {sponsorName}
          </p>

          {/* imagen para la publicdad */}
          {UrlImageSponsor !== '' && (
            <figure className={classes.tournamentCardFigure}>
              <img
                src={UrlImageSponsor}
                alt=""
                className={classes.tournamentCardImg}
              />
            </figure>
          )}
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
