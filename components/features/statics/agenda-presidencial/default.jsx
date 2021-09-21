/* eslint-disable react/react-in-jsx-scope */
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import React from 'react'

import AgendaCalendario from './_children/calendario'
import NavBar from './_children/navbar'
import AgendaNota from './_children/nota'

/**
 * @see estilos `src/websites/elcomercio/agenda-presidencial.scss`
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const StaticsAgendaPresidencial = (props) => {
  const { customFields: { titleUpDown } = {} } = props
  const { requestUri } = useAppContext()
  const isNotaWeb = /\/agenda-presidencial\/(\d{4})-(\d{1,2})-(\d{1,2})\//.test(
    requestUri
  )
  const dateUrl = requestUri
    .split('?')[0]
    .split('/')
    .filter((item) => item)
    .pop()

  const dataNota =
    useContent({
      source: 'story-by-url-and-related-filter',
      query: {
        website_url: `/agenda-presidencial/${dateUrl}/`,
      },
    }) || {}
  console.log('=========DATA', dataNota)

  const fecha10Mas = () => {
    const d = new Date(dateUrl)
    d.setHours(d.getHours() - 5)
    d.setDate(d.getDate() + 11)
    const match = /\d{4}-\d{2}-\d{2}/.exec(d.toISOString())
    return match ? match[0] : ''
  }

  const fecha10Men = () => {
    const d = new Date(dateUrl)
    d.setHours(d.getHours() - 5)
    d.setDate(d.getDate() - 9)
    const match = /\d{4}-\d{2}-\d{2}/.exec(d.toISOString())
    return match ? match[0] : ''
  }

  const dataLast10 =
    useContent({
      source: 'story-feed-by-section-and-date-v3',
      query: {
        section: '/lima',
        date: fecha10Men(),
        date2: dateUrl,
        size: 10,
      },
    }) || {}

  const dataMore10 =
    useContent({
      source: 'story-feed-by-section-and-date-v3',
      query: {
        section: '/lima',
        date: dateUrl,
        date2: fecha10Mas(),
        size: 10,
      },
    }) || {}

  let BackUrl = ''
  if (dataLast10 && dataLast10.content_elements) {
    if (dataLast10.content_elements.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      BackUrl = dataLast10.content_elements.slice(-1)[0].websites.elcomercio
        .website_url
    }
  }

  let NextUrl = ''
  if (dataMore10 && dataMore10.content_elements) {
    if (dataMore10.content_elements.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      NextUrl = dataMore10.content_elements[0].websites.elcomercio.website_url
    }
  }

  console.log('BackUrlBackUrl', BackUrl)
  console.log('NextUrlNextUrl', NextUrl)

  return (
    <>
      <NavBar isNota={isNotaWeb} day={dateUrl} />
      {isNotaWeb === true && JSON.stringify(dataNota) !== '{}' ? (
        <AgendaNota dataNota={dataNota} titleUpDown={titleUpDown} />
      ) : (
        <AgendaCalendario />
      )}
    </>
  )
}

StaticsAgendaPresidencial.label = 'Agenda Presidencial'

StaticsAgendaPresidencial.propTypes = {
  customFields: PropTypes.shape({
    titleUpDown: PropTypes.string.tag({
      name: 'Titulo de subida y bajada de precios',
      default: 'SUBIDA Y BAJADA DE PRECIOS',
    }),
  }),
}

export default StaticsAgendaPresidencial
