import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'
import { Story } from 'types/story'

import Header from './_children/header'
import Hero from './_children/hero'
import MainImage from './_children/main-image'
import StickyBar from './_children/sticky-bar'
import StoriesList from './_children/stories-list'

interface FeatureProps {
  customFields?: {
    customLogos?: any
  }
}

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/resumen-2020/_container.scss`
 */
const StaticsResumenByStory: FC<FeatureProps> = (props) => {
  const { customFields: { customLogos = {} } = {} } = props

  const { requestUri, arcSite, globalContent: data } = useAppContext<Story>()
  const { siteUrl, social: { twitter: { user } = {} } = {} } = getProperties(
    arcSite
  )

  const section: string | undefined = requestUri
    ?.split('?')[0]
    ?.split('-resumen/')[1]
    ?.split('/')[0]

  const customLogo = customLogos[arcSite]

  const heroData = data?.promo_items?.basic_resumen?.embed?.config?.data

  const mainPath = data?.website_url

  const filterContentElements = data?.content_elements?.filter(
    (el) => el.subtype === 'resumen-blocks'
  )

  const sectionIndex = filterContentElements?.findIndex(
    ({ embed }) => embed?.config?.data?.url === section
  )

  const sectionData =
    sectionIndex !== undefined && sectionIndex !== -1
      ? filterContentElements?.[sectionIndex]?.embed?.config?.data
      : undefined

  const nextSection =
    sectionIndex !== undefined && sectionIndex !== -1
      ? filterContentElements?.[sectionIndex + 1]?.embed?.config?.data?.url
      : undefined

  return (
    <>
      {section && !sectionData?.url ? (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: 'window.location.replace("/404/");',
          }}
        />
      ) : null}
      <Header
        requestUri={requestUri}
        siteUrl={siteUrl}
        arcSite={arcSite}
        twitter={user || ''}
        customLogo={customLogo}
      />
      {!section ? (
        <Hero
          name={heroData?.name}
          title={heroData?.title}
          description={heroData?.description}
          content={filterContentElements}
          mainPath={mainPath}
          text={heroData?.text}>
          <div id="gpt_top" className="hero__ads" />
        </Hero>
      ) : null}
      {section ? (
        <>
          <div id="gpt_top" />
          <StickyBar
            text={sectionData?.text || ''}
            month={sectionData?.name || ''}
            disableAnchor={false}
            mainPath={mainPath || ''}
          />
          <MainImage
            image={sectionData?.image?.url || ''}
            caption={sectionData?.image?.caption || ''}
            month={sectionData?.name || ''}
          />
          <StoriesList
            list={sectionData?.stories}
            nextSectionPath={nextSection || ''}
            mainPath={mainPath || ''}
          />
        </>
      ) : null}
      <div id="gpt_zocalo" />
    </>
  )
}

StaticsResumenByStory.static = true
StaticsResumenByStory.label = 'Plantilla Especial Resumen - Por Composer'

StaticsResumenByStory.propTypes = {
  customFields: PropTypes.shape({
    customLogos: PropTypes.kvp.tag({
      name: 'Logos personalizados por marca',
      description: `Presiona -new item- agregar una > marca < y la > url < del logo personalizado para esa marca.
        Ej: "depor" - "https://cdna.depor.com/resources/dist/depor/images/alternate-logo-w.png?d=1"`,
      group: 'Logos',
    }),
  }),
}

export default StaticsResumenByStory
