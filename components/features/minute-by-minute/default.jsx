import React, { useEffect } from 'react'
import { useFusionContext } from 'fusion:context'

import { createScript, appendToBody } from '../../utilities/helpers'

const MinuteByMinute = () => {
  const { contextPath, deployment } = useFusionContext()

  useEffect(() => {
    console.log('asdfasdfasdfasdf')
    appendToBody(
      createScript({
        src:
          'https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7',
        async: true,
      })
    )
  })

  return (
    <div className="col-3 flex by-minute">
      <div className="by-minute__left">
        <h2>
          <a href="/">
            ALEMANIA VS. IRLANDA DEL NORTE EN VIVO: HOY POR LAS ELIMINATORIAS
            EUROCOPA 2020
          </a>
        </h2>

        <div className="w-game-info">
          <ul className="game-info">
            <li className="game-live">
              <img
                src={deployment(
                  `${contextPath}/resources/assets/minute-by-minute/icon_live.png`
                )}
                alt=""
              />
              En vivo
            </li>
            <li className="game-group"></li>
            <li className="playing-time">FINAL</li>
          </ul>
        </div>

        <div className="box-game">
          <a
            className="page-link"
            href="/play/reportajes/alemania-vs-irlanda-norte-vivo-hoy-eliminatorias-eurocopa-2020-noticia-6098">
            <div className="game-team team1">
              <span className="team-shield">
                <img
                  src="https://cde.3.elcomercio.pe/img/0/1/6/9/4/1694568.png"
                  alt=""
                />
              </span>
              <span className="team-name">PER</span>
            </div>
            <div className="game-score">
              <span className="team-goals team-goals1">
                <div className="goals">0</div>
              </span>
              <span className="game-status">
                <svg
                  id="timer-progress"
                  className="timer-progress"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0">
                  <circle
                    id="timer-progress-base"
                    className="timer-progress-base"
                    r="22"
                    cx="24"
                    cy="24"
                    fill="#ffffff"
                    strokeDasharray="137.339"
                    strokeDashoffset="0"></circle>
                  <circle
                    id="timer-progress-fill"
                    className="timer-progress-fill"
                    r="22"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    strokeDasharray="137.339"
                    strokeDashoffset="0"
                    style={{ 'stroke-dashoffset': '138.23px' }}></circle>
                </svg>
                <span className="game-status-time" id="game-status-time">
                  -
                </span>
              </span>
              <span className="team-goals team-goals2">
                <div className="goals">1</div>
              </span>
            </div>
            <div className="game-team team2">
              <span className="team-name">ECU</span>
              <span className="team-shield">
                <img
                  src="https://cde.3.elcomercio.pe/img/0/1/4/1/2/1412585.png"
                  alt=""
                />
              </span>
            </div>
          </a>
        </div>
      </div>
      <div className="by-minute__right">
        <mxm-evento code="10603" h="235px"></mxm-evento>
      </div>
    </div>
  )
}

MinuteByMinute.label = 'Minuto a minuto'

export default MinuteByMinute
