const params = [
  {
    name: 'idLeague',
    displayName: 'Id de la liga',
    type: 'text',
  },
]
const resolve = (key = {}) => {
  let urlResult = ''
  if (key && key.idLeague && key.idLeague !== '') {
    urlResult = `http://devresultadosopta.elcomercio.pe/api/v2/match/?format=json&uuid=e3tz6ya6vdcivtg04yvw3kpre`
  }

  return urlResult
}

const transform = () => {
  const dammyData = {
    leagueNme: 'Champions',
    listMatchResults1: [
      {
        homeTeamShortName: 'Napoli',
        awayTeamShortName: 'Barcelona',
        homeTeamScore: 1,
        awayTeamScore: 1,
        homeTeamFlag: 'Bandera Home Team',
        awayTeamFlag: 'Bandera Away Team',
        matchTime: '6:00 am',
        matchDate: '11/04',
        matchStatus: 'Playing',
      },
      {
        homeTeamShortName: 'Napoli',
        awayTeamShortName: 'Barcelona',
        homeTeamScore: 1,
        awayTeamScore: 1,
        homeTeamFlag: 'Bandera Home Team',
        awayTeamFlag: 'Bandera Away Team',
        matchTime: '6:00 am',
        matchDate: '11/04',
        matchStatus: 'Fixture',
      },
      {
        homeTeamShortName: 'Napoli',
        awayTeamShortName: 'Barcelona',
        homeTeamScore: 1,
        awayTeamScore: 1,
        homeTeamFlag: 'Bandera Home Team',
        awayTeamFlag: 'Bandera Away Team',
        matchTime: '6:00 am',
        matchDate: '11/04',
        matchStatus: 'Played',
      },
    ],
    listMatchResults2: [
      {
        homeTeamShortName: 'Napoli',
        awayTeamShortName: 'Barcelona',
        homeTeamScore: 1,
        awayTeamScore: 1,
        homeTeamFlag: 'asd/asd',
        awayTeamFlag: 'asd/asd',
        matchTime: '6:00 am',
        matchDate: '11/04',
        matchStatus: 'Played',
      },
      {
        homeTeamShortName: 'Napoli',
        awayTeamShortName: 'Barcelona',
        homeTeamScore: 1,
        awayTeamScore: 1,
        homeTeamFlag: 'asd/asd',
        awayTeamFlag: 'asd/asd',
        matchTime: '6:00 am',
        matchDate: '11/04',
        matchStatus: '',
      },
      {
        homeTeamShortName: 'Napoli',
        awayTeamShortName: 'Barcelona',
        homeTeamScore: 1,
        awayTeamScore: 1,
        homeTeamFlag: 'asd/asd',
        awayTeamFlag: 'asd/asd',
        matchTime: '6:00 am',
        matchDate: '11/04',
        matchStatus: 'Playing',
      },
    ],
  }
  return dammyData
}

export default {
  resolve,
  transform,
  params,
}
