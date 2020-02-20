import React from 'react'
// import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import TeanScore from './_children/team-score'

const classes = {
  liveScore: 'flex flex-row',
}

const LiveScoreMinuteToMinute = () => {
  const gameid = '8i1z80gjthm86l814hdf1sh2i'
  // const { globalContent = [] } = useFusionContext()

  const data = useContent({
    source: 'get-score-data-opta',
    query: {
      gameid,
    },
  })

  const { homeTeamParams = {}, awayTeamParams = {} } = data

  const localTeamParams = {
    homeTeam: true,
    ...homeTeamParams,
  }
  const visitingTeamParams = {
    homeTeam: false,
    ...awayTeamParams,
  }

  return (
    <div className={classes.liveScore}>
      <TeanScore {...localTeamParams} />
      <span>Fin</span>
      <TeanScore {...visitingTeamParams} />
    </div>
  )
}

LiveScoreMinuteToMinute.label = 'Score en vivo minuto a minuto'

export default LiveScoreMinuteToMinute
