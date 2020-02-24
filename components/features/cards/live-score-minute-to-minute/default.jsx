import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import TeanScore from './_children/team-score'
import GolListItem from './_children/gol-list'

import { getFootballGameId } from '../../../utilities/get-story-values'

const classes = {
  liveScore: 'score w-full p-20',
  liveWrapper: 'score__wrapper flex justify-center items-start mx-auto',
  liveEnd: 'score__end position-relative',
  liveEndText:
    'score__end-text rounded font-bold uppercase text-gray-200 flex justify-center items-center',
}

const CONTENT_SOURCE = 'get-score-data-opta'

@Consumer
class LiveScoreMinuteToMinute extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      teamParams: {},
    }
    this.getDataScore()
  }

  getDataScore = () => {
    const { globalContent } = this.props
    const gameid = getFootballGameId(globalContent)
    this.fetchContent({
      teamParams: {
        source: CONTENT_SOURCE,
        query: {
          gameid,
        },
      },
    })
  }

  render() {
    const {
      teamParams: { homeTeamParams = {}, awayTeamParams = {} } = {},
    } = this.state

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
          <div className={classes.liveEnd}>
            <span className={classes.liveEndText}>Fin</span>
          </div>
          <TeanScore {...visitingTeamParams} />
        </div>
        <GolListItem {...golListItem} />
      </div>
    )
  }
}

LiveScoreMinuteToMinute.label = 'Score en vivo minuto a minuto'

export default LiveScoreMinuteToMinute
