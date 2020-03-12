import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFields from './_dependencies/custom-fields'

import TeanScore from './_children/team-score'
import GolListItem from './_children/gol-list'

import {
  getFootballGameId,
  buildTeamFootballOptaParams,
} from '../../../utilities/get-story-values'

import { PLAYING, PLAYED } from '../../../utilities/constants'

const classes = {
  liveScore: 'score w-full',
  liveWrapper:
    'score__wrapper pt-20 pb-20 flex justify-center items-center mx-auto overflow-hidden',
  liveEnd: 'score__end position-relative',
  liveEndText:
    'score__end-text rounded font-bold uppercase text-gray-200 flex justify-center items-center secondary-font',
}

// const CDN = 'get-score-data-opta'

@Consumer
class LiveScoreMinuteToMinute extends Component {
  constructor(props) {
    super(props)

    const { globalContent: { opta_data: optaData } = {} } = this.props

    const teamParams = buildTeamFootballOptaParams(optaData)
    const {
      homeTeamParams = {},
      awayTeamParams = {},
      matchTime,
      matchstatus,
      periodId,
    } = teamParams

    this.state = {
      teamParams: {
        homeTeamParams,
        awayTeamParams,
        matchTime,
        matchstatus,
        periodId,
      },
    }
    // this.getDataScore()
    // this.setInsetvalForRequest = this.setInsetvalForRequest.bind(this)
  }

  componentDidMount() {
    this.setInsetvalForRequest()
  }

  setInsetvalForRequest = () => {
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

    const url = `https://cdna-resultadosopta.minoticia.pe/api/v2/match/?format=json&uuid=${gameId}`
    fetch(url)
      .then(data => data.json())
      .then(dataopta => {
        const teamParams = buildTeamFootballOptaParams(dataopta)

        const {
          homeTeamParams = {},
          awayTeamParams = {},
          matchTime,
          matchstatus,
          periodId,
        } = teamParams

        this.setState({
          teamParams: {
            homeTeamParams,
            awayTeamParams,
            matchTime,
            matchstatus,
            periodId,
          },
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const {
      teamParams: {
        homeTeamParams,
        awayTeamParams,
        matchTime,
        matchstatus,
        // periodId,
      },
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
          {matchstatus === PLAYED && (
            <div className={classes.liveEnd}>
              <span className={classes.liveEndText}>Fin</span>
            </div>
          )}

          {matchstatus === PLAYING && (
            <div className={classes.liveEnd}>
              <span className={classes.liveEndText}>{matchTime}</span>
            </div>
          )}

          {matchstatus !== PLAYING && matchstatus !== PLAYED && (
            <div className={classes.liveEnd}>
              <span className={classes.liveEndText}></span>
            </div>
          )}

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
