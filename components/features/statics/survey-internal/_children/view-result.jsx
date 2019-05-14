import React from 'react'
import Item from './item'
import ItemShare from './item-share'

const classes = {
  resultgraphic: 'internal-survey__result-graphic',
  resulttitle: 'internal-survey__result-title',
  resultcount: 'internal-survey__result-count',
  poolitems: 'internal-survey__result-pool-items',
}

const SurveytChildViewResul = props => {
  const { choices } = props
  const values = choices.map(el => el.votes)
  const total = values.reduce((acc, curr) => acc + curr)
  const maxValue = values.indexOf(Math.max(...values))

  return (
    <div className={classes.resultgraphic}>
      <h4 className={classes.resulttitle}>Resultados</h4>
      <p className={classes.resultcount}>sobre un total de {total} votos.</p>
      <ul className={classes.poolitems}>
        {choices &&
          choices.map((el, i) => {
            const percentage = (el.votes * 100) / total
            return (
              <Item
                key={el.option}
                result={el.option}
                percent={percentage.toFixed(2)}
                max={i === maxValue || false}
              />
            )
          })}
      </ul>
      <ul className={classes.share}>
        <ItemShare socialnetwork="F" url="facebook.com" />
        <ItemShare socialnetwork="T" url="twitter.com" />
      </ul>
    </div>
  )
}

export default SurveytChildViewResul
