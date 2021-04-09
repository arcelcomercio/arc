/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import ResultGraph from './_children/graph'
import ResultPaginator from './_children/paginator'
import NavigationMenu from './_children/navigation'
import ResultPages from './_children/pages'
import { slugify } from '../../../utilities/parse/slugify'
import Projection from './_children/projection'
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
   * @type {'presidencial' | 'congresal' | 'parlamento-andino'}
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

  const changeUrl = (filter, group) => {
    window.history.pushState(
      {},
      null,
      `/resultados-elecciones-2021/${page}/${slugify(group)}/${slugify(
        filter
      )}/`
    )
  }

  const changeFilters = newFilters => {
    const { filter, group } = newFilters
    setFilters(newFilters)
    changeUrl(filter, group)
  }

  const getFilterData = () => {
    let filterData = []

    if (page === 'presidencial' || page === 'parlamento-andino') {
      const { group, filter, subFilter } = filters
      if (group && !filter && !subFilter) {
        filterData = pageData?.[group] || []
      } else if (group && filter && !subFilter) {
        const dataByGroup = pageData?.[group] || []

        filterData = dataByGroup.filter(
          ({ filtro_nombre }) => filtro_nombre === filter
        )[0]?.filtro_listado
      }
    } else if (page === 'congresal') {
      const { group } = filters
      if (group === 'general') {
        const { filter = 'valla_electoral' } = filters
        const filterWithDefault = filter || 'valla_electoral'
        filterData = pageData?.[group]?.[filterWithDefault]
      } else if (group === 'todos_los_partidos') {
        const { filter } = filters
        const dataByGroup = pageData?.[group] || []
        if (!filter) {
          changeFilters({ ...filters, filter: dataByGroup[0]?.filtro_nombre })
        }
        filterData = dataByGroup.filter(
          ({ filtro_nombre }) => filtro_nombre === filter
        )[0]?.filtro_listado
      } else {
        const { filter, subFilter = 'congresistas' } = filters
        const subFilterWithDefault = subFilter || 'congresistas'
        const dataByGroup = pageData?.[group] || []
        filterData = dataByGroup.filter(
          ({ filtro_nombre }) => filtro_nombre === filter
        )[0]?.[subFilterWithDefault]
      }
    }

    return filterData || []
  }

  // console.log(
  //   pageData,
  //   partidos,
  //   filters,
  //   'currentData>>>>>>>',
  //   getFilterData()
  // )

  const setNewFilterPosition = direction => {
    const filterByGroup = pageData?.[filters.group] || []
    const { group } = filters

    const cirrentFilterIndex = filterByGroup.findIndex(
      ({ filtro_nombre }) => filtro_nombre === filters.filter
    )
    let newData = null
    if (direction === 'prev') {
      newData = filterByGroup[cirrentFilterIndex - 1]
    } else if (direction === 'next') {
      newData = filterByGroup[cirrentFilterIndex + 1]
    }
    if (newData) {
      setFilters({ ...filters, filter: newData.filtro_nombre })
      changeUrl(newData.filtro_nombre, group)
    }
  }

  return (
    <div>
      <ResultPages page={page} customFields={customFields} />

      {page !== 'parlamento-andino' ? (
        <NavigationMenu
          page={page}
          pageData={pageData}
          changeFilters={changeFilters}
        />
      ) : null}

      <div className="election__updated-date">
        {pageData?.fecha_actualizacion}
      </div>

      {page === 'parlamento-andino' ? (
        <h3 className="election__subtitle">Distrito único</h3>
      ) : null}

      {filters.filter && filters.group !== 'general' ? (
        <ResultPaginator
          setNewFilterPosition={setNewFilterPosition}
          filters={filters}
          partidos={partidos}
        />
      ) : null}

      {page === 'congresal' && filters.group !== 'todos_los_partidos' ? (
        <OptionCongresal filters={filters} changeFilters={changeFilters} />
      ) : null}

      {page === 'congresal' &&
      filters.group === 'general' &&
      (filters.filter === 'valla_electoral' || !filters.filter) ? (
        <Projection filterData={getFilterData()} partidos={partidos} />
      ) : (
        <ResultGraph
          filterData={getFilterData()}
          partidos={partidos}
          filters={filters}
          page={page}
        />
      )}

      <div className="election__bottom-text">{pageData?.texto_inferior}</div>
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
    'parlamento-andino': PropTypes.string.tag({
      name: 'Url del JSON para resultados del parlamento andino',
    }),
  }),
}

export default PresidentialElection
