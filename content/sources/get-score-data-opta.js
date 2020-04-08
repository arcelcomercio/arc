const params = [
  {
    name: 'gameId',
    displayName: 'uid del juego',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  let urlApi = ''

  if (key && key.gameId && key.gameId !== '') {
    urlApi = `http://devresultadosopta.elcomercio.pe/api/v2/match/?format=json&uuid=${key.gameId}`
  }
  return urlApi
}

const transform = (data = {}) => {
  const { items = [] } = data

  const {
    contestant_home: {
      id: idHome = '',
      name: nameHome = '',
      image: flagHome = '',
    } = {},
    contestant_away: {
      id: idAway = '',
      name: nameAway = '',
      image: flagAway = '',
    } = {},
    scores_total_home: scoresTotalHome = 0,
    scores_total_away: scoresTotalAway = 0,
    goals = [],
  } = items[0]

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
  return { homeTeamParams, awayTeamParams }
}

const source = {
  resolve,
  transform,
  // schemaName: SCHEMA_NAME,
  params,
  // ttl: 300,
}

export default source
