/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

// import { slugify } from '../../../utilities/parse/slugify'
import { GroupData } from './_utlis/types'

// const DEFAULT_ENDPOINT =
//   'https://cdna-resultadosopta.minoticia.pe/api-soccer/statistics/leagues/'

// const UUID_COMPETITION = '45db8orh1qttbsqq9hqapmbit'

// const COUNTRIES_ASSETS_PATH =
//   'https://cdna.depor.com/resources/dist/depor/images-polla/paises/'

interface Props {
  customFields?: {
    serviceEndPoint?: string
    // serviceEndPoint2?: string
    tableLinkUrl?: string
    tableFase1LinkUrl?: string
    tableFase2LinkUrl?: string
    customGroupName?: string
    fullMode?: boolean
  }
}

let isMobile: boolean

if (typeof window !== 'undefined')
  isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )

const PollaPositionsTable: FC<Props> = (props) => {
  const [list, setList] = React.useState<GroupData[]>()
  const [isLoading, setIsLoading] = React.useState(true)
  const [isError, setIsError] = React.useState(false)

  const { customFields } = props

  React.useEffect(() => {
    fetch(customFields?.serviceEndPoint || '')
      .then((res) => res.json())
      .then((res: GroupData[]) => {
        setList(res)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        setIsError(true)
      })
  }, [])

  const parsedCustomGroupName: { [key in string]: string } = JSON.parse(
    customFields?.customGroupName || '{}'
  )

  const diccionario = (name: string) => {
    let abrev = ''
    if (name === 'Alianza Lima') {
      abrev = 'ALI'
    }
    if (name === 'Sporting Cristal') {
      abrev = 'CRI'
    }
    if (name === 'Universitario') {
      abrev = 'UNI'
    }
    if (name === 'Melgar') {
      abrev = 'MEL'
    }
    if (name === 'Sport Boys') {
      abrev = 'SBA'
    }
    if (name === 'Club Cienciano') {
      abrev = 'CIE'
    }
    if (name === 'FC Carlos Stein') {
      abrev = 'CES'
    }
    if (name === 'Deportivo Municipal') {
      abrev = 'MUN'
    }
    if (name === 'César Vallejo') {
      abrev = 'UCV'
    }
    if (name === 'Carlos A. Mannucci') {
      abrev = 'MAN'
    }
    if (name === 'Ayacucho FC') {
      abrev = 'AFC'
    }
    if (name === 'Binacional') {
      abrev = 'BIN'
    }
    if (name === 'Real Garcilaso') {
      abrev = 'GAR'
    }
    if (name === 'Sport Huancayo') {
      abrev = 'HUA'
    }
    if (name === 'Academia Cantolao') {
      abrev = 'CAN'
    }
    if (name === 'Alianza Atlético') {
      abrev = 'ATL'
    }
    if (name === 'Alianza Universidad') {
      abrev = 'AUN'
    }
    if (name === 'Universidad San Martín') {
      abrev = 'USM'
    }
    if (name === 'UTC') {
      abrev = 'UTC'
    }
    return abrev
  }

  return (
    <>
      {customFields?.fullMode ? (
        <div className="polla-positions">
          <div className="polla-positions__title-full">
            <div className="polla-positions__title-box">
              {customFields?.tableFase1LinkUrl ? (
                <div className="polla-positions__button-fase-on">
                  <a href={customFields?.tableFase1LinkUrl}>FASE UNO</a>
                </div>
              ) : null}
              {customFields?.tableFase2LinkUrl ? (
                <div className="polla-positions__button-fase-off">
                  <a href={customFields?.tableFase2LinkUrl}>FASE DOS</a>
                </div>
              ) : null}
            </div>
          </div>
          {isLoading ? (
            <div
              className="polla-score__spinner"
              style={{
                fontSize: '3px',
                marginTop: '30px',
                marginBottom: '30px',
              }}
            />
          ) : null}
          {isError ? (
            <div
              style={{
                marginTop: '30px',
                marginBottom: '30px',
                textAlign: 'center',
                color: '#999',
                fontSize: '13px',
              }}>
              La data se está actualizando
            </div>
          ) : null}
          {list?.map((group) => (
            <div className="polla-positions__group-full" key={group.name}>
              <div className="polla-positions__group-left-full">
                <div className="polla-positions__group-left-full__title">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {parsedCustomGroupName[group.name] || group.name}
                </div>
                {group?.teams?.map((team, i) => (
                  <ul
                    className="polla-positions__group-left-full__teams"
                    key={team.name}>
                    <li>
                      <span className="polla-positions__group-left-full__teams-number">
                        {i + 1}
                      </span>
                      <span className="polla-positions__group-left-full__teams-flag">
                        <img
                          // src={`${COUNTRIES_ASSETS_PATH}${slugify(
                          //   team?.name
                          // )}.svg`}
                          src={`https://resultadosopta.minoticia.pe${team?.local_image}`}
                          alt="flag"
                        />
                      </span>
                      <span className="polla-positions__group-left-full__teams-name">
                        {isMobile ? diccionario(team?.name) : team?.name}
                      </span>
                    </li>
                  </ul>
                ))}
              </div>
              <div className="polla-positions__group-right-full">
                <ul className="polla-positions__group-right-full__title">
                  <li className="polla-positions__group-right-full__title__li">
                    PJ
                  </li>
                  <li className="polla-positions__group-right-full__title__li">
                    PG
                  </li>
                  <li className="polla-positions__group-right-full__title__li">
                    PE
                  </li>
                  <li className="polla-positions__group-right-full__title__li">
                    PP
                  </li>
                  <li className="polla-positions__group-right-full__title__li">
                    GF
                  </li>
                  <li className="polla-positions__group-right-full__title__li">
                    GC
                  </li>
                  <li className="polla-positions__group-right-full__title__li">
                    DIF
                  </li>
                  <li className="polla-positions__group-right-full__title__li">
                    Pts.
                  </li>
                </ul>
                {group.teams.map((team) => (
                  <ul
                    className="polla-positions__group-right-full__points"
                    key={team.name}>
                    <li>{team?.played}</li>
                    <li>{team?.won}</li>
                    <li>{team?.drawn}</li>
                    <li>{team?.lost}</li>
                    <li>{team?.goals_for}</li>
                    <li>{team?.goals_against}</li>
                    <li>{team?.goaldifference}</li>
                    <li>{team?.points}</li>
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="polla-positions">
          <div className="polla-positions__title">
            <div className="polla-positions__title-left">LIGA 1</div>
            <div className="polla-positions__title-right">POSICIONES</div>
          </div>
          {isLoading ? (
            <div
              className="polla-score__spinner"
              style={{
                fontSize: '3px',
                marginTop: '30px',
                marginBottom: '30px',
              }}
            />
          ) : null}
          {isError ? (
            <div
              style={{
                marginTop: '30px',
                marginBottom: '30px',
                textAlign: 'center',
                color: '#999',
                fontSize: '13px',
              }}>
              La data se está actualizando
            </div>
          ) : null}
          {list?.map((group) => (
            <div className="polla-positions__group" key={group.name}>
              <div className="polla-positions__group-left">
                <div className="polla-positions__group-left__title">
                  {parsedCustomGroupName[group.name] || group.name}
                </div>
                {group?.teams?.map((team, i) => (
                  <ul
                    className="polla-positions__group-left__teams"
                    key={team.name}>
                    <li>
                      <span className="polla-positions__group-left__teams-number">
                        {i + 1}
                      </span>
                      <span className="polla-positions__group-left__teams-flag">
                        <img
                          // src={`${COUNTRIES_ASSETS_PATH}${slugify(
                          //   team?.name
                          // )}.svg`}
                          src={`https://resultadosopta.minoticia.pe${team?.local_image}`}
                          alt="flag"
                        />
                      </span>
                      <span className="polla-positions__group-left__teams-name">
                        {team?.name}
                      </span>
                    </li>
                  </ul>
                ))}
              </div>
              <div className="polla-positions__group-right">
                <ul className="polla-positions__group-right__title">
                  <li className="polla-positions__group-right__title__li">
                    Pts.
                  </li>
                  <li className="polla-positions__group-right__title__li">
                    PJ
                  </li>
                  <li className="polla-positions__group-right__title__li">
                    PG
                  </li>
                  <li className="polla-positions__group-right__title__li">
                    PE
                  </li>
                  <li className="polla-positions__group-right__title__li">
                    PP
                  </li>
                </ul>
                {group.teams.map((team) => (
                  <ul
                    className="polla-positions__group-right__points"
                    key={team.name}>
                    <li className="polla-positions__group-right__title__li">
                      {team?.points}
                    </li>
                    <li className="polla-positions__group-right__title__li">
                      {team?.played}
                    </li>
                    <li className="polla-positions__group-right__title__li">
                      {team?.won}
                    </li>
                    <li className="polla-positions__group-right__title__li">
                      {team?.drawn}
                    </li>
                    <li className="polla-positions__group-right__title__li">
                      {team?.lost}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          ))}
          {customFields?.tableLinkUrl ? (
            <div className="polla-positions__button">
              <a href={customFields?.tableLinkUrl}>VER TABLA COMPLETA</a>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

PollaPositionsTable.label = 'La Polla - Tabla de Posiciones'
PollaPositionsTable.propTypes = {
  customFields: PropTypes.shape({
    serviceEndPoint: PropTypes.string.tag({
      name: 'URL del servicio',
    }),
    // serviceEndPoint2: PropTypes.string.tag({
    //   name: 'URL del servicio extra',
    // }),

    tableLinkUrl: PropTypes.string.tag({
      name: 'Enlace del link "VER TABLA COMPLETA"',
    }),
    tableFase1LinkUrl: PropTypes.string.tag({
      name: 'Enlace del link "VER TABLA FASE 1"',
    }),
    tableFase2LinkUrl: PropTypes.string.tag({
      name: 'Enlace del link "VER TABLA FASE 2"',
    }),
    customGroupName: PropTypes.json.tag({
      name: 'JSON de nombre de grupos',
    }),
    fullMode: PropTypes.bool.tag({
      name: 'Habilitar modo full',
    }),
  }),
}

export default PollaPositionsTable
