import * as React from 'react'

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/covid/_infected-average.scss`
 */
const classes = {
  average: 'average__grafico-barras',
  number: 'average__number',
  bars: 'average__bars',
  title: 'average__title',
  subTitle: 'average__sub-title',
  buttons: 'average__buttons',
  verBar: 'average__ver-bar',
  barBackground: 'average__bar-background',
  date: 'average__date',
  grupCount: 'average__grup-count',
  clese: 'average__close',
}

const StaticsCovidInfectedAverage = (distrito = {}) => {
  const [barra, setSelectBarra] = React.useState(true)
  const [fiebre, setSelectFiebre] = React.useState(false)
  const {
    dist_prov: distProv = '',
    infected_by_date: infectedDate = [],
    desde_marzo: desdeMarzo,
  } = distrito
  let maxValue = 0
  for (let i = 0; i < infectedDate.length; i++) {
    if (maxValue < infectedDate[i].infected) {
      maxValue = infectedDate[i].infected
    }
  }
  const dataValue = infected => {
    return Math.round((infected * 100) / maxValue)
  }

  const handleAnswerBarra = () => {
    // check if the selected handleAnswerBarra is the right one
    setSelectBarra(true)
    setSelectFiebre(false)
  }
  const handleAnswerFiebre = () => {
    // check if the selected handleAnswerBarra is the right one
    setSelectFiebre(true)
    setSelectBarra(false)
  }

  const handleBarra = value => {
    const color = value <= 0 ? 'transparent' : '#F70000D6'
    return {
      'background-color': color,
      width: `${value - 4}%`,
    }
  }
  return (
    <>
      <section className={classes.average}>
        <div
          style={{
            right: '2px',
            'text-align': 'end',
            position: 'relative',
            top: '5px',
          }}>
          <a href="/covid/contagiados/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.979"
              height="13.979"
              viewBox="0 0 13.979 13.979">
              <g transform="translate(-314.287 -136.011)">
                <line
                  style={{ fill: '#fff', stroke: '#707070' }}
                  x2="13.272"
                  y2="13.272"
                  transform="translate(314.64 136.364)"
                />
                <line
                  style={{ fill: '#fff', stroke: '#707070' }}
                  x1="13.272"
                  y2="13.272"
                  transform="translate(314.64 136.364)"
                />
              </g>
            </svg>
          </a>
        </div>
        <h1 className={classes.title}>{distProv}</h1>
        <h2 className={classes.subTitle}>Promedio de contagios</h2>
        <div className={classes.buttons}>
          <button
            type="button"
            className={classes.verBar}
            value="barra"
            onClick={handleAnswerBarra}>
            Ver barras
          </button>
          <button
            type="button"
            value="fiebre"
            className={classes.verBar}
            onClick={handleAnswerFiebre}>
            Ver fiebre
          </button>
        </div>
        {barra && (
          <ul>
            {infectedDate.map(({ date = '', infected = '' }) => (
              <span className={classes.barBackground}>
                <li
                  className={classes.bars}
                  data-value={dataValue(infected)}
                  style={handleBarra(dataValue(infected))}>
                  <div style={{ width: '100px' }}>{date}</div>
                </li>
                <span className={classes.number}>{infected}</span>
              </span>
            ))}
          </ul>
        )}
        {fiebre && <div className="div"> Embed</div>}
        <div className={classes.date}>4 de febrero</div>
        <div className={classes.grupCount}>
          <div>
            <strong>457</strong>
            <p>contagiados el dia de hoy</p>
          </div>
          <div>
            <strong>{desdeMarzo}</strong>
            <p>desde marzo Del 2020</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default StaticsCovidInfectedAverage
