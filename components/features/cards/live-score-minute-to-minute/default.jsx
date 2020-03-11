import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFields from './_dependencies/custom-fields'

import TeanScore from './_children/team-score'
import GolListItem from './_children/gol-list'

import { getFootballGameId } from '../../../utilities/get-story-values'

const classes = {
  liveScore: 'score w-full',
  liveWrapper:
    'score__wrapper pt-20 pb-20 flex justify-center items-center mx-auto overflow-hidden',
  liveEnd: 'score__end position-relative',
  liveEndText:
    'score__end-text rounded font-bold uppercase text-gray-200 flex justify-center items-center secondary-font',
}

const CONTENT_SOURCE = 'get-score-data-opta'

@Consumer
class LiveScoreMinuteToMinute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamParams: {},
    }
    this.getDataScore()
  }

  componentDidMount() {
    const {
      customFields: { intervalTime = 1 },
    } = this.props

    const intervalTimeMilliseconds = intervalTime * 60000

    const interval = setInterval(
      () => this.getDataScore(),
      intervalTimeMilliseconds
    )
    this.setState({ interval })
  }

  getDataScore = () => {
    const { globalContent } = this.props

    // id temporal
    const gameId =
      getFootballGameId(globalContent) || '2fotq7p7kpwzjsr8m7bsk29uy'
    this.fetchContent({
      teamParams: {
        source: CONTENT_SOURCE,
        query: {
          gameId,
        },
      },
    })
  }

  render() {
    const {
      teamParams: { homeTeamParams = {}, awayTeamParams = {} } = {},
    } = this.state

    console.log(Date().toString(), this.state)

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
}

LiveScoreMinuteToMinute.label = 'Score en vivo minuto a minuto'

LiveScoreMinuteToMinute.propTypes = {
  customFields,
}

// LiveScoreMinuteToMinute.static = true
export default LiveScoreMinuteToMinute
