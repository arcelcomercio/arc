/* eslint-disable func-names */
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import { appendToBody } from '../../utilities/helpers'

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

    const self = this
    function runScorer() {
      // eslint-disable-next-line no-undef
      const instances = getMxmInstances()
      const key = Object.keys(instances)[0]

      instances[key].pubsub.on('data', function(data) {
        self.setState({ inner: data })
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

  gameStatus = (status = '-') => {
    const cases = {
      PT: '1ER TIEMPO',
      ST: '2DO TIEMPO',
      PTS: '1ER TIEMPO SUPL.',
      STS: '2DO TIEMPO SUPL.',
      Final: '',
      PENALES: 'PENALES',
      ENTRETIEMPO: 'ENTRETIEMPO',
      default: '',
    }
    return cases[status] || cases.default
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
        headlines: { basic: title = '' } = {},
        subheadlines: { basic: subTitle = '' } = {},
        websites: { [arcSite]: { website_url: websiteUrl = '' } = {} },
      } = response
      this.setState({ title, subTitle, url: websiteUrl })
    })
  }

  render() {
    const { title, url, subTitle } = this.state
    const { deployment, contextPath } = this.props
    const {
      customFields: { typeComponent = '', codeComponent = '' } = {},
    } = this.props

    const { inner } = this.state
    const defaultValue = '-'

    const equipos = (inner && inner.match && inner.match[0]) || {}
    const { time, tiempo, info, publicidad = {} } = inner || {}

    return (
      <div
        className={`col-3 flex by-minute live-mxm ${
          typeComponent === 'partido' ? 'mxm-partido' : 'mxm-eventos'
        }`}>
        <div className="by-minute__left p-20">
          {typeComponent === 'partido' ? (
            <>
              <h2 className="text-center text-xl line-h-sm font-bold mb-20">
                <a href={url} className="text-white tertiary-font">
                  {title}
                </a>
              </h2>
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
              <div className="box-game  rounded-sm bg-white p-5 mt-10">
                <a
                  className="page-link by-minute__bar flex justify-between items-center position-relative"
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
                  <div className="game-score flex items-center  by-minute__middle ">
                    <span className="team-goals team-goals1 pr-10">
                      <div className="goals">
                        {equipos.goles_local || defaultValue}
                      </div>
                    </span>
                    <span className="game-status position-relative  by-minute__box-separator  rounded border-1 border-solid border-gray">
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
          ) : (
            <>
              <div className="w-game-info flex justify-center">
                <div className="game-live secondary-font mt-20 text-md flex items-center text-white">
                  <img
                    src={deployment(
                      `${contextPath}/resources/assets/minute-by-minute/icon_live.png`
                    )}
                    alt=""
                    className="mr-5"
                  />
                  En vivo
                </div>
              </div>
              <h2 className="text-center text-xl line-h-sm font-bold mt-20">
                <a href={url} className="text-white tertiary-font">
                  {title}
                </a>
              </h2>
              <p className="text-center mt-15">
                <a className="text-white" href={url}>
                  {subTitle}
                </a>
              </p>
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
            <mxm-evento code={codeComponent} noframe h="258px" />
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
