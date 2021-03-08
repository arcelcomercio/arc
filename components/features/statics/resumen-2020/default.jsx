import * as React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import Header from './_children/header'
import Hero from './_children/hero'
import StickyBar from './_children/sticky-bar'
import MainImage from './_children/main-image'
import StoriesList from './_children/stories-list'
import { slugify } from '../../../utilities/parse/slugify'

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/resumen-2020/_container.scss`
 */
const StaticsResumen2020 = props => {
  const {
    customFields: {
      editor = {},
      year = 2020,
      customLogos = {},
      heroTitle = 'Resumen del año',
      heroSubtitle = 'Las noticias más impactantes del Perú y el Mundo',
      stickyBarText = 'Las noticias más importantes de ',
      stickyBarDisableAnchor = false,
      listDesc = 'Selecciona un mes:',
    } = {},
  } = props

  const { requestUri = '', arcSite = '' } = useAppContext()
  const { siteUrl, social: { twitter: { user } = {} } = {} } = getProperties(
    arcSite
  )

  /**
   * @type {string[]}
   * @description Ejemplo de paths: ['resumen-2020', 'enero']
   */
  const paths = requestUri
    .split('?')[0]
    .split('/')
    .filter(el => el !== '')
  const section = paths[1] || ''
  const mainPath = paths[0] || ''

  const parsedContent = JSON.parse(editor) || []

  const sectionData =
    parsedContent.filter(({ seccion }) => slugify(seccion) === section)[0] || {}

  const nextSection =
    parsedContent[
      parsedContent.findIndex(({ seccion }) => slugify(seccion) === section) + 1
    ]?.seccion || ''

  const sectionImage = sectionData?.imagen || {}

  const customLogo = customLogos[arcSite]

  return (
    <>
      <Header
        requestUri={requestUri}
        siteUrl={siteUrl}
        arcSite={arcSite}
        twitter={user}
        customLogo={customLogo}
      />
      {paths.length === 1 && (
        <Hero
          title={heroTitle}
          year={year}
          subtitle={heroSubtitle}
          content={parsedContent}
          mainPath={mainPath}
          listDesc={listDesc}>
          <div id="gpt_top" className="hero__ads"></div>
        </Hero>
      )}
      {paths.length > 1 ? (
        <>
          <div id="gpt_top"></div>
          <StickyBar
            text={stickyBarText}
            month={section}
            disableAnchor={stickyBarDisableAnchor}
            mainPath={mainPath}
          />
          <MainImage
            image={sectionImage.url}
            caption={sectionImage.caption}
            month={sectionData?.seccion || {}}
          />
          <StoriesList
            list={sectionData?.historias}
            nextSectionPath={slugify(nextSection)}
            mainPath={mainPath}
          />
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
    editor: PropTypes.string.tag({
      name: 'Editor de contenido',
      formPlugin: 'template-resumen',
      defaultValue: '[]',
    }),
    customLogos: PropTypes.kvp.tag({
      name: 'Logos personalizados por marca',
      description: `Presiona -new item- agregar una > marca < y la > url < del logo personalizado para esa marca.
        Ej: "depor" - "https://cdna.depor.com/resources/dist/depor/images/alternate-logo-w.png?d=1"`,
      group: 'Logos',
    }),
    heroTitle: PropTypes.string.tag({
      name: 'Título superior',
      description: 'Por defecto: RESUMEN DEL AÑO',
      group: 'Portada',
    }),
    year: PropTypes.string.tag({
      name: 'Título principal',
      description: 'Por defecto: 2020',
      group: 'Portada',
    }),
    heroSubtitle: PropTypes.string.tag({
      name: 'Subtítulo de la portada',
      description:
        'Por defecto: Las noticias más impactantes del Perú y el Mundo',
      group: 'Portada',
    }),
    listDesc: PropTypes.string.tag({
      name: 'Descripción del listado',
      description: 'Por defecto: Selecciona un mes:',
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
