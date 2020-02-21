import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import TeanScore from './_children/team-score'
import GolListItem from './_children/gol-list'

import { getFootballGameId } from '../../../utilities/get-story-values'

const classes = {
  liveScore: 'score w-full p-20',
  liveWrapper:
    'score__wrapper flex justify-center items-start mx-auto position-relative',
  liveEnd:
    'score__end flex justify-center items-center rounded font-bold uppercase text-gray-200',
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
  return data
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

  const golListItem = {
    homeTeamGolList: homeTeamParams.goalList,
    awayTeamGolList: awayTeamParams.goalList,
  }

  return (
    <div className={classes.liveScore}>
      <div className={classes.liveWrapper}>
        <TeanScore {...localTeamParams} />
        <div className={classes.liveEnd}>Fin</div>
        <TeanScore {...visitingTeamParams} />
      </div>
      <GolListItem {...golListItem} />
    </div>
  )
}

LiveScoreMinuteToMinute.label = 'Score en vivo minuto a minuto'

export default LiveScoreMinuteToMinute
