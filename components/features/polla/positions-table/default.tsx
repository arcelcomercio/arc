/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

const DEFAULT_ENDPOINT =
  'https://cdna-resultadosopta.minoticia.pe/api-soccer/statistics/leagues/'

const UUID_COMPETITION = '45db8orh1qttbsqq9hqapmbit'

interface Props {
  customFields?: {
    serviceEndPoint?: string
  }
}

const PollaPositionsTable: FC<Props> = (props) => {
  // eslint-disable-next-line no-console
  const [list, setList] = React.useState<any[]>([])

  const { customFields: { serviceEndPoint } = {} } = props

  React.useEffect(() => {
    fetch(
      `${serviceEndPoint || DEFAULT_ENDPOINT}/${UUID_COMPETITION}/positions`
    )
      .then((res) => res.json())
      .then((res) => {
        setList(res)
      })
  }, [])

  return (
    <>
      <div className="polla-positions">
        <div className="polla-positions__title">
          <div className="polla-positions__title-left">COPA AMÉRICA 2021</div>
          <div className="polla-positions__title-right">POSICIONES</div>
        </div>
        {list.map((group) => (
          <div className="polla-positions__group">
            <div className="polla-positions__group-left">
              <div className="polla-positions__group-left__title">
                Grupo {group.name}
              </div>
              {group.map((team, i) => (
                <ul className="polla-positions__group-left__teams">
                  <li>
                    <span className="polla-positions__group-left__teams-number">
                      {i + 1}
                    </span>
                    <span className="polla-positions__group-left__teams-flag">
                      <img src="http://i.imgur.com/oSlQ5BZ.png" alt="flag" />
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
              {group.map((team) => (
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
        <div className="polla-positions__button">
          <button>VER TABLA COMPLETA</button>
        </div>
      </div>
    </>
  )
}

PollaPositionsTable.label = 'La Polla - Tabla de Posiciones'
PollaPositionsTable.propTypes = {
  customFields: PropTypes.shape({
    serviceEndPoint: PropTypes.string.tag({
      name: 'URL del servicio',
      description:
        'Por defecto la URL es https://cdna-resultadosopta.minoticia.pe/api-soccer/statistics/leagues/',
    }),
  }),
}

export default PollaPositionsTable
