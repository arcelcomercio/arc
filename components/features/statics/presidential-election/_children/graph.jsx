import React from 'react'

const classes = {
  container: 'presidential-election-graph',
  title: 'presidential-election-graph__title',
  list: 'presidential-election-graph__list',
  item: 'presidential-election-graph__item',
  avatar: 'presidential-election-graph__avatar',
  bar: 'presidential-election-graph__bar',
  boxBar: 'presidential-election-graph__box-bar',
  boxInfo: 'presidential-election-graph__box-info',
  name: 'presidential-election-graph__name',
  votes: 'presidential-election-graph__votes',
  description: 'presidential-election-graph__description',
}
const Graph = ({
  data = [],
  showTitle = true,
  description = '',
  maxVote = 0,
}) => {
  const dataValue = (value, limitValue) => {
    return Math.round((value * 100) / limitValue)
  }
  const printBar = (value, color) => {
    const colorBar = value <= 0 ? 'transparent' : color
    return {
      'background-color': colorBar,
      width: `${value}%`,
    }
  }
  return (
    <section className={classes.container}>
      {showTitle && <div className={classes.title}>Cantidad de votos</div>}
      <ul className={classes.list}>
        {data.map(
          ({ votes = 0, color = '', urlImg = null, name = '' }, index) => {
            const randomKey = Math.floor(Math.random() * 100 * index)
            const percentValue = dataValue(votes, maxVote)
            /* const classBar =
            percentValue >= 85 ? classes.barsPercentLeft : classes.bars */
            return (
              <li key={randomKey} className={classes.item}>
                {urlImg && <img src={urlImg} alt="" className={classes.avatar} />}
                <div className={classes.boxInfo}>
                  <div className={classes.boxBar}>
                    <span
                      className={classes.bar}
                      data-value={`${percentValue}%`}
                      style={printBar(percentValue, color)}></span>
                    <span className={classes.votes}>{votes}</span>
                  </div>
                  <div className={classes.name}>{name}</div>
                </div>
              </li>
            )
          }
        )}
      </ul>
      {description !== '' && (
        <div className={classes.description}>{description}</div>
      )}
    </section>
  )
}

export default Graph
