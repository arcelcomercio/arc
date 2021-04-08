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
  filterData,
  partidos,
  showTitle = true,
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
        {filterData.map(({ id_partido, cantidad_votos, porcentaje_votos }) => {
          const { candidato_pres, color, logo, nombre } = getPartidoDataFromId(
            id_partido,
            partidos
          )
          return (
            <li key={id_partido} className={classes.item}>
              {logo && (
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
                    data-value={`${porcentaje_votos * 100}%`}
                    style={printBar(porcentaje_votos * 100, color)}></span>
                  <span className={classes.votes}>
                    {getFormatedNumberResult(cantidad_votos)}
                  </span>
                </div>
                <div className={classes.name}>{candidato_pres || nombre}</div>
              </div>
            </li>
          )
        })}
      </ul>
      {description !== '' && (
        <div className={classes.description}>{description}</div>
      )}
    </section>
  )
}

export default PresidentialElectionChildGraph
