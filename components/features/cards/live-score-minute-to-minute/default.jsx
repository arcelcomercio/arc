import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFields from './_dependencies/custom-fields'

import TeanScore from './_children/team-score'
import GolListItem from './_children/gol-list'

import {
  getFootballGameId,
  buildTeamFootballOptaParams,
} from '../../../utilities/get-story-values'

import {
  FIXTURESTATE,
  PLAYING,
  PLAYED,
  POSTPONEDSTATE,
} from '../../../utilities/constants'

const classes = {
  liveScore: 'score w-full',
  liveWrapper:
    'score__wrapper pt-20 pb-30 flex justify-center items-center mx-auto overflow-hidden',
  liveEnd: 'score__end position-relative',
  liveEndText:
    'score__end-text rounded font-bold uppercase text-gray-200 flex justify-center items-center secondary-font',
  liveFixtureText:
    'score__status-fixture flex justify-center items-center secondary-font',
  liveTextStatus: 'score__status-message primary-font',
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
    // eslint-disable-next-line react/no-unused-state
    this.setState({ interval })
  }

  getDataScore = () => {
    const { globalContent } = this.props

    const gameId = getFootballGameId(globalContent)

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

  handleMovileScroll = () => {
    const scrollHeight = window.scrollY
    const score = document.querySelector('.score-sticky')
    const header =
      document.querySelector('.header-full') &&
      document.querySelector('.header-full').offsetHeight
        ? document.querySelector('.header-full').offsetHeight
        : 0

    const heightTotal = score.offsetHeight + header
    // const heightTotal = score.offsetHeight

    const socialHeader = document.querySelector('.story-header__header-social')
      ? document.querySelector('.story-header__header-social')
      : null
    if (scrollHeight > heightTotal) {
      score.classList.add('score-sticky__content')
      if (socialHeader) {
        socialHeader.classList.add('story-header__spacer')
      }
    } else {
      score.classList.remove('score-sticky__content')
      if (socialHeader) {
        socialHeader.classList.remove('story-header__spacer')
      }
    }
  }

  render() {
    const {
      teamParams: {
        homeTeamParams,
        awayTeamParams,
        matchTime,
        matchstatus,
        periodId,
      },
    } = this.state

    const { isAdmin } = this.props

    // console.log(Date().toString(), this.state)

    const localTeamParams = {
      homeTeam: true,
      matchstatus,
      ...homeTeamParams,
    }
    const visitingTeamParams = {
      homeTeam: false,
      matchstatus,
      ...awayTeamParams,
    }

    const golListItem = {
      homeTeamGolList: homeTeamParams.goalList,
      awayTeamGolList: awayTeamParams.goalList,
    }

    const golListItemValidation =
      golListItem.homeTeamGolList.length === 0 &&
      golListItem.awayTeamGolList.length === 0

    const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )
    if (isMobile && !isAdmin) {
      window.addEventListener('scroll', this.handleMovileScroll)
    }

    const textStatusValidation = [FIXTURESTATE, POSTPONEDSTATE].includes(
      matchstatus
    )

    return (
      <div className={classes.liveScore} id="scoreMinuteByMinute">
        <div className={classes.liveWrapper}>
          <TeanScore {...localTeamParams} />
          {matchstatus === PLAYED && (
            <div className={classes.liveEnd}>
              <span className={classes.liveEndText}>Fin</span>
            </div>
          )}

          {matchstatus === PLAYING && (
            <div className={classes.liveEnd}>
              <span className={classes.liveEndText}>{`${matchTime}''`}</span>
            </div>
          )}
          {matchstatus === FIXTURESTATE && (
            <div className={classes.liveEnd}>
              <span className={classes.liveFixtureText}>Previo al partido</span>
            </div>
          )}
          {matchstatus === POSTPONEDSTATE && (
            <div className={classes.liveEnd}>
              <span className={classes.liveFixtureText}>Previo al partido</span>
            </div>
          )}

          <TeanScore {...visitingTeamParams} />
        </div>
        {!textStatusValidation && (
          <span className={classes.liveTextStatus}>{periodId}</span>
        )}

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
