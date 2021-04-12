/* eslint-disable camelcase */
import * as React from 'react'

const getPartidoDataFromId = (id = '', partidos = []) => {
  return partidos.filter(({ id: itemId }) => itemId === id)[0] || {}
}

const Projection = ({ filterData = [], partidos = [] }) => {
  const resizeHeight = num => {
    const auxNum = num === 0 ? 1 : num
    return `${(5 / auxNum + auxNum) * 2 + 25}px`
  }

  return (
    <>
      <div className="box-projection">
        <div className="box-projection__title">
          Proyección de la composición del congreso
        </div>
        {filterData.map(({ id_partido, porcentaje }, index) => {
          const { nombre, color } = getPartidoDataFromId(id_partido, partidos)
          return (
            <div
              key={nombre}
              className="box-projection__figure"
              style={{
                backgroundColor: color,
                height: resizeHeight(porcentaje * 100),
                zIndex: index * -1,
              }}>
              <span className="box-projection__figure-name">{nombre}</span>
              <span className="box-projection__figure-number">
                {`${porcentaje * 100}%`}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Projection
