import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import ItemInput from './item-input'
import ViewResult from './view-result'

const classes = {
  InternalSurvey: 'internal-survey',
  detail: 'internal-survey__detail',
  result: 'internal-survey__result',
  date: 'internal-survey__date',
  title: 'internal-survey__title',
  buttons: 'internal-survey__buttons',
  buttonpool: 'internal-survey__button-pool',
  viewresult: 'internal-survey__view-result',
  share: 'internal-survey__result-share',
}
@Consumer
class SurveyInternalChildSurvey extends Component {

  constructor(){
    super()

    this.state={
      viewResult:false,
    }

  }
  
  viewResult = () =>{
    
    this.setState({
      viewResult:true
    })
  }

  render() {
    const {viewResult} = this.state

    return (
      <div className={classes.InternalSurvey}>
        <div className={classes.detail}>
          <time className={classes.date}>Martes 7 de mayo, 2019</time>
          <h1 className={classes.title}>
            ¿Está de acuerdo con que la Fiscalía investigue al congresista
            Richard Acuña?
          </h1>
          <form action="">
            <ul>
              <ItemInput value="si" index="a2" />
              <ItemInput value="no" index="a1" />
            </ul>
            <div className={classes.buttons}>
              <button type="button" className={classes.buttonpool}>
                Votar
              </button>
              <a href="#asd" className={classes.viewresult} onClick={this.viewResult}>
                Ver Resultados
              </a>
            </div>
          </form>
        </div>
        <div className={classes.result}>
          {
            viewResult && <ViewResult />
          }
        </div>
      </div>
    )
  }
}

export default SurveyInternalChildSurvey
