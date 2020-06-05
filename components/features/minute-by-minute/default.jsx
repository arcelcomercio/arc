/* eslint-disable func-names */
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import { getAssetsPath } from '../../utilities/assets'
import { fetchLive } from './_dependencies/scripts'

// TODO: convertir en componente funcional con hooks

@Consumer
class MinuteByMinute extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}

    const {
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
      arcSite,
    } = props

    this.fetchContent({
      content: {
        source: contentService,
        query: Object.assign(contentConfigValues, {
          includedFields: `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic`,
        }),
        filter: schemaFilter(arcSite),
        transform: response => {
          const {
            headlines: { basic: title = '' } = {},
            subheadlines: { basic: subTitle = '' } = {},
            websites: { [arcSite]: { website_url: websiteUrl = '' } = {} } = {},
          } = response || {}

          return { title, subTitle, url: websiteUrl }
        },
      },
    })
  }

  toggleProgress = (tiempo, equipos) => {
    return tiempo === 'PENALES' ||
      (tiempo === 'FINAL' &&
        (equipos.goles_penal_local > 0 || equipos.goles_penal_visitante > 0))
      ? 'hiden'
      : 'show'
  }

  render() {
    const { contextPath, isAdmin } = this.props
    const {
      customFields: {
        typeComponent = '',
        codeComponent = '',
        titleField = '',
        subtitleField = '',
      } = {},
      editableField,
      arcSite,
    } = this.props

    const { content } = this.state
    const { title, url, subTitle } = content || {}

    return (
      <div
        className={`col-3 flex by-minute live-mxm ${
          typeComponent === 'partido' ? 'mxm-partido' : 'mxm-eventos'
        }`}>
        <div className="by-minute__left p-20">
          {typeComponent === 'partido' ? (
            <>
              <h2 itemProp="name" className="text-center text-xl line-h-sm font-bold mb-20">
                <a
                  {...editableField('titleField')}
                  suppressContentEditableWarning
                  href={url}
                  className="text-white tertiary-font">
                  {titleField || title}
                </a>
              </h2>
              <div className="w-game-info">
                <ul className="game-info flex justify-end">
                  <li className="game-live secondary-font mr-10 text-md flex items-center text-white">
                    <img
                      src={`${getAssetsPath(
                        arcSite,
                        contextPath
                      )}/resources/assets/minute-by-minute/icon_live.png?d=1`}
                      alt=""
                      className="mr-5"
                    />
                    En vivo
                  </li>
                  <li className="game-group" id="info"></li>
                  <li
                    id="tiempo"
                    className="playing-time secondary-font text-md text-white"></li>
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
                        id="bandera_local"
                        src=""
                        alt=""
                      />
                    </span>
                    <span
                      className="team-name pl-10 tertiary-font"
                      id="local"></span>
                  </div>
                  <div className="game-score flex items-center  by-minute__middle ">
                    <span className="team-goals team-goals1 pr-10">
                      <div className="goals" id="goles_local"></div>
                    </span>
                    <span className="game-status position-relative  by-minute__box-separator  rounded border-1 border-solid border-gray">
                      <span
                        className="game-status-time by-minute__separator"
                        id="game-status-time"></span>
                    </span>
                    <span className="team-goals team-goals2 pl-10">
                      <div className="goals" id="goles_visitante"></div>
                    </span>
                  </div>
                  <div className="game-team team2 flex items-center">
                    <span
                      className="team-name pr-10 tertiary-font"
                      id="visitante"></span>
                    <span className="team-shield">
                      <img
                        className="by-minute__team-shield"
                        id="bandera_visitante"
                        src=""
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
                    src={`${getAssetsPath(
                      arcSite,
                      contextPath
                    )}/resources/assets/minute-by-minute/icon_live.png?d=1`}
                    alt=""
                    className="mr-5"
                  />
                  En vivo
                </div>
              </div>
              <h2 itemProp="name" className="text-center text-xl line-h-sm font-bold mt-20">
                <a
                  {...editableField('titleField')}
                  suppressContentEditableWarning
                  href={url}
                  className="text-white tertiary-font">
                  {titleField || title}
                </a>
              </h2>
              <p className="text-center mt-15">
                <a
                  {...editableField('subtitleField')}
                  suppressContentEditableWarning
                  className="text-white line-h-xs"
                  href={url}>
                  {subtitleField || subTitle}
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
                    id="srcset_320"
                    srcSet=""
                    media="(max-width: 640px)"
                  />
                  <source
                    className="srcset_637"
                    srcSet=""
                    id="srcset_637"
                    media="(max-width: 1023px)"
                  />
                  <source
                    className="srcset_493"
                    srcSet=""
                    id="srcset_493"
                    media="(max-width: 1359px)"
                  />
                  <source className="srcset_675" srcSet="" id="srcset_675" />
                  <img src="" id="scorer-image" alt="" />
                </picture>
              </a>
            </div>
          </div>
        </div>
        <div className="by-minute__right">
          {typeComponent === 'partido' ? (
            <mxm-partido
              code={codeComponent}
              admin={isAdmin}
              noframe
              h="270px"
            />
          ) : (
            <mxm-evento
              code={codeComponent}
              admin={isAdmin}
              noframe
              h="270px"
            />
          )}
        </div>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `"use strict";${fetchLive}`,
          }}
        />
      </div>
    )
  }
}

MinuteByMinute.propTypes = {
  customFields,
}

MinuteByMinute.label = 'Minuto a minuto'
MinuteByMinute.static = true
export default MinuteByMinute
