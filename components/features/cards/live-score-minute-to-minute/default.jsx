import React from 'react'
import { useFusionContext } from 'fusion:context'
// import Consumer from 'fusion:consumer'
import customFields from './_dependencies/custom-fields'

import TeanScore from './_children/team-score'
import GolListItem from './_children/gol-list'

import { buildTeamFootballOptaParams } from '../../../utilities/get-story-values'

const classes = {
  liveScore: 'score w-full',
  liveWrapper:
    'score__wrapper pt-20 pb-20 flex justify-center items-center mx-auto overflow-hidden',
  liveEnd: 'score__end position-relative',
  liveEndText:
    'score__end-text rounded font-bold uppercase text-gray-200 flex justify-center items-center secondary-font',
}

const LiveScoreMinuteToMinute = () => {
  const { globalContent: { opta_data: optaData } = {} } = useFusionContext()

  const teamParams = buildTeamFootballOptaParams(optaData)
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

  const golListItemValidation =
    golListItem.homeTeamGolList.length === 0 &&
    golListItem.awayTeamGolList.length === 0

  return (
    <div className={classes.liveScore}>
      <div className={classes.liveWrapper}>
        <TeanScore {...localTeamParams} />
        <div className={classes.liveEnd}>
          <span className={classes.liveEndText}>Fin</span>
        </div>
        <TeanScore {...visitingTeamParams} />
      </div>
      {!golListItemValidation ? <GolListItem {...golListItem} /> : null}
    </div>
  )
}

LiveScoreMinuteToMinute.label = 'Score en vivo minuto a minuto'

LiveScoreMinuteToMinute.propTypes = {
  customFields,
}

LiveScoreMinuteToMinute.static = true
export default LiveScoreMinuteToMinute
