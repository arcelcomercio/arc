/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import React from 'react'

const classes = {
  container: 'presidential-election-graph',
  title: 'presidential-election-graph__title',
  list: 'presidential-election-graph__list',
  item: 'presidential-election-graph__item',
  avatar: 'presidential-election-graph__avatar',
  bar: 'presidential-election-graph__bar',
  boxBar: 'presidential-election-graph__box-bar',
  boxInfo: 'presidential-election-graph__box-info',
  name: 'presidential-election-graph__name',
  votes: 'presidential-election-graph__votes',
  description: 'presidential-election-graph__description',
}

const getFormatedNumberResult = (x) =>
  x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''

const getPartidoDataFromId = (id = '', partidos = []) =>
  partidos.filter(({ id: itemId }) => itemId === id)[0] || {}

const roundTwoDecimals = (num) => Math.round(num * 100) / 100

const PresidentialElectionChildGraph = ({
  partidos,
  page,
  filterData = [],
  showTitle = true,
  filters,
  description = '',
  template,
}) => {
  const printBar = (value, color) => {
    const colorBar = value <= 0 ? 'transparent' : color
    return {
      backgroundColor: colorBar,
      width: `${value}%`,
    }
  }
  return (
    <section className={classes.container}>
      {showTitle && (
        <>
          {template === 'second' ? (
            <div className={classes.title}>
              <span>Votos</span>
              <span style={{ fontWeight: '500' }}>|</span>
              <span style={{ fontWeight: '500' }}>Emitidos - Válidos</span>
            </div>
          ) : (
            <div className={classes.title}>
              {filters?.subFilter !== 'porcentaje' && <>Votos {' | '}</>}{' '}
              <span>Porcentaje</span>
            </div>
          )}
        </>
      )}
      <ul className={classes.list}>
        {filterData?.map(
          (
            {
              id_partido,
              cantidad_votos,
              porcentaje_votos,
              candidato,
              emitidos,
              validos,
            },
            i
          ) => {
            const idPartido =
              filters?.group === 'todos_los_partidos'
                ? filters?.filter
                : id_partido

            const {
              candidato_pres,
              color,
              logo,
              nombre,
            } = getPartidoDataFromId(idPartido, partidos)

            let itemData = {
              result: getFormatedNumberResult(cantidad_votos),
              percentage: porcentaje_votos,
              name: candidato_pres || nombre,
            }

            if (page === 'congresal' || page === 'parlamento-andino') {
              itemData.name = candidato || nombre
            }
            if (filters?.subFilter === 'porcentaje') {
              itemData = {
                result: `${roundTwoDecimals(porcentaje_votos * 100)}%`,
                percentage: porcentaje_votos,
                name: nombre,
              }
            }

            return template === 'second' ? (
              <li
                key={`${id_partido}-${cantidad_votos}-${i}`}
                className={classes.item}>
                {logo && filters?.group !== 'todos_los_partidos' && (
                  <img
                    src={logo}
                    alt="Logo del partido"
                    className={classes.avatar}
                  />
                )}
                <div className={classes.boxInfo}>
                  <div className={classes.boxBar}>
                    <span
                      className={classes.bar}
                      data-value={`${roundTwoDecimals(emitidos * 100)}%`}
                      style={printBar(roundTwoDecimals(emitidos * 100), color)}
                    />
                    <span className={classes.votes}>
                      {getFormatedNumberResult(cantidad_votos)}
                      {filters?.subFilter !== 'porcentaje' && (
                        <>
                          {' | '}
                          <span>
                            {`${roundTwoDecimals(emitidos * 100)}%`} -{' '}
                            {validos ? (
                              `${roundTwoDecimals(validos * 100)}%`
                            ) : (
                              <div
                                style={{
                                  width: '38px',
                                  height: '2px',
                                  border: '1px solid #707070',
                                  display: 'inline-block',
                                  verticalAlign: 'middle',
                                  margin: '0 0 5px 2px',
                                }}
                              />
                            )}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className={classes.name}>{itemData.name}</div>
                </div>
              </li>
            ) : (
              <li
                key={`${id_partido}-${cantidad_votos}-${i}`}
                className={classes.item}>
                {logo && filters?.group !== 'todos_los_partidos' && (
                  <img
                    src={logo}
                    alt="Logo del partido"
                    className={classes.avatar}
                  />
                )}
                <div className={classes.boxInfo}>
                  <div className={classes.boxBar}>
                    <span
                      className={classes.bar}
                      data-value={`${roundTwoDecimals(
                        itemData.percentage * 100
                      )}%`}
                      style={printBar(
                        roundTwoDecimals(itemData.percentage * 100),
                        color
                      )}
                    />
                    <span className={classes.votes}>
                      {itemData.result}
                      {filters?.subFilter !== 'porcentaje' && (
                        <>
                          {' | '}
                          <span>{`${roundTwoDecimals(
                            itemData.percentage * 100
                          )}%`}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className={classes.name}>{itemData.name}</div>
                </div>
              </li>
            )
          }
        )}
      </ul>
      {description !== '' && (
        <div className={classes.description}>{description}</div>
      )}
    </section>
  )
}

export default PresidentialElectionChildGraph
