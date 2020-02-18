import React from 'react'
import { useContent } from 'fusion:content'
import TeanScore from './_children/team-score'

const classes = {
  liveScore: 'flex flex-row',
}

const LiveScoreMinuteToMinute = () => {
  const gameid = '8i1z80gjthm86l814hdf1sh2i'
  const data = useContent({
    source: 'get-score-data-opta',
    query: {
      gameid,
    },
  })

  console.log(data)
  const teanScoreParams1 = {
    localTeam: true,
  }
  const teanScoreParams2 = {
    localTeam: false,
  }
  return (
    <div className={classes.liveScore}>
      <TeanScore {...teanScoreParams1} />
      <span>Fin</span>
      <TeanScore {...teanScoreParams2} />
    </div>
  )
}

LiveScoreMinuteToMinute.label = 'Score en vivo minuto a minuto'

export default LiveScoreMinuteToMinute
