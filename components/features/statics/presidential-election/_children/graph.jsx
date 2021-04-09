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

const getFormatedNumberResult = x => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''
}

const getPartidoDataFromId = (id = '', partidos = []) => {
  return partidos.filter(({ id: itemId }) => itemId === id)[0] || {}
}

const PresidentialElectionChildGraph = ({
  partidos,
  page,
  filterData = [],
  showTitle = true,
  filters,
  description = '',
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
      {showTitle && <div className={classes.title}>Cantidad de votos</div>}
      <ul className={classes.list}>
        {filterData?.map(
          ({
            id_partido,
            cantidad_votos,
            porcentaje_votos,
            candidato,
            porcentaje,
          }) => {
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
              name: candidato_pres,
            }

            if (page === 'congresal' || page === 'parlamento-andino') {
              itemData.name = candidato
            }
            if (filters?.subFilter === 'porcentaje') {
              itemData = {
                result: `${porcentaje * 100}%`,
                percentage: porcentaje,
                name: nombre,
              }
            }

            return (
              <li
                key={`${id_partido}-${cantidad_votos}`}
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
                      data-value={`${itemData.percentage * 100}%`}
                      style={printBar(itemData.percentage * 100, color)}></span>
                    <span className={classes.votes}>{itemData.result}</span>
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
