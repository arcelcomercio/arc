import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const clasess = {
  opinion: 'opiniontrome',
  head: 'opiniontrome__head',
  title: 'opiniontrome__title',
  body: 'opiniontrome__body',
  item: 'opiniontrome__item',
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
          <div className={clasess.item} >
            <h2>titulo</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Opinion
