import * as React from 'react'

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/covid/_infected-average.scss`
 */
const classes = {
  average: 'average__grafico-barras',
  number: 'average__number',
  bars: 'average__bars',
  barsPercentLeft: 'average__bars average__bars--percent-left',
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
const CovidChildGraph = ({
  dataProcess = [],
  title = '',
  subtitle = '',
  valOne = 0,
  valTwo = 0,
  titleOne = '',
  titleTwo = '',
  date = '',
  maxValue = 0,
  embedChart,
  closeUrl = '/covid-19/mas-informacion/',
  colorBar = '#F70000D6',
}) => {
  const [barra, setSelectBarra] = React.useState(true)
  const [fiebre, setSelectFiebre] = React.useState(false)

  const dataValue = (infected) => {
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

  const handleBarra = (value) => {
    const color = value <= 0 ? 'transparent' : colorBar
    return {
      'background-color': color,
      width: `${value}%`,
    }
  }

  const handleDate = (dateTitle) => {
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
    const mes = dateTitle.split('-')
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
          <a href={closeUrl}>
            <svg width="13.979" height="13.979" viewBox="0 0 13.979 13.979">
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
        <h1 className={classes.title}>{title}</h1>
        {subtitle && <h2 className={classes.subTitle}>{subtitle}</h2>}
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
            {dataProcess.map(({ title: itemTitle = '', value = '' }, index) => {
              const randomKey = Math.floor(Math.random() * 100 * index)
              const percentValue = dataValue(value)
              const classBar =
                percentValue >= 85 ? classes.barsPercentLeft : classes.bars
              return (
                <div
                  key={randomKey}
                  style={{
                    display: 'flex',
                    'justify-content': 'space-between',
                  }}>
                  <span className={classes.barBackground}>
                    <li
                      className={classBar}
                      data-value={`${percentValue}%`}
                      style={handleBarra(percentValue)}>
                      <div style={{ width: '100px' }}>
                        {itemTitle ? handleDate(itemTitle) : itemTitle}
                      </div>
                    </li>
                  </span>
                  <span className={classes.number}>{value}</span>
                </div>
              )
            })}
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
        <div className={classes.date}>{date}</div>
        <div className={classes.grupCount}>
          <div>
            <strong>{valOne}</strong>
            <p>{titleOne}</p>
          </div>
          <div>
            <strong>{valTwo}</strong>
            <p>{titleTwo}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default CovidChildGraph
