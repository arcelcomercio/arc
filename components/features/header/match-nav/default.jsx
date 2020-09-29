// file path: StoryContentContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

const classes = {
  navTabs:
    'navegation-tabs w-full bg-white pt-10 flex justify-center border-t-1 border-solid',
  navTabsList: 'navegation-tabs__list flex',
  navTabsItem: 'navegation-tabs__item flex items-center border-solid',
  navTabsItemActive:
    'navegation-tabs__item navegation-tabs__item--active flex items-center border-solid',
  navTabsTitle:
    'navegation-tabs__title secondary-font pl-10 pr-10 md:pl-20 md:pr-20 pb-5',
}

@Consumer
class MatchNav extends PureComponent {
  constructor(props) {
    super(props)
    const { globalContent } = this.props
    const { _id: storyId } = globalContent || {}
    this.fetchContent({
      related_content: {
        source: 'related-content',
        query: {
          _id: storyId,
          presets: 'no-presets',
          includedFields: 'canonical_url,subtype',
        },
      },
    })
  }

  render() {
    const { globalContent, requestUri } = this.props
    const { related_content: { basic: relatedContent = [] } = {} } =
      this.state || {}

    const { subtype, canonical_url: canonicalUrl } = globalContent || {}

    const configTabs = []
    relatedContent.forEach(element => {
      configTabs[element.subtype] = element.canonical_url
    })
    configTabs[subtype] = canonicalUrl

    let urlEstaticas = ''

    if (configTabs.partido_cronica) urlEstaticas = configTabs.partido_cronica
    if (configTabs.partido_directo) urlEstaticas = configTabs.partido_directo
    if (configTabs.partido_previa) urlEstaticas = configTabs.partido_previa

    let currentTab = subtype
    if (requestUri.includes('/alineaciones/')) {
      currentTab = 'alineaciones'
    }

    if (requestUri.includes('/estadisticas/')) {
      currentTab = 'estadisticas'
    }

    return (
      <>
        <div className={classes.navTabs}>
          <ul className={classes.navTabsList}>
            {configTabs.partido_previa && (
              <li
                className={
                  subtype === 'partido_previa'
                    ? classes.navTabsItemActive
                    : classes.navTabsItem
                }>
                <a
                  itemProp="url"
                  href={configTabs.partido_previa}
                  className={classes.navTabsTitle}>
                  Previa
                </a>
              </li>
            )}
            {configTabs.partido_directo && (
              <li
                className={
                  subtype === 'partido_directo'
                    ? classes.navTabsItemActive
                    : classes.navTabsItem
                }>
                <a
                  itemProp="url"
                  href={configTabs.partido_directo}
                  className={classes.navTabsTitle}>
                  Directo
                </a>
              </li>
            )}
            <li
              className={
                currentTab === 'alineaciones'
                  ? classes.navTabsItemActive
                  : classes.navTabsItem
              }>
              <a
                itemProp="url"
                href={`/alineaciones${urlEstaticas}`}
                className={classes.navTabsTitle}>
                Alineaciones
              </a>
            </li>
            <li
              className={
                currentTab === 'estadisticas'
                  ? classes.navTabsItemActive
                  : classes.navTabsItem
              }>
              <a
                itemProp="url"
                href={`/estadisticas${urlEstaticas}`}
                className={classes.navTabsTitle}>
                Estadísticas
              </a>
            </li>
            {configTabs.partido_cronica && (
              <li
                className={
                  subtype === 'partido_cronica'
                    ? classes.navTabsItemActive
                    : classes.navTabsItem
                }>
                <a
                  itemProp="url"
                  href={configTabs.partido_cronica}
                  className={classes.navTabsTitle}>
                  Crónica
                </a>
              </li>
            )}
          </ul>
        </div>
      </>
    )
  }
}

MatchNav.label = 'Partido Navegación'

export default MatchNav
