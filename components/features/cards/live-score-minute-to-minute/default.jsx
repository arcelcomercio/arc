import React from 'react'
// import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import TeanScore from './_children/team-score'

const classes = {
  liveScore: 'score w-full p-20',
  liveWrapper: 'score__wrapper flex justify-center items-start mx-auto',
  liveEnd: 'score__end flex justify-center items-center position-relative',
  liveEndText: 'score__end-text rounded font-bold uppercase text-gray-200',
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
      <div className={classes.liveWrapper}>
        <TeanScore {...localTeamParams} />
        <div className={classes.liveEnd}>
          <span className={classes.liveEndText}>Fin</span>
        </div>
        <TeanScore {...visitingTeamParams} />
      </div>
    </div>
  )
}

LiveScoreMinuteToMinute.label = 'Score en vivo minuto a minuto'

export default LiveScoreMinuteToMinute
