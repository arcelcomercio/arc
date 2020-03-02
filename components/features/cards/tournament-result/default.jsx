import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import customFields from './_dependencies/custom-fields'

// children
import CardListResult from './_children/card-list-result'
import AddTournamentResult from './_children/add-tournament-result'

const classes = {
  tournamentResult: 'flex flex-row',
}

const CONTENT_SOURCE = 'get-score-results-from-the-league'

const TournamentResult = () => {
  const {
    customFields: { idLeague = '' },
  } = useFusionContext()

  const data = useContent({
    source: CONTENT_SOURCE,
    query: { idLeague },
  })

  const { leagueNme = '', listMatchResults1 = [], listMatchResults2 = [] } =
    data || {}

  const cardOneParams = {
    firstCard: true,
    leagueNme,
    listMatchResults: listMatchResults1,
  }

  const cardTwoParams = {
    firstCard: false,
    leagueNme,
    listMatchResults: listMatchResults2,
  }
  return (
    <div className={classes.tournamentResult}>
      <CardListResult {...cardOneParams} />
      <CardListResult {...cardTwoParams} />
      <AddTournamentResult />
    </div>
  )
}

TournamentResult.propTypes = {
  customFields,
}

TournamentResult.label = 'Resultado de torneo'
TournamentResult.static = true
export default TournamentResult
