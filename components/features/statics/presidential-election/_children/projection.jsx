/* eslint-disable camelcase */
import * as React from 'react'

const getPartidoDataFromId = (id = '', partidos = []) =>
  partidos.filter(({ id: itemId }) => itemId === id)[0] || {}

const roundTwoDecimals = (num) => Math.round(num * 100) / 100

const Projection = ({ filterData = [], partidos = [] }) => {
  const resizeHeight = (num) => `${num * 7 + 45}px`

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
                {`${roundTwoDecimals(porcentaje * 100)}%`}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Projection
