import * as React from 'react'
import { FC } from 'types/features'

export interface ScoresApiResponse {
  losPartidos: Score[]
  mensaje: string
}

export interface Score {
  id: string
  grupo: string
  equipo1: string
  equipo1Bandera: string
  equipo1Goles: string
  equipo2: string
  equipo2Bandera: string
  equipo2Goles: string
  estadio: string
  ciudad: string
  fecha: string
  hora: string
  fechaHora: string
  activo: boolean
  estado: number
  puntos: number
  fase: string
  jornada: number
  show: boolean
  exists_teams: number
  timestamp: number
  resultadoFinal: string
  ec_equipo1_porcentaje: string
  ec_equipo2_porcentaje: string
  ec_empate_porcentaje: string
  ec_porcentaje_coincidencia: string
  ec_fondo_destacados_desktop: string
  ec_fondo_destacados_movil: string
}

const PollaScoreList: FC = () => {
  const [scores, setScores] = React.useState<Score[]>()
  const [currentSchedule, setCurrentSchedule] = React.useState('1')

  React.useEffect(() => {
    fetch(
      'https://pmdu68gci6.execute-api.us-east-1.amazonaws.com/prod/depor/usuario/6f3015f2281091770eb7b700b87b547883b03bd916e5b705cc7dd70ae63ba89c/partidos'
    )
      .then((res) => res.json())
      .then((res: ScoresApiResponse) => {
        setScores(res.losPartidos)
        console.log(res)
      })
  }, [])

  // const groupByJornada = scores?.reduce(
  //   (
  //     r: {
  //       [key in string]: Score[]
  //     },
  //     a: Score
  //   ) => {
  //     const auxR = r
  //     auxR[a.jornada] = [...(r[a.jornada] || []), a]
  //     return auxR
  //   },
  //   {}
  // )

  const listOfSchedules = [...new Set(scores?.map((item) => item.jornada))]

  const scoresBySchedule = scores?.filter(
    (score) => score.jornada.toString() === currentSchedule
  )

  const scoresByGroup = scoresBySchedule?.reduce(
    (
      r: {
        [key in string]: Score[]
      },
      a: Score
    ) => {
      const auxR = r
      auxR[a.grupo] = [...(r[a.grupo] || []), a]
      return auxR
    },
    {}
  )

  console.log(scoresByGroup)

  return (
    <>
      <div className="polla-score__current">
        <span className="polla-score__current-text">Tienes:</span>
        <div className="polla-score__current-wrap">
          <div className="polla-score__current-cont">
            <div className="polla-score__current-top">
              <span className="left">05</span>
              <span className="right">Puntos</span>
            </div>
            <div className="polla-score__current-bot">
              <span className="left">Ranking:</span>
              <span className="right">128</span>
            </div>
          </div>
        </div>
      </div>

      <div className="polla-score__nav">
        <button
          type="button"
          className="polla-score__nav-btn"
          onClick={() => {
            const currentIndex = listOfSchedules.findIndex(
              (sc) => sc.toString() === currentSchedule
            )
            if (currentIndex !== 0) {
              setCurrentSchedule(listOfSchedules[currentIndex - 1].toString())
            }
          }}>
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 1.07273L5.9323 0L0 6L5.9383 12L7 10.9273L2.12339 6L7 1.07273V1.07273Z"
              fill="#FFFFFF"
            />
          </svg>
        </button>
        <div className="polla-score__nav-sel-cont">
          <div className="polla-score__nav-sel-p">
            <span className="bold">Jornada {currentSchedule}</span>
            <span>11 - 13 Jun.</span>
            <svg
              width="13"
              height="7"
              viewBox="0 0 13 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L6.5 7L13 0" fill="#DC532E" />
            </svg>
          </div>
          <select
            value={currentSchedule}
            className="polla-score__nav-sel"
            onChange={(e) => {
              setCurrentSchedule(e.target.value)
            }}>
            {listOfSchedules.map((jor) => (
              <option key={jor} value={jor}>
                {jor} (11 - 13 Jun.)
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="polla-score__nav-btn"
          onClick={() => {
            const currentIndex = listOfSchedules.findIndex(
              (sc) => sc.toString() === currentSchedule
            )
            if (currentIndex !== listOfSchedules.length - 1) {
              setCurrentSchedule(listOfSchedules[currentIndex + 1].toString())
            }
          }}>
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.752442 11.7774L1.82014 12.8501L7.75244 6.8501L1.81414 0.850097L0.752443 1.92282L5.62905 6.8501L0.752442 11.7774V11.7774Z"
              fill="#FFFFFF"
            />
          </svg>
        </button>
      </div>

      {Object.keys(scoresByGroup || {}).map((key) => (
        <div className="polla-score__group-cont" key={key}>
          <div className="polla-score__group-title">
            <div className="polla-score__group-name">{key}</div>
            <div className="polla-score__group-aus">Auspicia:</div>
            <img
              className="polla-score__group-brand"
              src="https://images.virtualsoft.tech/site/doradobet/logo-horizontalv2.png"
              alt="Brand"
            />
          </div>
          {scoresByGroup?.[key].map((score) => {
            const scoreArray = score.resultadoFinal.split('-')
            return (
              <React.Fragment key={score.id}>
                <div className="polla-score__group-sted">
                  <div className="polla-score__group-stedn">
                    Estadio <b>{score.estadio}</b>
                  </div>
                  <div className="polla-score__group-stedc">
                    Buenos Aires - Argentina (No hay)
                  </div>
                  <div className="polla-score__group-stedd">
                    {score.fechaHora}
                  </div>
                </div>
                <form
                  className="polla-score__form"
                  onSubmit={(e) => {
                    const form = e.target as HTMLFormElement
                    const formData = new FormData(form)
                    const team1 = formData.get('team1')
                    const team2 = formData.get('team2')
                    console.log(team1, team2, score)
                    e.preventDefault()
                  }}
                  onFocus={(e) => {
                    // const form = e.target
                    // form.classList.add('.focus')
                  }}>
                  <div className="polla-score__form-top">
                    <div className="polla-score__country-cont">
                      <img
                        className="polla-score__country-img"
                        src="https://polla-resources.surge.sh/dist/depor/images-polla/paises/per.svg"
                        alt="País"
                      />
                      <div className="polla-score__country-text">
                        {score.equipo1}
                      </div>
                    </div>
                    <input
                      type="number"
                      className="polla-score__form-input"
                      name="team1"
                      defaultValue={scoreArray[0]}
                    />
                    <div className="polla-score__form-dots">
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="#333333" />
                      </svg>
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="#333333" />
                      </svg>
                    </div>
                    <input
                      type="number"
                      className="polla-score__form-input"
                      name="team2"
                      defaultValue={scoreArray[1]}
                    />
                    <div className="polla-score__country-cont">
                      <img
                        className="polla-score__country-img"
                        src="https://polla-resources.surge.sh/dist/depor/images-polla/paises/per.svg"
                        alt="País"
                      />
                      <div className="polla-score__country-text">
                        {score.equipo2}
                      </div>
                    </div>
                  </div>
                  <button className="polla-score__form-btn" type="submit">
                    Juega
                  </button>
                </form>
              </React.Fragment>
            )
          })}
        </div>
      ))}
    </>
  )
}

PollaScoreList.label = 'La Polla - Listado de Scores'

export default PollaScoreList
