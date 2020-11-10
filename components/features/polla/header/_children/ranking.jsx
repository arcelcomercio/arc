/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Ranking = props => {
  const { usuario: { nombre, puntaje, puesto } = {} } = props
  return (
    <div id="panel-ranking" className="ui-panel ranking-inner">
      <p>
        Puesto<span>{puesto}</span>
      </p>
      <p>
        Nombre<span>{nombre}</span>
      </p>
      <p>
        Puntaje<strong>{puntaje}</strong>
      </p>
      {/* <a href="#" className="btn_link">
        Ver más
      </a> */}
    </div>
  )
}

export default Ranking
