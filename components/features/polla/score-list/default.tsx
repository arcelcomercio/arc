import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { slugify } from '../../../utilities/parse/slugify'
import {
  Profile,
  Score,
  ScoresApiResponse,
  User,
  UserData,
} from './_utils/types'

const idconcurso = 1

const countriesAssetsPath =
  'https://cdna.depor.com/resources/dist/depor/images-polla/paises/'

const addUserToNavbar = (localProfile: Profile | null | undefined) => {
  const btn = document.getElementById('signwall-nav-btn')
  const btnText = document.getElementById('signwall-nav-text')
  const { firstName = '', lastName = '', uuid = '' } = localProfile || {}
  if (btn) {
    btn.addEventListener('click', () => {
      if (uuid) {
        window.location.href = '/mi-perfil/?outputType=signwall'
      } else {
        window.location.href =
          '/signwall/?outputType=signwall&signwallOrganic=1'
      }
    })
    if (uuid && btnText) {
      btnText.innerText = `Hola, ${firstName || lastName || 'Usuario'}`
      btn.classList.add('signed')
    }
  }
}

interface Props {
  customFields?: {
    datesPerJornada?: string
    stadiumLocationPerName?: string
    excludedIds?: string
  }
}

const PollaScoreList: FC<Props> = (props) => {
  const [scores, setScores] = React.useState<Score[]>()
  const [currentSchedule, setCurrentSchedule] = React.useState('1')
  const [user, setUser] = React.useState<UserData>()
  const [userUuid, setUserUuid] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)

  const {
    customFields: { datesPerJornada, stadiumLocationPerName, excludedIds } = {},
  } = props

  const parsedDatesPerJornada = JSON.parse(datesPerJornada || '{}')
  const parsedStadiumLocationPerName = JSON.parse(
    stadiumLocationPerName || '{}'
  )

  const registerUser = async (localProfile: Profile) => {
    const {
      uuid,
      firstName,
      lastName,
      attributes,
      email,
      birthDay,
      birthMonth,
      birthYear,
      gender,
      contacts,
    } = localProfile || {}

    const documentNumber = attributes?.find(
      (el) => el.name === 'documentNumber'
    )?.value
    const documentType = attributes?.find((el) => el.name === 'documentType')
      ?.value
    const civilStatus = attributes.find((el) => el.name === 'civilStatus')
      ?.value
    const district = attributes.find((el) => el.name === 'district')?.value
    const department = attributes.find((el) => el.name === 'department')?.value
    const province = attributes.find((el) => el.name === 'province')?.value
    const newUserFetch = await fetch(
      `https://4dtmic7lj2.execute-api.us-east-1.amazonaws.com/dev/${idconcurso}/usuario/${uuid}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: firstName || '',
          apellidos: lastName || '',
          tipo_documento: documentType || '',
          dni: documentNumber || '',
          email,
          fecha_nacimiento: birthDay
            ? `${birthDay}-${birthMonth}-${birthYear}`
            : '',
          genero: gender || '',
          estado_civil: civilStatus || '',
          ocupacion: '',
          nivel_academico: '',
          telefono: contacts?.[0]?.phone || '',
          distrito: district || '',
          departamento: department || '',
          provincia: province || '',
          direccion: '',
          terminos: '1',
        }),
      }
    )
    return newUserFetch.json()
  }

  const getUserData = async (uuid: string): Promise<User> => {
    const userDataFetch = await fetch(
      `https://4dtmic7lj2.execute-api.us-east-1.amazonaws.com/dev/${idconcurso}/usuario/${uuid}/ultimopartido`
    )
    return userDataFetch.json()
  }

  const getData = async () => {
    const rawProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    let localProfile: Profile | null | undefined = null
    if (rawProfile) {
      localProfile = JSON.parse(rawProfile)
    }
    if (localProfile?.uuid) {
      addUserToNavbar(localProfile)
      try {
        const { uuid } = localProfile
        setUserUuid(uuid)
        const userData = await getUserData(uuid)

        if (userData.usuario?.nombre) {
          setUser(userData.usuario)
        } else {
          await registerUser(localProfile)
          const newUserData: User = await getUserData(uuid)
          setUser(newUserData.usuario)
        }

        const scoreFetch = await fetch(
          `https://4dtmic7lj2.execute-api.us-east-1.amazonaws.com/dev/${idconcurso}/usuario/${uuid}/partidos`
        )
        const scoreRes: ScoresApiResponse = await scoreFetch.json()
        setScores(
          scoreRes?.losPartidos?.map((score) => {
            if (new RegExp(`\\b${score.id}\\b`).test(excludedIds || '')) {
              return { ...score, estado: score.estado > 2 ? score.estado : 2 }
            }
            return score
          })
        )
        setIsLoading(false)
      } catch (e) {
        console.error(e)
      }
    } else {
      document.location.href =
        '/signwall/?outputType=signwall&signwallOrganic=1'
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

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

  const dateTimeFormater = new Intl.DateTimeFormat('es-419-u-hc-h12', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Lima',
    hour12: true,
  })

  return (
    <>
      {isLoading && (
        <div className="polla-score__spinner" style={{ fontSize: '5px' }} />
      )}

      {!isLoading && (
        <>
          <div className="polla-score__current">
            <span className="polla-score__current-text">Tienes:</span>
            <div className="polla-score__current-wrap">
              <div className="polla-score__current-cont">
                <div className="polla-score__current-top">
                  <span className="left">{user?.puntaje}</span>
                  <span className="right">Puntos</span>
                </div>
                <div className="polla-score__current-bot">
                  <span className="left">Ranking:</span>
                  <span className="right">{user?.puesto}</span>
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
                  setCurrentSchedule(
                    listOfSchedules[currentIndex - 1].toString()
                  )
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
                <span>{parsedDatesPerJornada[currentSchedule]}</span>
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
                    Jornada {jor}{' '}
                    {parsedDatesPerJornada[jor]
                      ? `(${parsedDatesPerJornada[jor]})`
                      : ''}
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
                  setCurrentSchedule(
                    listOfSchedules[currentIndex + 1].toString()
                  )
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
                // const scoreArray = score.resultadoFinal.split('-')
                const score1 = score.equipo1Goles
                const score2 = score.equipo2Goles
                return (
                  <React.Fragment key={score.id}>
                    <div className="polla-score__group-sted">
                      <div className="polla-score__group-stedn">
                        {/* Estadio <b>{score.estadio}</b> */}
                        <b>{score.estadio}</b>
                      </div>
                      <div className="polla-score__group-stedc">
                        {parsedStadiumLocationPerName[score.estadio]}
                      </div>
                      <div className="polla-score__group-stedd">
                        {dateTimeFormater.format(new Date(score.fechaHora))}
                      </div>
                    </div>
                    <form
                      className="polla-score__form"
                      onSubmit={async (e) => {
                        e.preventDefault()
                        const form = e.target as HTMLFormElement
                        const formData = new FormData(form)
                        const team1 = formData.get('team1')
                        const team2 = formData.get('team2')
                        if (
                          Number(team1 || '-1') >= 0 &&
                          Number(team2 || '-1') >= 0
                        ) {
                          if (
                            !(
                              team1 === score.equipo1Goles &&
                              team2 === score.equipo2Goles
                            )
                          ) {
                            form.classList.add('loading')
                            await fetch(
                              `https://4dtmic7lj2.execute-api.us-east-1.amazonaws.com/dev/${idconcurso}/usuario/${userUuid}/pronostico/${score.id}`,
                              {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  pronostico: `${team1}-${team2}`,
                                }),
                              }
                            )
                            const parsedScore = scores?.map((sc) => {
                              if (sc.id === score.id) {
                                const newScore: Score = {
                                  ...sc,
                                  msg: 'success',
                                  equipo1Goles: team1 as string,
                                  equipo2Goles: team2 as string,
                                }
                                return newScore
                              }
                              return sc
                            })
                            setScores(parsedScore)
                            form.classList.remove('loading')
                          }
                        } else {
                          const parsedScore = scores?.map((sc) => {
                            if (sc.id === score.id) {
                              const newScore: Score = { ...sc, msg: 'error' }
                              return newScore
                            }
                            return sc
                          })
                          setScores(parsedScore)
                        }
                      }}
                      onFocus={() => {
                        const parsedScore = scores?.map((sc) => {
                          if (sc.id === score.id) {
                            const newScore: Score = { ...sc, msg: null }
                            return newScore
                          }
                          return sc
                        })
                        setScores(parsedScore)
                      }}>
                      <div className="polla-score__form-top">
                        <div className="polla-score__country-cont">
                          <img
                            className="polla-score__country-img"
                            src={`${countriesAssetsPath}${slugify(
                              score.equipo1
                            )}.svg`}
                            alt="País"
                          />
                          <div className="polla-score__country-text">
                            {score.equipo1}
                          </div>
                        </div>
                        <input
                          disabled={score.estado > 1}
                          type="number"
                          min="0"
                          className="polla-score__form-input"
                          name="team1"
                          defaultValue={score1}
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
                          disabled={score.estado > 1}
                          type="number"
                          min="0"
                          className="polla-score__form-input"
                          name="team2"
                          defaultValue={score2}
                        />
                        <div className="polla-score__country-cont">
                          <img
                            className="polla-score__country-img"
                            src={`${countriesAssetsPath}${slugify(
                              score.equipo2
                            )}.svg`}
                            alt="País"
                          />
                          <div className="polla-score__country-text">
                            {score.equipo2}
                          </div>
                        </div>
                      </div>
                      <div className="polla-score__error-cont">
                        {score.msg === 'error' && (
                          <span className="polla-score__error">
                            Debes llenar ambas casillas
                          </span>
                        )}
                        {score.estado === 3 ? (
                          <span className="polla-score__points-txt">
                            + {score.puntos} pts.
                          </span>
                        ) : null}
                        {score.estado === 3 ? (
                          <span className="polla-score__result-txt">
                            Resultado Final: {score.resultadoFinal}
                          </span>
                        ) : null}
                      </div>
                      {score.estado < 2 && (
                        <button
                          className={`polla-score__form-btn ${score.msg || ''}`}
                          type="submit">
                          {score.msg === 'success' ? 'Guardado' : 'Juega'}
                          <div
                            className="polla-score__spinner btn"
                            style={{ fontSize: '4px' }}
                          />
                          {score.msg === 'success' && (
                            <svg
                              className="polla-score__btn-done"
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24">
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                            </svg>
                          )}
                        </button>
                      )}
                    </form>
                  </React.Fragment>
                )
              })}
            </div>
          ))}
        </>
      )}
    </>
  )
}

PollaScoreList.label = 'La Polla - Listado de Scores'

PollaScoreList.propTypes = {
  customFields: PropTypes.shape({
    datesPerJornada: PropTypes.json.tag({
      name: 'JSON de Fechas por jornada',
    }),
    stadiumLocationPerName: PropTypes.json.tag({
      name: 'JSON de locación de estadios por nombre de estadios',
    }),
    excludedIds: PropTypes.richtext.tag({
      name: 'Listado de IDs, separados por comas, que deben tener estado 3',
      description:
        'Ej: f1dm5ayrkdn4epycrwclcnmne,f183xpeabr5fz3379ygnug416,f1blibc0yb0reblr32nbodc2y',
    }),
  }),
}

export default PollaScoreList
