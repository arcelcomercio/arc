import { VIDEO, ELEMENT_YOUTUBE_ID, IMAGE, UUID_MATCH } from './constants'

export const getTitle = data => {
  const { headlines: { basic = '' } = {} } = data || {}
  return basic
}

export const getVideo = data => {
  const result = { type: '', payload: '' }

  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO].embed_html) ||
    ''
  if (result.payload !== '') {
    result.type = VIDEO
  }
  return result
}

export const getVideoYoutube = data => {
  const result = { type: '', payload: '' }
  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[ELEMENT_YOUTUBE_ID] &&
      data.promo_items[ELEMENT_YOUTUBE_ID].content) ||
    ''
  if (result.payload !== '') {
    result.type = ELEMENT_YOUTUBE_ID
  }
  return result
}

export const getImage = (data, ImageSize) => {
  const result = { type: IMAGE, payload: '' }
  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[IMAGE] &&
      data.promo_items[IMAGE].resized_urls &&
      data.promo_items[IMAGE].resized_urls[ImageSize]) ||
    ''

  return result
}

export const getVideoImage = (data, ImageSize) => {
  const result = { type: '', payload: '' }

  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO].promo_items &&
      data.promo_items[VIDEO].promo_items[IMAGE] &&
      data.promo_items[VIDEO].promo_items[IMAGE].resized_urls &&
      data.promo_items[VIDEO].promo_items[IMAGE].resized_urls[ImageSize]) ||
    ''
  if (result.payload !== '') {
    result.type = VIDEO
  }
  return result
}

export const getVideoTime = data => {
  let result = 0

  result =
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO].duration) ||
    0
  return result
}

export const getFootballGameId = data => {
  let result = ''

  result =
    (data &&
      data.promo_items &&
      data.promo_items[UUID_MATCH] &&
      data.promo_items[UUID_MATCH].content) ||
    ''
  return result
}

export const buildTeamFootballOptaParams = (data = {}) => {
  const { items = [] } = data
  const values = items[0] || {}
  const {
    contestant_home: contestantHome = {},
    contestant_away: contestantAway = {},
    match_time: matchTime,
    matchstatus = '',
    period_id: periodId = '',
    scores_total_home: scoresTotalHome = 0,
    scores_total_away: scoresTotalAway = 0,
    goals = [],
  } = values

  const {
    id: idHome = '',
    name: nameHome = '',
    image: flagHome = '',
  } = contestantHome

  const {
    id: idAway = '',
    name: nameAway = '',
    image: flagAway = '',
  } = contestantAway

  const homeTeamParams = {
    id: idHome,
    name: nameHome,
    shortName: nameHome,
    scoreTeam: scoresTotalHome,
    flag: flagHome,
    goalList: [],
  }

  const awayTeamParams = {
    id: idAway,
    name: nameAway,
    shortName: nameAway,
    scoreTeam: scoresTotalAway,
    flag: flagAway,
    goalList: [],
  }

  const homeTeamId = idHome
  const awayTeamId = idAway
  const goalListHomeTeam = []
  const goalListAwayTeam = []

  goals.forEach(
    ({
      contestant: { id: contestantId = 0 } = {},
      time_min_sec: timeMinSec = '',
      type = '',
      home_score: homeScore = 0,
      away_score: awayScore = 0,
      scorer_name: scorerName = '',
    }) => {
      if (contestantId === homeTeamId) {
        goalListHomeTeam.push({
          contestantId,
          timeMinSec,
          type,
          homeScore,
          awayScore,
          scorerName,
        })
      }

      if (contestantId === awayTeamId) {
        goalListAwayTeam.push({
          contestantId,
          timeMinSec,
          type,
          homeScore,
          awayScore,
          scorerName,
        })
      }
    }
  )

  homeTeamParams.goalList = goalListHomeTeam
  awayTeamParams.goalList = goalListAwayTeam
  return {
    homeTeamParams,
    awayTeamParams,
    matchTime: matchTime || 0,
    matchstatus,
    periodId,
  }
}

export const formatGoalList = (goalList = []) => {
  // agrupa los goles de los jugadores
  const footballPlayers = []
  const result = []
  goalList.forEach(footballPlayer => {
    const { scorerName } = footballPlayer
    if (!footballPlayers.includes(scorerName)) {
      footballPlayers.push(scorerName)
      const goalMinute = []

      for (let j = 0; j < goalList.length; j++) {
        if (goalList[j].scorerName === footballPlayer.scorerName) {
          const type = goalList[j].type !== 'G' ? goalList[j].type : ''
          goalMinute.push(`${type} ${goalList[j].timeMinSec.split(':')[0]}`)
        }
      }

      const listText = goalMinute.map(text => `${text}'`).join(',')
      result.push({
        scorerName,
        timeMinSec: listText,
      })
    }
  })
  return result
}
