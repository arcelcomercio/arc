import React from 'react'

const classes = {
  tournamentAdd: 'tournament-result__add',
}
const AdsTournamentResult = ({ htmlAds }) => {
  return (
    <div
      className={classes.tournamentAdd}
      dangerouslySetInnerHTML={{ __html: htmlAds }}
    />
  )
}

export default AdsTournamentResult
