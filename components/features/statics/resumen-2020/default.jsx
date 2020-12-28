import * as React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import Header from './_children/header'
import Hero from './_children/hero'
import StickyBar from './_children/sticky-bar'
import MainImage from './_children/main-image'
import StoriesList from './_children/stories-list'

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/resumen-2020/_container.scss`
 */
const StaticsResumen2020 = props => {
  const {
    customFields: {
      content = {},
      year = 2020,
      heroTitle = 'Resumen del año',
      heroSubtitle = 'Las noticias más impactantes del Perú y el Mundo',
      stickyBarText = 'Las noticias más importantes de ',
      stickyBarDisableAnchor = false,
    } = {},
  } = props

  const { requestUri, arcSite } = useAppContext()
  const { siteUrl, social: { twitter } = {} } = getProperties(arcSite)
  const isMonthPage = /^\/resumen-2020\/\w{4,10}\/(?:\?.+)?$/.test(requestUri)
  const [, month = ''] =
    requestUri.match(/^\/resumen-2020\/(\w{4,10})\/?/) || []
  const parsedContent = JSON.parse(content)
  const monthImage = month ? parsedContent[month]?.imagen : {}

  return (
    <>
      <Header
        requestUri={requestUri}
        siteUrl={siteUrl}
        arcSite={arcSite}
        twitter={twitter}
      />
      {!isMonthPage && (
        <Hero
          title={heroTitle}
          year={year}
          subtitle={heroSubtitle}
          month={month}>
          <div id="gpt_top" className="hero__ads"></div>
        </Hero>
      )}
      {isMonthPage ? (
        <>
          <div id="gpt_top"></div>
          <StickyBar
            text={stickyBarText}
            year={year}
            month={month}
            disableAnchor={stickyBarDisableAnchor}
          />
          <MainImage
            image={monthImage.url}
            caption={monthImage.caption}
            month={month}
          />
          <StoriesList content={parsedContent} month={month} />
        </>
      ) : null}
      <div id="gpt_zocalo"></div>
    </>
  )
}

StaticsResumen2020.static = true
StaticsResumen2020.label = 'Resumen 2020 Especial'

StaticsResumen2020.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.json.tag({
      name: 'Contenido en formato JSON',
    }),
    year: PropTypes.number.tag({
      name: 'Año a mostrar',
      description: 'Por defecto: 2020',
      max: 2021,
      min: 2020,
      step: 1,
    }),
    heroTitle: PropTypes.string.tag({
      name: 'Título de la portada',
      description: 'Por defecto: Resumen 2020',
      group: 'Portada',
    }),
    heroSubtitle: PropTypes.string.tag({
      name: 'Subtítulo de la portada',
      description: 'Por defecto: El año de la barbarie pandémica',
      group: 'Portada',
    }),
    stickyBarText: PropTypes.string.tag({
      name: 'Texto que precede al mes',
      description: 'Por defecto: Las noticias más importantes de - mes - año -',
      group: 'Barra flotante',
    }),
    stickyBarDisableAnchor: PropTypes.bool.tag({
      name: 'Desactivar ancla a inicio',
      description:
        'Desactiva la X que te lleva al inicio de la página. Por defecto: false',
      defaultValue: false,
      group: 'Barra flotante',
    }),
  }),
}

export default StaticsResumen2020
