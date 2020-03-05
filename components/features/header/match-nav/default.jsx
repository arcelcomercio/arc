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

import StoryContentsChildVideo from './_children/video'
import StoryContentsChildImage from './_children/image'
import StoryHeaderChildGallery from '../gallery/_children/gallery'
import StoryContentChildRawHTML from './_children/rawHtml'
import StoryContentsChildBlockQuote from './_children/blockquote'
import StoryContentsChildTable from '../../../global-components/story-table'
import StoryContentsChildAuthor from './_children/author'
import StoryContentsChildMultimedia from './_children/multimedia'
import StoryContentsChildRelatedInternal from './_children/related-internal'
import StoryContentsChildIcon from './_children/icon-list'
import ConfigParams from '../../../utilities/config-params'
import StoryData from '../../../utilities/story-data'
import StoryContentsChildImpresa from './_children/impresa'
import StoryContentsChildVideoNativo from './_children/video-nativo'
import Ads from '../../../global-components/ads'
import { getAssetsPath } from '../../../utilities/constants'

const classes = {
  navTabs: 'navegation-tabs w-full bg-white pt-10 flex justify-center',
  navTabsList: 'navegation-tabs__list flex',
  navTabsItem: 'navegation-tabs__item flex items-center',
  navTabsItemActive:
    'navegation-tabs__item navegation-tabs__item--active flex items-center',
  navTabsTitle:
    'navegation-tabs__title secondary-font pl-10 pr-10 md:pl-20 md:pr-20 pb-5',
}

@Consumer
class MatchNav extends PureComponent {
  render() {
    const subtypes = ['partido_previa', 'partido_directo', 'partido_cronica']

    const {
      globalContent,
      arcSite,
      contextPath,
      deployment,
      siteProperties: {
        ids: { opta },
      },
      siteProperties: { isDfp = false },
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

    return (
      <>
        <div className={classes.navTabs}>
          <ul className={classes.navTabsList}>
            {configTabs['partido_previa'] && (
              <li
                className={
                  subtype == 'partido_previa'
                    ? classes.navTabsItemAActive
                    : classes.navTabsItem
                }>
                <a
                  href={configTabs['partido_previa']}
                  className={classes.navTabsTitle}>
                  Previa
                </a>
              </li>
            )}
            {configTabs['partido_directo'] && (
              <li
                className={
                  subtype == 'partido_directo'
                    ? classes.navTabsItemActive
                    : classes.navTabsItem
                }>
                <a
                  href={configTabs['partido_directo']}
                  className={classes.navTabsTitle}>
                  Directo
                </a>
              </li>
            )}
            <li className={classes.navTabsItem}>
              <a
                href={'/alineaciones' + configTabs['partido_previa']}
                className={classes.navTabsTitle}>
                Alineaciones
              </a>
            </li>
            <li className={classes.navTabsItem}>
              <a
                href={'/estadisticas' + configTabs['partido_previa']}
                className={classes.navTabsTitle}>
                Estadísticas
              </a>
            </li>
            {configTabs['partido_cronica'] && (
              <li
                className={
                  subtype == 'partido_cronica'
                    ? classes.navTabsItemActive
                    : classes.navTabsItem
                }>
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
