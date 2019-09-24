import React, { useEffect } from 'react'
import { useFusionContext } from 'fusion:context'

import { appendToBody } from '../../utilities/helpers'
import minuteScript from './_dependencies/minute-by-minute-script'

const createScript = ({ src, async, defer, textContent = '', jquery }) => {
  const node = document.createElement('script')
  if (src) {
    node.type = 'text/javascript'

    node.src = src
  }
  if (async) {
    node.async = true
  }
  if (defer) {
    node.defer = true
  }
  if (jquery) {
    node.setAttribute(
      'integrity',
      'sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44='
    )
    node.setAttribute('crossorigin', 'anonymous')
  }
  node.textContent = textContent
  return node
}

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
    appendToBody(
      createScript({
        src: 'https://code.jquery.com/jquery-2.2.4.min.js',
        async: true,
        jquery: true,
      })
    )
    appendToBody(
      createScript({
        textContent: minuteScript,
        async: true,
        defer: true,
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

        <div className="live-mxm">asdasd</div>

        <div className="w-game-info">
          <ul className="game-info flex justify-end">
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
            className="page-link flex"
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
        <mxm-partido code="2184" h="235px"></mxm-partido>
      </div>
    </div>
  )
}

MinuteByMinute.label = 'Minuto a minuto'

export default MinuteByMinute
