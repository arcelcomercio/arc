import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

const classes={
    container:'container',
    title:'container__title'
}
// eslint-disable-next-line react/require-render-return
@Consumer
class Default extends Component {
  constructor(props) {
    super(props)

    
    console.log('adadadadada')
  }

  render() {
    return (
      <div className="content-grid-base col-3">
        <div className={classes.container}>
            <h1 className={classes.title}>Economia</h1>
        </div>
        <div>Cuerpo</div>
      </div>
    )
  }
}

export default Default
