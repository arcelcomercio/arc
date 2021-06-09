/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { slugify } from '../../../utilities/parse/slugify'
import { GroupData } from './_utlis/types'

// const DEFAULT_ENDPOINT =
//   'https://cdna-resultadosopta.minoticia.pe/api-soccer/statistics/leagues/'

// const UUID_COMPETITION = '45db8orh1qttbsqq9hqapmbit'

const COUNTRIES_ASSETS_PATH =
  'https://cdna.depor.com/resources/dist/depor/images-polla/paises/'

interface Props {
  customFields?: {
    serviceEndPoint?: string
    tableLinkUrl?: string
  }
}

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

  return (
    <>
      <div className="polla-positions">
        <div className="polla-positions__title">
          <div className="polla-positions__title-left">COPA AMÉRICA 2021</div>
          <div className="polla-positions__title-right">POSICIONES</div>
        </div>
        {isLoading ? (
          <div
            className="polla-score__spinner"
            style={{ fontSize: '3px', marginTop: '30px', marginBottom: '30px' }}
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
          <div className="polla-positions__group">
            <div className="polla-positions__group-left">
              <div className="polla-positions__group-left__title">
                Grupo {group.name}
              </div>
              {group?.teams?.map((team, i) => (
                <ul className="polla-positions__group-left__teams">
                  <li>
                    <span className="polla-positions__group-left__teams-number">
                      {i + 1}
                    </span>
                    <span className="polla-positions__group-left__teams-flag">
                      <img
                        src={`${COUNTRIES_ASSETS_PATH}${slugify(
                          team?.name
                        )}.svg`}
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
                <li>Pts.</li>
                <li>PJ</li>
                <li>PG</li>
                <li>PE</li>
                <li>PP</li>
              </ul>
              {group.teams.map((team) => (
                <ul className="polla-positions__group-right__points">
                  <li>{team?.points}</li>
                  <li>{team?.played}</li>
                  <li>{team?.won}</li>
                  <li>{team?.drawn}</li>
                  <li>{team?.lost}</li>
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
    </>
  )
}

PollaPositionsTable.label = 'La Polla - Tabla de Posiciones'
PollaPositionsTable.propTypes = {
  customFields: PropTypes.shape({
    serviceEndPoint: PropTypes.string.tag({
      name: 'URL del servicio',
    }),
    tableLinkUrl: PropTypes.string.tag({
      name: 'Enlace del link "VER TABLA COMPLETA"',
    }),
  }),
}

export default PollaPositionsTable
