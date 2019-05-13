import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import Item from './item'
import ItemShare from './item-share'
import ItemInput from './item-input'

const classes = {
  InternalSurvey: 'internal-survey',
  detail: 'internal-survey__detail',
  result: 'internal-survey__result',
  date: 'internal-survey__date',
  title: 'internal-survey__title',
  buttons: 'internal-survey__buttons',
  buttonpool: 'internal-survey__button-pool',
  viewresult: 'internal-survey__view-result',
  resultgraphic: 'internal-survey__result-graphic',
  resulttitle: 'internal-survey__result-title',
  resultcount: 'internal-survey__result-count',
  poolitems: 'internal-survey__result-pool-items',
  share: 'internal-survey__result-share',
}
@Consumer
class SurveyInternalChildSurvey extends Component {
  render() {
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
              <a href="#asd" className={classes.viewresult}>
                Ver Resultados
              </a>
            </div>
          </form>
        </div>
        <div className={classes.result}>
          <div className={classes.resultgraphic}>
            <h4 className={classes.resulttitle}>Resultados</h4>
            <p className={classes.resultcount}>sobre un total de 3410 votos.</p>
            <ul className={classes.poolitems}>
              <Item result="Si" percent="50" />
              <Item result="No" percent="50" top={false} />
            </ul>
            <ul className={classes.share}>
              <ItemShare socialnetwork="F" url="facebook.com" />
              <ItemShare socialnetwork="T" url="twitter.com" />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SurveyInternalChildSurvey
