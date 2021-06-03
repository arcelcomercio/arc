/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import ResultGraph from '../_children/graph'
import NavigationMenu from '../_children/navigation'
import ResultPages from '../_children/pages'
import ResultPaginator from '../_children/paginator'

const PresidentialElectionFirst = ({ customFields }) => {
  const { requestUri } = useAppContext()

  const { secondElectionJson, template } = customFields

  const fullPath = requestUri.split('?')[0]
  const pathArr = fullPath.split('/').filter((el) => el !== '')

  const [filters, setFilters] = React.useState({
    group: decodeURI(pathArr[1] || '') || 'general',
    filter: decodeURI(pathArr[2] || '') || null,
  })

  const pageData =
    useContent(
      secondElectionJson
        ? {
            source: 'get-data-from-json-file',
            query: {
              json_file: secondElectionJson,
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

  const changeUrl = (newFilters = {}) => {
    const { group, filter } = newFilters
    const filterPathArray = [group, filter]
      .filter((item) => !!item)
      .map((item) => encodeURI(item))
    window.history.pushState(
      {},
      null,
      `/${pathArr[0]}/${filterPathArray.join('/')}/`
    )
  }

  const changeFilters = (newFilters) => {
    setFilters(newFilters)
    changeUrl(newFilters)
  }

  let filterSecondElectionData = []
  let filterFirstElectionData = []
  const { group, filter } = filters
  if (group === 'general') {
    filterSecondElectionData = pageData?.general?.['segunda-vuelta']
    filterFirstElectionData = pageData?.general?.['primera-vuelta']
  } else {
    const dataByGroup = pageData?.[group]?.find(
      (el) => el?.filtro_nombre === filter
    )
    filterSecondElectionData = dataByGroup?.['segunda-vuelta']
    filterFirstElectionData = dataByGroup?.['primera-vuelta']
  }

  const setNewFilterPosition = (direction) => {
    const filterByGroup = pageData?.[filters.group] || []

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
      changeFilters({ ...filters, filter: newData.filtro_nombre })
    }
  }

  return (
    <div>
      <ResultPages customFields={customFields} pathBase={`/${pathArr[0]}`} />

      <NavigationMenu pageData={pageData} changeFilters={changeFilters} />

      <div className="election__updated-date">
        {pageData?.fecha_actualizacion}
      </div>

      {filters.filter && filters.group !== 'general' ? (
        <ResultPaginator
          setNewFilterPosition={setNewFilterPosition}
          filters={filters}
          partidos={partidos}
        />
      ) : null}

      <ResultGraph
        filterData={filterSecondElectionData}
        partidos={partidos}
        filters={filters}
        template={template}
      />

      <div className="election__bottom-text">
        Así quedaron en la primera vuelta
      </div>

      <ResultGraph
        filterData={filterFirstElectionData}
        partidos={partidos}
        filters={filters}
        showTitle={false}
      />
    </div>
  )
}

export default PresidentialElectionFirst
