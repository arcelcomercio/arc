/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import ResultGraph from './_children/graph'
import ResultPaginator from './_children/paginator'
import NavigationMenu from './_children/navigation'
import OptionCongresal from './_children/option-congresal'

const PresidentialElection = props => {
  const [filters, setFilters] = React.useState({
    group: 'general',
    filter: null,
    subFilter: null,
  })

  const { requestUri } = useAppContext()

  const { customFields } = props

  const fullPath = requestUri.split('?')[0]
  const pathArr = fullPath.split('/').filter(el => el !== '')

  /**
   * @type {'presidencial' | 'congresal' | 'parlamento_andino'}
   */
  const page = !pathArr[1] ? 'presidencial' : pathArr[1]

  const pageData =
    useContent(
      customFields[page]
        ? {
            source: 'get-data-from-json-file',
            query: {
              json_file: customFields[page],
            },
          }
        : {}
    ) || {}

  const { partidos = [] } =
    useContent(
      customFields.partidosJson
        ? {
            source: 'get-data-from-json-file',
            query: {
              json_file: customFields.partidosJson,
            },
          }
        : {}
    ) || {}

  const changeFilters = newFilters => {
    setFilters(newFilters)
  }

  const getFilterData = () => {
    let filterData = []
    if (filters.group && !filters.filter && !filters.subFilter) {
      filterData = pageData?.[filters.group] || []
    } else if (filters.group && filters.filter && !filters.subFilter) {
      const dataByGroup = pageData?.[filters.group] || []

      filterData = dataByGroup.filter(
        ({ filtro_nombre }) => filtro_nombre === filters.filter
      )[0]?.filtro_listado
    }
    return filterData
  }
  console.log(
    pageData,
    partidos,
    filters,
    'currentData>>>>>>..>',
    getFilterData()
  )

  const params = {
    data: [
      {
        color: 'red',
        name: 'Lescano',
        votes: '50',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/02-10-feos-logotipos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: '#f0f',
        name: 'Señora k',
        votes: '40',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/02-10-feos-logotipos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: 'blue',
        name: 'Rafael',
        votes: '45',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/02-10-feos-logotipos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: 'green',
        name: 'Veronica mendoza',
        votes: '30',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/02-10-feos-logotipos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: 'yellow',
        name: 'Ollanta Humala',
        votes: '5',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/01-10-feos-logos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: '#000',
        name: 'En blanco / viciado',
        votes: '2',
        urlImg: null,
      },
    ],
    description:
      'ante ac ultrices dignissim, arcu libero pretium quam, vit libero pretium quam, vitae placerat',
    maxVote: 50,
    showTitle: true,
  }
  return (
    <div>
      <NavigationMenu pageData={pageData} changeFilters={changeFilters} />
      <OptionCongresal />
      <ResultPaginator urlPrev="1/" urlNext="2/" title="Acción Popular" />
      <ResultGraph {...params} />
    </div>
  )
}

PresidentialElection.label = 'Elecciones presidenciales y congresales'

PresidentialElection.propTypes = {
  customFields: PropTypes.shape({
    partidosJson: PropTypes.string.tag({
      name: 'Url del JSON de partidos políticos',
    }),
    presidencial: PropTypes.string.tag({
      name: 'Url del JSON para resultados presidenciales',
    }),
    congresal: PropTypes.string.tag({
      name: 'Url del JSON para resultados congresales',
    }),
    parlamento_andino: PropTypes.string.tag({
      name: 'Url del JSON para resultados del parlamento andino',
    }),
  }),
}

export default PresidentialElection
