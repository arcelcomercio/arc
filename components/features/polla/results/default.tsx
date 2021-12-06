import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { slugify } from '../../../utilities/parse/slugify'
import { Game } from './_types/types'

interface Props {
  customFields?: {
    stadiumLocationPerName?: string
    serviceEndPoint?: string
    defaultDate?: string
  }
}

let isMobile: boolean

if (typeof window !== 'undefined')
  isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )

const COUNTRIES_ASSETS_PATH =
  'https://cdna.depor.com/resources/dist/depor/images-polla/paises/'

interface GamesByDate {
  [x: string]: Game[]
}

const monthNames = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC',
]

const PollaGuide: FC<Props> = (props) => {
  const [datesArray, setDatesArray] = React.useState<Date[]>()
  const [gamesByDate, setGamesByDate] = React.useState<GamesByDate>()
  const [currentDate, setCurrentDate] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)

  const { customFields } = props

  const parsedStadiumLocationPerName = JSON.parse(
    customFields?.stadiumLocationPerName || '{}'
  )

  const sliderContainer = React.useRef<HTMLDivElement>(null)

  const getDaysArray = (start: Date, end: Date) => {
    const endArr = []
    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      endArr.push(new Date(dt))
    }
    return endArr
  }

  const dateFormater = new Intl.DateTimeFormat('es-419-u-hc-h12', {
    month: '2-digit',
    day: '2-digit',
  })

  React.useEffect(() => {
    setDatesArray(getDaysArray(new Date('06/11/2021'), new Date('07/15/2021')))
    fetch(
      customFields?.serviceEndPoint || ''
      // 'https://cdna-resultadosopta.minoticia.pe/api-soccer/statistics/leagues/45db8orh1qttbsqq9hqapmbit/results/'
    )
      .then((res) => res.json())
      .then((res: Game[]) => {
        const format = res?.reduce(
          (r: { [key in string]: Game[] }, a: Game) => {
            const auxDate = dateFormater.format(
              new Date(a.date.replace(/-/g, '/'))
            )
            const auxR = r
            auxR[auxDate] = [...(r[auxDate] || []), a]
            return auxR
          },
          {}
        )
        setGamesByDate(format)
        setIsLoading(false)

        const actualDate = new Date()
        if ((format?.[dateFormater.format(actualDate)]?.length || -1) > 0) {
          setCurrentDate(dateFormater.format(actualDate))
        } else if (format) {
          setCurrentDate(customFields?.defaultDate || '13/6')
        }
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  const currentGamesArray = gamesByDate?.[currentDate]

  const sideScrollInterval = (
    direction: 'left' | 'right',
    speed: number,
    distance: number,
    step: number
  ) => {
    const container = sliderContainer.current
    let scrollAmount = 0
    if (container) {
      const slideTimer = setInterval(() => {
        if (direction === 'left') {
          container.scrollLeft -= step
        } else {
          container.scrollLeft += step
        }
        scrollAmount += step
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer)
        }
      }, speed)
    }
  }

  const sideScroll = (direction: 'left' | 'right') => {
    const container = sliderContainer.current
    const isNotSupportSmooth =
      document.body.style['scroll-behavior' as any] === undefined
    if (container) {
      if (direction === 'left') {
        if (isNotSupportSmooth) sideScrollInterval('left', 25, 200, 20)
        else container.scrollLeft -= 100
      } else if (isNotSupportSmooth) {
        sideScrollInterval('right', 25, 200, 25)
      } else {
        container.scrollLeft += 100
      }
    }
  }

  const diccionarioPaises = (name: string) => {
    let abrev = ''
    if (name === 'Colombia') {
      abrev = 'COL'
    }
    if (name === 'Paraguay') {
      abrev = 'PAR'
    }
    if (name === 'Argentina') {
      abrev = 'ARG'
    }
    if (name === 'Uruguay') {
      abrev = 'URU'
    }
    if (name === 'Venezuela') {
      abrev = 'VEN'
    }
    if (name === 'Perú') {
      abrev = 'PER'
    }
    if (name === 'Bolivia') {
      abrev = 'BOL'
    }
    if (name === 'Chile') {
      abrev = 'CHI'
    }
    if (name === 'Brasil') {
      abrev = 'BRA'
    }
    if (name === 'Ecuador') {
      abrev = 'ECU'
    }

    return abrev
  }

  return (
    <div className="polla-results__main">
      {isLoading ? (
        <div className="polla-score__spinner" style={{ fontSize: '5px' }} />
      ) : (
        <>
          <div className="polla-results__title">
            Resultados del{' '}
            {gamesByDate?.[currentDate]?.[0].date
              ? new Intl.DateTimeFormat('es-419-u-hc-h12', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                  timeZone: 'America/Lima',
                }).format(
                  new Date(
                    gamesByDate?.[currentDate]?.[0].date.replace(/-/g, '/')
                  )
                )
              : ''}
          </div>
          <div className="polla-results__slider-container">
            <button
              type="button"
              className="polla-results__slider-btn"
              onClick={() => {
                sideScroll('left')
              }}>
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0L10 2L4 8L10 14L8 16L0 8L8 0Z"
                  fill="white"
                />
              </svg>
            </button>

            <div className="polla-results__dates" ref={sliderContainer}>
              {datesArray?.map((date) => (
                <button
                  key={date.toDateString()}
                  type="button"
                  className={`polla-results__dates-item ${
                    dateFormater.format(date) === currentDate ? 'active' : ''
                  } ${
                    (gamesByDate?.[dateFormater.format(date)]?.length || -1) > 0
                      ? 'available'
                      : ''
                  }`}
                  disabled={
                    !(
                      (gamesByDate?.[dateFormater.format(date)]?.length || -1) >
                      0
                    )
                  }
                  onClick={() => {
                    setCurrentDate(dateFormater.format(date))
                  }}>
                  <span className="polla-results__dates-text">
                    {monthNames[date.getMonth()]}
                  </span>
                  <span className="polla-results__dates-number">
                    {`0${date.getDate()}`.slice(-2)}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="polla-results__slider-btn"
              onClick={() => {
                sideScroll('right')
              }}>
              <svg
                width="11"
                height="16"
                viewBox="0 0 11 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.005 0L10.005 8L2.005 16L0 14L6.005 8L0 2L2.005 0Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          {currentGamesArray?.map((game) => (
            <div
              key={`${game.date}-${game.time}-${game.contestants.home_contestant}`}
              className={`polla-results__list ${game.status}`}>
              <div className="polla-results__list-item">
                <div className="polla-results__list-stadium">
                  <b>{game.stadium}</b>
                </div>
                <div className="polla-results__list-ub">
                  {parsedStadiumLocationPerName[game.stadium]}
                </div>
                <div className="polla-results__list-cont">
                  <div className="polla-results__score-cont">
                    <div className="polla-results__country">
                      {isMobile ? (
                        <>
                          {game.contestants.home_contestant ? (
                            <img
                              src={`${COUNTRIES_ASSETS_PATH}${slugify(
                                game.contestants.home_contestant
                              )}.svg`}
                              alt="Flag"
                            />
                          ) : null}
                          <span>
                            {isMobile
                              ? diccionarioPaises(
                                  game.contestants.home_contestant
                                )
                              : game.contestants.home_contestant ||
                                'Por definirse'}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            {isMobile
                              ? diccionarioPaises(
                                  game.contestants.home_contestant
                                )
                              : game.contestants.home_contestant ||
                                'Por definirse'}
                          </span>
                          {game.contestants.home_contestant ? (
                            <img
                              src={`${COUNTRIES_ASSETS_PATH}${slugify(
                                game.contestants.home_contestant
                              )}.svg`}
                              alt="Flag"
                            />
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className="polla-results__container-mid">
                      <div className="polla-results__score-item">
                        {game.status === 'Played' ||
                        game.status === 'Playing' ? (
                          <>
                            <div className="polla-results__score-numbers">
                              <span>{game.home_goals}</span>
                              <span>{game.away_goals}</span>
                            </div>
                            {game.status === 'Played' ? (
                              <div className="polla-results__score-text">
                                FINALIZADO
                              </div>
                            ) : (
                              <div className="polla-results__score-live">
                                <span className="polla-results__live-dot" />
                                <span>En vivo</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="polla-results__score-date">
                            <span>
                              {new Intl.DateTimeFormat('es-419-u-hc-h12', {
                                month: '2-digit',
                                day: '2-digit',
                              }).format(new Date(game.date.replace(/-/g, '/')))}
                            </span>
                            <span>
                              {' '}
                              {new Intl.DateTimeFormat('es-419-u-hc-h12', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'America/Lima',
                                hour12: true,
                              }).format(
                                new Date(
                                  `${game.date.replace(/-/g, '/')} ${game.time}`
                                )
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                      {isMobile ? (
                        <div className="polla-results__button-resumen-mob">
                          <a href="https://www.google.com/">Resumen</a>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="polla-results__country-right">
                      {game.contestants.away_contestant ? (
                        <img
                          src={`${COUNTRIES_ASSETS_PATH}${slugify(
                            game.contestants.away_contestant
                          )}.svg`}
                          alt="Flag"
                        />
                      ) : null}
                      <span>
                        {isMobile
                          ? diccionarioPaises(game.contestants.away_contestant)
                          : game.contestants.away_contestant || 'Por definirse'}
                      </span>
                    </div>
                    {isMobile ? (
                      ''
                    ) : (
                      <div className="polla-results__button-resumen">
                        <a href="https://www.google.com/">Resumen</a>
                      </div>
                    )}
                  </div>
                  <a href="/" className="polla-results__score-link">
                    Resumen
                  </a>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

PollaGuide.label = 'La Polla - Resultados'

PollaGuide.propTypes = {
  customFields: PropTypes.shape({
    serviceEndPoint: PropTypes.string.tag({
      name: 'URL del servicio',
      description:
        'Por defecto la URL es https://4dtmic7lj2.execute-api.us-east-1.amazonaws.com/dev',
    }),
    stadiumLocationPerName: PropTypes.json.tag({
      name: 'JSON de locación de estadios por nombre de estadios',
    }),
    defaultDate: PropTypes.string.tag({
      name: 'Fecha por defecto cuando en la fecha actual no hay partidos',
    }),
  }),
}

export default PollaGuide
