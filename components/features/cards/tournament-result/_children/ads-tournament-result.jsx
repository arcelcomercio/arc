import React from 'react'

const classes = {
  tournamentAdd: 'tournament-result__add mx-auto lg:ml-0 lg:mr-0',
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
