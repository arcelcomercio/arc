import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const clasess = {
  opinion: 'opiniontrome',
  head: 'opiniontrome__head',
  title: 'opiniontrome__title',
  body: 'opiniontrome__body',
  item: 'opiniontrome__item',
  seccion: 'opiniontrome__seccion',
  icono: 'opiniontrome__icono',
  nombreSeccion: 'opiniontrome__nombreseccion',
}

const OpinionItem = () => {
  return (
    <div className={clasess.item}>
      <div className={clasess.seccion}>
        <h3 className={clasess.nombreSeccion}>pico tv</h3>
        <h2>‘Saltaditos’ de el Búho </h2>
      </div>
      <div className={clasess.icono}>
        <img
          data-type="src"
          src="https://assets.trome.pe/img/columnas/pico_tv.png"
          data-src="https://assets.trome.pe/img/columnas/pico_tv.png"
          alt="Pico TV"
        />
      </div>
    </div>
  )
}
@Consumer
class Opinion extends Component {
  render() {
    return (
      <div className={clasess.opinion}>
        <div className={clasess.head}>
          <h3 className={clasess.title}>OPINION</h3>
        </div>
        <div className={clasess.body}>
          <OpinionItem />
          <OpinionItem />
          <OpinionItem />
          <OpinionItem />
        </div>
      </div>
    )
  }
}

export default Opinion
