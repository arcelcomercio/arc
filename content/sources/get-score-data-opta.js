const params = [
  {
    name: 'gameId',
    displayName: 'uid del juego',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  let urlApi = ''
  if (key.gameId !== '') {
    urlApi = `https://api.performfeeds.com/soccerdata/matchstats/c6e9w0u6xbhr1g20ds11r0w41?_fmt=json&_lcl=es&_rt=b&fx=${key.gameid}`
  }
  return urlApi
}

const transform = (data = {}) => {
  const {
    matchInfo: { contestant = [] } = {},
    liveData: {
      matchDetails: {
        scores: { total: { home = 0, away = 0 } = {} } = {},
      } = {},
      goal = [],
    } = {},
  } = data

  let homeTeamParams = {}
  let awayTeamParams = {}
  let homeTeamId = ''
  let awayTeamId = ''
  const goalListHomeTeam = []
  const goalListAwayTeam = []

  // filtra los datos de homeTeam y awayTeam
  contestant.forEach(
    ({ id = '', name = '', flag = '', shortName = '', position = '' }) => {
      if (position === 'home') {
        homeTeamId = id
        homeTeamParams = {
          id,
          name,
          shortName,
          position,
          flag,
          scoreTeam: home,
          goalList: [],
        }
      }

      if (position === 'away') {
        awayTeamId = id
        awayTeamParams = {
          id,
          name,
          shortName,
          position,
          flag,
          scoreTeam: away,
          goalList: [],
        }
      }
    }
  )

  goal.forEach(
    ({
      contestantId = '',
      timeMinSec = '',
      type = '',
      homeScore = 0,
      awayScore = 0,
      scorerName = '',
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
