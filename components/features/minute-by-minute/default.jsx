/* eslint-disable func-names */
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
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

@Consumer
class MinuteByMinute extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
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

    function updateTime(time, min) {
      const timerProgressFill = document.getElementById('timer-progress-fill')

      let minute = 0
      const minInt = parseInt(min)

      const updateCircle = r => {
        const length = 2 * Math.PI * r
        const nowSec = 3600 - minute * 60

        const percentage = (nowSec * 100) / 3600
        const strokeDashoffset = (length * percentage) / 100
        timerProgressFill.style.strokeDashoffset = `${strokeDashoffset}px`
      }

      switch (time) {
        case 'ST':
          minute = minInt - 45
          break
        case 'PTS':
          minute = minInt - 90
          break
        case 'STS':
          minute = minInt - 105
          break
        case 'Final':
          if (minInt >= 90 && minInt < 105) minute = minInt - 45
          else if (minInt >= 105 && minInt < 120) minute = minInt - 90
          else if (minInt >= 120) minute = minInt - 105
          break
        case 'PENALES':
          if (minInt >= 90 && minInt < 105) minute = minInt - 45
          else if (minInt >= 105 && minInt < 120) minute = minInt - 90
          else if (minInt >= 120) minute = minInt - 105
          break
        default:
          minute = minInt
          break
      }

      if (window.innerWidth <= 640) updateCircle(13.5)
      else updateCircle(22)
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 640) updateCircle(13.5)
        else updateCircle(22)
      })
    }

    const self = this
    function runScorer() {
      const instances = getMxmInstances()
      const key = Object.keys(instances)[0]

      instances[key].pubsub.on('data', function(data) {
        self.setState({ inner: data })
        updateTime(data.tiempo, data.time)
      })
    }
    window.on_mxm_loaded = function(instances) {
      window.getMxmInstances = () => {
        return instances
      }
    }

    const waitjQueryAndMxm = () => {
      if (window.jQuery) {
        if (document.querySelector('.mxm-input')) {
          runScorer()
          return true
        }
        setTimeout(waitjQueryAndMxm, 1000)
      }
      setTimeout(waitjQueryAndMxm, 100)
    }

    waitjQueryAndMxm()

    this.fetchData()
  }

  getTimeRender = (time = '') => {
    if (time !== '' && time !== 'PENALES' && time !== 'ENTRETIEMPO') return time
    if (time === 'ENTRETIEMPO') return 'ET'
    return '-'
  }

  gameStatus = (status = '') => {
    switch (status) {
      case 'PT':
        return '1ER TIEMPO'
      case 'ST':
        return '2DO TIEMPO'
      case 'PTS':
        return '1ER TIEMPO SUPL.'
      case 'STS':
        return '2DO TIEMPO SUPL.'
      case 'Final':
        break
      case 'PENALES':
        return 'PENALES'
      case 'ENTRETIEMPO':
        return 'ENTRETIEMPO'
      default:
        break
    }
    return status.toUpperCase()
  }

  toggleProgress = (tiempo, equipos) => {
    return tiempo === 'PENALES' ||
      (tiempo === 'FINAL' &&
        (equipos.goles_penal_local > 0 || equipos.goles_penal_visitante > 0))
      ? 'hiden'
      : 'show'
  }

  fetchData() {
    const {
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
      arcSite,
    } = this.props

    const { fetched } = this.getContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    })

    fetched.then(response => {
      const {
        headlines: { basic = '' } = {},
        websites: { [arcSite]: { website_url: websiteUrl = '' } = {} },
      } = response
      this.setState({ title: basic, url: websiteUrl })
    })
  }

  render() {
    const { title, url } = this.state
    const { deployment, contextPath } = this.props
    const {
      customFields: { typeComponent = '', codeComponent = '' } = {},
    } = this.props

    const { inner } = this.state
    const defaultValue = '-'

    const equipos = (inner && inner.match[0]) || {}
    const { time, tiempo, info, publicidad = {} } = inner || {}
    console.log(inner, 'DATAAAAAAAAAAA')
    return (
      <div
        className={`col-3 flex by-minute live-mxm ${
          typeComponent === 'partido' ? 'mxm-partido' : 'mxm-eventos'
        }`}>
        <div className="by-minute__left p-20">
          <h2 className="text-center text-xl line-h-sm font-bold mb-20">
            <a href={url} className="text-white tertiary-font">
              {title}
            </a>
          </h2>
          {typeComponent === 'partido' && (
            <>
              <div className="w-game-info">
                <ul className="game-info flex justify-end">
                  <li className="game-live secondary-font mr-10 text-md flex items-center text-white">
                    <img
                      src={deployment(
                        `${contextPath}/resources/assets/minute-by-minute/icon_live.png`
                      )}
                      alt=""
                      className="mr-5"
                    />
                    En vivo
                  </li>
                  <li className="game-group">{info}</li>
                  <li className="playing-time secondary-font text-md text-white">
                    {this.gameStatus(tiempo)}
                  </li>
                </ul>
              </div>
              <div className="box-game rounded-sm bg-white p-5 mt-10">
                <a
                  className="page-link by-minute__bar flex justify-between"
                  href={url}>
                  <div className="game-team team1 flex items-center">
                    <span className="team-shield">
                      <img
                        className="by-minute__team-shield"
                        src={equipos.bandera_local}
                        alt=""
                      />
                    </span>
                    <span className="team-name pl-10 tertiary-font">
                      {equipos.local || defaultValue}
                    </span>
                  </div>
                  <div className="game-score flex items-center">
                    <span className="team-goals team-goals1 pr-10">
                      <div className="goals">
                        {equipos.goles_local || defaultValue}
                      </div>
                    </span>
                    <span className="game-status position-relative">
                      <svg
                        id="timer-progress"
                        className={`timer-progress by-minute__time-progress ${this.toggleProgress(
                          tiempo,
                          equipos
                        )}`}
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
                          strokeDashoffset="0"
                        />
                        <circle
                          id="timer-progress-fill"
                          className="timer-progress-fill"
                          r="22"
                          cx="24"
                          cy="24"
                          fill="transparent"
                          strokeDasharray="137.339"
                          strokeDashoffset="0"
                          style={{ 'stroke-dashoffset': '138.23px' }}
                        />
                      </svg>
                      <span
                        className="game-status-time by-minute__separator"
                        id="game-status-time">
                        {this.getTimeRender(time)}
                      </span>
                    </span>
                    <span className="team-goals team-goals2 pl-10">
                      <div className="goals">
                        {equipos.goles_visitante || defaultValue}
                      </div>
                    </span>
                  </div>
                  <div className="game-team team2 flex items-center">
                    <span className="team-name pr-10 tertiary-font">
                      {equipos.visitante || defaultValue}
                    </span>
                    <span className="team-shield">
                      <img
                        className="by-minute__team-shield"
                        src={equipos.bandera_visitante}
                        alt=""
                      />
                    </span>
                  </div>
                </a>
              </div>
            </>
          )}

          <div className="scorer-sponsor">
            <div id="eplAd_REEMPLAZAR_POR_EPLANNING1">
              <a href="/" target="_blank">
                <picture>
                  <source
                    className="srcset_320"
                    srcSet={publicidad.img_publ_320x52}
                    media="(max-width: 640px)"
                  />
                  <source
                    className="srcset_637"
                    srcSet={publicidad.img_publ_637x70}
                    media="(max-width: 1023px)"
                  />
                  <source
                    className="srcset_493"
                    srcSet={publicidad.img_publ_493x97}
                    media="(max-width: 1359px)"
                  />
                  <source
                    className="srcset_675"
                    srcSet={publicidad.img_publ_675x97}
                  />
                  <img src={publicidad.img_publ_675x97} alt="" />
                </picture>
              </a>
            </div>
          </div>
        </div>
        <div className="by-minute__right">
          {typeComponent === 'partido' ? (
            <mxm-partido code={codeComponent} noframe h="235px" />
          ) : (
            <mxm-evento code={codeComponent} noframe h="748px" />
          )}
        </div>
      </div>
    )
  }
}

MinuteByMinute.propTypes = {
  customFields,
}

MinuteByMinute.label = 'Minuto a minuto'
export default MinuteByMinute
