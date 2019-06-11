import React from 'react'
import Item from './item'
import ItemShare from './item-share'

const classes = {
  resultgraphic: 'survey-result__graphic table',
  resulttitle: 'survey-result__title text-center font-xbold',
  resultcount: 'survey-result__count font-bold',
  poolitems: 'survey-result__list scroll-vertical-auto',
}

const SurveytChildViewResul = props => {
  const { choices, sharelinks: { facebook = '', twitter = '' } = {} } = props
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
        <ItemShare socialnetwork="F" url={facebook} />
        <ItemShare socialnetwork="T" url={twitter} />
      </ul>
    </div>
  )
}

export default SurveytChildViewResul
