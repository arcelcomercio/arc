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
    goals = [],
  } = items[0]

  const homeTeamParams = {
    id: idHome,
    name: nameHome,
    shortName: nameHome,
    flag: flagHome,
    goalList: [],
  }

  const awayTeamParams = {
    id: idAway,
    name: nameAway,
    shortName: nameAway,
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
  // filtra los datos de homeTeam y awayTeam
  // contestant.forEach(
  //   ({ id = '', name = '', flag = '', shortName = '', position = '' }) => {
  //     if (position === 'home') {
  //       homeTeamId = id
  //       homeTeamParams = {
  //         id,
  //         name,
  //         shortName,
  //         position,
  //         flag,
  //         scoreTeam: home,
  //         goalList: [],
  //       }
  //     }

  //     if (position === 'away') {
  //       awayTeamId = id
  //       awayTeamParams = {
  //         id,
  //         name,
  //         shortName,
  //         position,
  //         flag,
  //         scoreTeam: away,
  //         goalList: [],
  //       }
  //     }
  //   }
  // )

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
