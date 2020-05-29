import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import customFields from './_dependencies/custom-fields'

// children
import CardListResult from './_children/card-list-result'
import AdsTournamentResult from './_children/ads-tournament-result'

const classes = {
  tournamentResult:
    'tournament-result flex justify-between flex-wrap pl-20 md:pl-0 pr-20 md:pr-0 col-3 mt-20 mb-20 w-full',
  tournamentBox:
    'tournament-result__box flex justify-between flex-wrap w-full lg:pt-30 items-end',
}

const CONTENT_SOURCE = 'get-score-results-from-the-league'

const TournamentResult = () => {
  const {
    customFields: {
      idLeague = '',
      leagueNameText = '',
      urlLeagueNameText = '',
      sponsorName = '',
      UrlImageSponsor = '',
      htmlAds = '',
    },
  } = useFusionContext()

  const data = useContent({
    source: CONTENT_SOURCE,
    query: { idLeague },
  })

  const { leagueName = '', listMatchResults1 = [], listMatchResults2 = [] } =
    data || {}

  const cardOneParams = {
    firstCard: true,
    leagueName,
    leagueNameText,
    urlLeagueNameText,
    listMatchResults: listMatchResults1,
  }

  const cardTwoParams = {
    firstCard: false,
    leagueName,
    sponsorName,
    UrlImageSponsor,
    listMatchResults: listMatchResults2,
  }

  const adsParams = {
    htmlAds,
  }
  return (
    <div className={classes.tournamentResult}>
      <div className={classes.tournamentBox}>
        <CardListResult {...cardOneParams} />
        <CardListResult {...cardTwoParams} />
      </div>
      <AdsTournamentResult {...adsParams} />
    </div>
  )
}

TournamentResult.propTypes = {
  customFields,
}

TournamentResult.label = 'Resultado de torneo'
// TournamentResult.static = true
export default TournamentResult
