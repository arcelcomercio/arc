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
    appendToBody(
      createScript({
        textContent: minuteScript,
        async: true,
        defer: true,
      })
    )
    this.fetchData()
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

    return (
      <div className="col-3 flex by-minute live-mxm">
        <div className="by-minute__left p-20">
          <h2 className="text-center text-xl line-h-sm font-bold mb-20">
            <a href={url} className="text-white tertiary-font">
              {title}
            </a>
          </h2>
          {typeComponent === 'play' && (
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
                  <li className="game-group" />
                  <li className="playing-time secondary-font text-md text-white" />
                </ul>
              </div>
              <div className="box-game rounded-sm bg-white p-5 mt-10">
                <a
                  className="page-link by-minute__bar flex justify-between"
                  href="/play/reportajes/alemania-vs-irlanda-norte-vivo-hoy-eliminatorias-eurocopa-2020-noticia-6098">
                  <div className="game-team team1 flex items-center">
                    <span className="team-shield">
                      <img className="by-minute__team-shield" src="" alt="" />
                    </span>
                    <span className="team-name pl-10 tertiary-font" />
                  </div>
                  <div className="game-score flex items-center">
                    <span className="team-goals team-goals1 pr-10">
                      <div className="goals">-</div>
                    </span>
                    <span className="game-status position-relative">
                      <svg
                        id="timer-progress"
                        className="timer-progress by-minute__time-progress"
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
                        -
                      </span>
                    </span>
                    <span className="team-goals team-goals2 pl-10">
                      <div className="goals">-</div>
                    </span>
                  </div>
                  <div className="game-team team2 flex items-center">
                    <span className="team-name pr-10 tertiary-font" />
                    <span className="team-shield">
                      <img className="by-minute__team-shield" src="" alt="" />
                    </span>
                  </div>
                </a>
              </div>
            </>
          )}
        </div>
        <div className="by-minute__right">
          {typeComponent === 'play' ? (
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
