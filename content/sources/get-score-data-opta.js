const params = [
  {
    name: 'gameId',
    displayName: 'uid del juego',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const { gameId = '' } = key
  let urlApi = `https://api.performfeeds.com/soccerdata/matchstats/c6e9w0u6xbhr1g20ds11r0w41?_fmt=json&_lcl=es&_rt=b&fx=8i1z80gjthm86l814hdf1sh2i`
  if (gameId !== '') {
    urlApi = `https://api.performfeeds.com/soccerdata/matchstats/c6e9w0u6xbhr1g20ds11r0w41?_fmt=json&_lcl=es&_rt=b&fx=${key.gameId}`
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
  const contestants = []
  const goalList = []
  const liveData = {
    home,
    away,
  }
  contestant.forEach(
    ({ id = '', name = '', shortName = '', position = '' }) => {
      contestants.push({
        id,
        name,
        shortName,
        position,
      })
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
      goalList.push({
        contestantId,
        timeMinSec,
        type,
        homeScore,
        awayScore,
        scorerName,
      })
    }
  )
  return { contestants, liveData, goalList }
}

const source = {
  resolve,
  transform,
  // schemaName: SCHEMA_NAME,
  params,
  // ttl: 300,
}

export default source
