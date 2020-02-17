import React from 'react'

import TeanScore from './_children/tean-score'

const classes = {
  liveScore: '',
}

const LiveScoreMinuteToMinute = () => {
  return (
    <div className={classes.liveScore}>
      <TeanScore />
    </div>
  )
}

export default LiveScoreMinuteToMinute
