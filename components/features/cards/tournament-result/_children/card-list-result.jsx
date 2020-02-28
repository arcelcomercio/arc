import React from 'react'

import ItemTeamResult from './item-team-result'

const CardListResult = ({
  firstCard = true,
  leagueNme = '',
  listMatchResults = [],
}) => {
  return (
    <div>
      {firstCard ? <div>{leagueNme}</div> : <div>publicidad</div>}
      {listMatchResults.map(itemResult => (
        <ItemTeamResult {...itemResult} />
      ))}
    </div>
  )
}

export default CardListResult
