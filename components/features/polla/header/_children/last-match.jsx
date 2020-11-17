/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const LastMatch = props => {
  const {
    MEDIA_BASE,
    usuario: {
      ultimoPartido: {
        equipo1 = '-',
        equipo1Bandera = '',
        equipo2 = '-',
        equipo2Bandera = '',
        pronostico = '-',
        resultadoFinal = '-',
        puntos = '-',
        estado,
      } = {},
    } = {},
  } = props
  return (
    <div id="panel-lastgame" className="ui-panel ui-active ranking-inner">
      <div className="flow-match-small">
        <a href="#">
          <div className="match-header">
            <span className="group">Partido</span>
          </div>
          <div className="match-teams-small">
            <span className="team-txt">{equipo1.substring(0, 3)}</span>
            <img src={MEDIA_BASE + equipo1Bandera} alt="" />
            <span className="team-vs">VS</span>
            <img src={MEDIA_BASE + equipo2Bandera} alt="" />
            <span className="team-txt">{equipo2.substring(0, 3)}</span>
          </div>
        </a>
      </div>
      <p>
        Pronostico<strong>{pronostico}</strong>
      </p>
      <p>
        Resultado final<strong>{estado === 3 ? resultadoFinal : '-'}</strong>
      </p>
      <p>
        Punto<strong>{estado === 3 ? puntos : '-'}</strong>
      </p>
      {/* <a href="#" className="btn_link">
        Ver más
      </a> */}
    </div>
  )
}

export default LastMatch
