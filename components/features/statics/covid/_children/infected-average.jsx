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
  embed: 'average__embed',
}

/**
 * @param {object} props
 * @param {object} props.data_process
 * @param {string} props.dist_prov
 * @param {string} props.desde_marzo
 * @param {string} props.customFields
 * @param {string} props.embed_chart
 *
 * @todo creo que las funciones se pueden sacar en un archivo aparte
 * para dejar este mas limpio
 */
const StaticsCovidInfectedAverage = ({
  data_process: infectedDate = [],
  dist_prov: distProv = '',
  desde_marzo: desdeMarzo,
  embed_chart: embedChart,
}) => {
  const [barra, setSelectBarra] = React.useState(true)
  const [fiebre, setSelectFiebre] = React.useState(false)

  let maxValue = 0
  const data = []
  for (let i = 0; i < infectedDate.length; i++) {
    if (maxValue < infectedDate[i].value) {
      maxValue = infectedDate[i].value
    }
    if (infectedDate[i].date !== null) data[i] = infectedDate[i]
  }

  const dataValue = infected => {
    return Math.round((infected * 100) / maxValue)
  }

  const handleAnswerBarra = () => {
    setSelectBarra(true)
    setSelectFiebre(false)
  }
  const handleAnswerFiebre = () => {
    setSelectFiebre(true)
    setSelectBarra(false)
  }

  const handleBarra = value => {
    const color = value <= 0 ? 'transparent' : '#F70000D6'
    return {
      'background-color': color,
      width: `${value}%`,
    }
  }
  const handleDate = date => {
    const ListMonth = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]
    const mes = date.split('-')
    const nameMonth = ListMonth[parseInt(mes[1], 10) - 1]
    return `${nameMonth} ${mes[0]}`
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
            className={`${classes.verBar} ${barra ? 'active' : ''}`}
            value="barra"
            onClick={handleAnswerBarra}>
            Ver barras
          </button>
          <button
            type="button"
            value="fiebre"
            className={`${classes.verBar} ${fiebre ? 'active' : ''}`}
            onClick={handleAnswerFiebre}>
            Ver fiebre
          </button>
        </div>
        {barra && (
          <ul>
            {data.map(({ date = '', value = '' }) => (
              <div
                style={{
                  display: 'flex',
                  'justify-content': 'space-between',
                }}>
                <span className={classes.barBackground}>
                  <li
                    className={classes.bars}
                    data-value={dataValue(value)}
                    style={handleBarra(dataValue(value))}>
                    <div style={{ width: '100px' }}>{handleDate(date)}</div>
                  </li>
                </span>
                <span className={classes.number}>{value}</span>
              </div>
            ))}
          </ul>
        )}
        {fiebre && (
          <div className={classes.embed}>
            <embed
              title="Embed"
              src={embedChart}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen="true"
              id="embed"
              height="320"
              style={{ width: '100%' }}
              className={classes.iframeVideo}
            />
          </div>
        )}
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
