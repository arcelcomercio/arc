import * as React from 'react'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import CovidChildGraph from '../graph'

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/covid/_infected-average.scss`
 */

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
// const StaticsCovidInfectedAverage = ({
//   data_process: infectedDate = [],
//   dist_prov: distProv = '',
//   desde_marzo: desdeMarzo,
//   embed_chart: embedChart,
// }) => {
const StaticsCovidInfectedAverage = ({ region, distrito }) => {
  const { globalContent = {} } = useAppContext()
  const { ultima_fecha_con_data: ultimaFecha } = globalContent

  const { data: dataSheet = [] } =
    useContent({
      source: 'get-spreadsheet-covid',
      query: {
        title:
          `Contagiados ${ 
          region.charAt(0).toUpperCase() 
          }${region.slice(1) 
          } API`,
      },
    }) || {}

  let dataEl
  dataSheet.map(el => {
    if (el.slug === distrito) dataEl = el
    return el.slug
  })

  const {
    data_process: infectedDate = [],
    dist_prov: distProv = '',
    desde_marzo: desdeMarzo,
    ultimos_contagios: ultimosContagios,
    embed_chart: embedChart,
  } = dataEl

  let maxValue = 0
  const data = []
  for (let i = 0; i < infectedDate.length; i++) {
    if (maxValue < infectedDate[i].value) {
      maxValue = infectedDate[i].value
    }
    if (infectedDate[i].date !== null) data[i] = infectedDate[i]
  }

  const params = {
    dataProcess: infectedDate,
    title: distProv,
    subtitle: 'Promedio de contagios',
    valOne: ultimosContagios,
    valTwo: desdeMarzo,
    titleOne: 'contagiados el día de hoy',
    titleTwo: 'desde Marzo del 2020',
    date: ultimaFecha,
    maxValue,
    embedChart,
    closeUrl: `/covid-19/contagiados/${region}`,
  }

  return <CovidChildGraph {...params} />
}

export default StaticsCovidInfectedAverage
