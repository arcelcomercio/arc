import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import TeanScore from './_children/team-score'

import { getFootballGameId } from '../../../utilities/get-story-values'

const classes = {
  liveScore: 'flex flex-row',
}

const getDataScore = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { globalContent = [] } = useFusionContext()
  const gameid = getFootballGameId(globalContent)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useContent({
    source: 'get-score-data-opta',
    query: {
      gameid,
    },
  })
  return JSON.parse(JSON.stringify(data))
}

const LiveScoreMinuteToMinute = () => {
  // const { globalContent = [] } = useFusionContext()
  const [teamParams, setTeamParams] = useState(getDataScore())

  setInterval(() => {
    setTeamParams(getDataScore())
  }, 5000)

  const { homeTeamParams = {}, awayTeamParams = {} } = teamParams

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
