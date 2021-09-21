/* eslint-disable react/react-in-jsx-scope */
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import React from 'react'

import AgendaCalendario from './_children/calendario'
import Footer from './_children/footer'
import NavBar from './_children/navbar'
import AgendaNota from './_children/nota'

/**
 * @see estilos `src/websites/elcomercio/agenda-presidencial.scss`
 */

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
        // website_url: `/lima/magdalena-del-mar-proceso-de-elecciones-vecinales-se-llevara-a-cabo-de-forma-virtual-por-la-pandemia-nndc-noticia/`,
      },
    }) || {}

  const fecha10Mas = () => {
    const d = new Date(dateUrl)
    d.setHours(d.getHours() - 5)
    d.setDate(d.getDate() + 10)
    const match = /\d{4}-\d{2}-\d{2}/.exec(d.toISOString())
    return match ? match[0] : ''
  }

  const fecha10Men = () => {
    const d = new Date(dateUrl)
    d.setHours(d.getHours() - 5)
    d.setDate(d.getDate() - 8)
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
        size: 12,
      },
    }) || {}

  const dataMore10 =
    useContent({
      source: 'story-feed-by-section-and-date-v3',
      query: {
        section: '/lima',
        date: dateUrl,
        date2: fecha10Mas(),
        size: 12,
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

  return (
    <>
      <NavBar isNota={isNotaWeb} day={dateUrl} />
      {isNotaWeb === true && JSON.stringify(dataNota) !== '{}' ? (
        <AgendaNota dataNota={dataNota} titleUpDown={titleUpDown} />
      ) : (
        <AgendaCalendario />
      )}
      <Footer isBack={BackUrl} isAhead={NextUrl} />
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
