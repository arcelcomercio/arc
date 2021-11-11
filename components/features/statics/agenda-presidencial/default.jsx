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
  const {
    customFields: {
      titleUpDown,

      isYesterday,
      grayLaterDays,
    } = {},
  } = props

  const { requestUri } = useAppContext()

  const isNotaWeb = /\/agenda-presidencial\/(202[1-6])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\//.test(
    requestUri
  )

  const dateUrl = requestUri
    .split('?')[0]
    .split('/')
    .filter((item) => item)
    .pop()

  let dataNota = ''
  let fecha10Mas = ''
  let fecha10Men = ''
  let dataLast10 = ''
  let dataMore10 = ''

  if (dateUrl !== 'agenda-presidencial') {
    dataNota =
      useContent({
        source: 'story-by-url-and-related-filter',
        query: {
          website_url: `/agenda-presidencial/${dateUrl}/`,
          // website_url: `/lima/magdalena-del-mar-proceso-de-elecciones-vecinales-se-llevara-a-cabo-de-forma-virtual-por-la-pandemia-nndc-noticia/`,
        },
      }) || {}

    fecha10Mas = () => {
      const d = new Date(dateUrl)
      d.setHours(d.getHours() - 5)
      d.setDate(d.getDate() + 10)
      const match = /\d{4}-\d{2}-\d{2}/.exec(d.toISOString())
      return match ? match[0] : ''
    }

    fecha10Men = () => {
      const d = new Date(dateUrl)
      d.setHours(d.getHours() - 5)
      d.setDate(d.getDate() - 8)
      const match = /\d{4}-\d{2}-\d{2}/.exec(d.toISOString())
      return match ? match[0] : ''
    }

    dataLast10 =
      useContent({
        source: 'story-feed-by-section-and-date-v3',
        query: {
          section: '/agenda-presidencial',
          date: fecha10Men(),
          date2: dateUrl,
          size: 12,
        },
      }) || {}

    dataMore10 =
      useContent({
        source: 'story-feed-by-section-and-date-v3',
        query: {
          section: '/agenda-presidencial',
          date: dateUrl,
          date2: fecha10Mas(),
          size: 12,
        },
      }) || {}
  }

  let BackUrl = ''
  if (dataLast10 && dataLast10.content_elements) {
    if (dataLast10.content_elements.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      // BackUrl = dataLast10.content_elements.slice(-1)[0].websites.elcomercio
      //   .website_url
      BackUrl = dataLast10.content_elements[0].websites.elcomercio.website_url
    }
  }

  let NextUrl = ''
  if (dataMore10 && dataMore10.content_elements) {
    // console.log('DATAMORE10=====', dataMore10)
    // NextUrl = ''

    // if(element[i].websites.elcomercio.website_url === `/agenda-presidencial/${dateUrl}/`){

    // }
    Object.keys(dataMore10.content_elements).forEach((key) => {
      if (
        dataMore10.content_elements[key].websites.elcomercio.website_url ===
        `/agenda-presidencial/${dateUrl}/`
      ) {
        dataMore10.content_elements.splice(key)
      }

      // eslint-disable-next-line prefer-destructuring
      NextUrl = dataMore10.content_elements.slice(-1)[0].websites.elcomercio
        .website_url
    })
  }

  return (
    <>
      <NavBar isNota={isNotaWeb} day={dateUrl} dataNota={dataNota} />
      {isNotaWeb === true && JSON.stringify(dataNota) !== '{}' ? (
        <AgendaNota dataNota={dataNota} titleUpDown={titleUpDown} />
      ) : (
        <AgendaCalendario
          isYesterday={isYesterday}
          grayLaterDays={grayLaterDays}
        />
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

    isYesterday: PropTypes.bool.tag({
      name: '¿Resaltar dia anterior?',
    }),
    grayLaterDays: PropTypes.bool.tag({
      name: '¿Pintar de gris los dias posteriores?',
    }),
  }),
}

export default StaticsAgendaPresidencial
