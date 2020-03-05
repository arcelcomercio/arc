// file path: StoryContentContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcStoryContent, {
  Oembed,
  /* RawHtml, */
  Text,
} from '@arc-core-components/feature_article-body'
// import Clavis from '../../../utilities/analytics/clavis'
import {
  appendToBody,
  createLink,
  createScript,
  replaceTags,
  storyTagsBbc,
  getDateSeo,
  storyContenImage,

  /* replaceHtmlMigracion, */
} from '../../../utilities/helpers'

import ConfigParams from '../../../utilities/config-params'
import StoryData from '../../../utilities/story-data'
import { getAssetsPath } from '../../../utilities/constants'

const classes = {
  navTabs: 'navegation-tabs w-full bg-white pt-10 flex justify-center',
  navTabsList: 'navegation-tabs__list flex',
  navTabsItem: 'navegation-tabs__item flex items-center',
  navTabsItemActive: 'navegation-tabs__item navegation-tabs__item--active flex items-center',
  navTabsTitle:
    'navegation-tabs__title secondary-font pl-10 pr-10 md:pl-20 md:pr-20 pb-10',
}

@Consumer
class MatchNav extends PureComponent {
  render() {
    const {
      globalContent
    } = this.props

    const {
      subtype,
      canonical_url,
      related_content: { basic: relatedContent } = {},
    } = globalContent || {}

    const configTabs = []
    relatedContent.forEach(element => {
      configTabs[element.subtype] = element.canonical_url
    })
    configTabs[subtype] = canonical_url

    let urlEstaticas = configTabs['partido_previa']?configTabs['partido_previa']:(configTabs['partido_directo']?configTabs['partido_directo']:configTabs['partido_cronica'])

    return (
      <>
        <div className={classes.navTabs}>
          <ul className={classes.navTabsList}>
            {configTabs['partido_previa'] && (
              <li className={subtype=='partido_previa'?classes.navTabsItemActive:classes.navTabsItem}>
                <a
                  href={configTabs['partido_previa']}
                  className={classes.navTabsTitle}>
                  Previa
                </a>
              </li>
            )}
            {configTabs['partido_directo'] && (
              <li className={subtype=='partido_directo'?classes.navTabsItemActive:classes.navTabsItem}>
                <a
                  href={configTabs['partido_directo']}
                  className={classes.navTabsTitle}>
                  Directo
                </a>
              </li>
            )}
            <li className={classes.navTabsItem}>
              <a
                href={'/alineaciones' + urlEstaticas}
                className={classes.navTabsTitle}>
                Alineaciones
              </a>
            </li>
            <li className={classes.navTabsItem}>
              <a
                href={'/estadisticas' + urlEstaticas}
                className={classes.navTabsTitle}>
                Estadísticas
              </a>
            </li>
            {configTabs['partido_cronica'] && (
              <li className={subtype=='partido_cronica'?classes.navTabsItemActive:classes.navTabsItem}>
                <a
                  href={configTabs['partido_cronica']}
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
