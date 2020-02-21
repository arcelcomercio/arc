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
  news: 'story-content w-full pr-20 pl-20',
  content: 'story-content__content position-relative flex flex-row-reverse',
  textClasses:
    'story-content__font--secondary mb-25 title-xs line-h-md mt-20 secondary-font pr-20',
  newsImage: 'story-content__image w-full m-0 story-content__image--cover ',
  newsEmbed: 'story-content__embed',
  tags: 'story-content',
  section: 'w-full',
  listClasses: 'story-content__paragraph-list',
  alignmentClasses: 'story-content__alignment',
  bbcHead: 'bbc-head p-10',
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

    const { subtype, canonical_url, related_content: { basic: relatedContent } = {} } =
      globalContent || {}

    const configTabs = []
    relatedContent.forEach(element => {
        configTabs[element.subtype] = element.canonical_url
    });
    configTabs[subtype] = canonical_url

    console.log("===========================================")
    console.log(configTabs)
    console.log("===========================================")

    // const {
    //   publishDate: date,
    //   promoItems,
    //   displayDate: updatedDate,
    //   createdDate,
    //   authorImage,
    //   authorLink,
    //   author,
    //   primarySection,
    //   authorEmail,
    //   primarySectionLink,
    //   subtype,
    //   isPremium,
    //   multimediaLandscapeMD,
    //   multimediaStorySmall,
    //   multimediaLarge,
    //   multimediaLazyDefault,
    //   tags,
    //   contentPosicionPublicidad,
    // } = new StoryData({
    //   data: globalContent,
    //   contextPath,
    //   deployment,
    //   arcSite,
    // })

    // const params = {
    //   authorImage,
    //   author,
    //   authorLink,
    //   updatedDate: getDateSeo(updatedDate || createdDate),
    //   date,
    //   primarySectionLink,
    //   authorEmail,
    //   primarySection,
    //   subtype,
    //   ...promoItems,
    //   multimediaLandscapeMD,
    //   multimediaStorySmall,
    //   multimediaLarge,
    //   multimediaLazyDefault,
    //   primaryImage: true,
    // }

    return (
      <>
        <div className={classes.news}>
            <ul>
                <li><a href={configTabs['partido_previa']}>Previa</a></li>
                <li><a href={configTabs['partido_directo']}>Directo</a></li>
                <li><a href={"/alineaciones" + configTabs['partido_previa']}>Alineaciones</a></li>
                <li><a href={"/estadisticas" + configTabs['partido_previa']}>Estadísticas</a></li>
                <li><a href={configTabs['partido_cronica']}>Crónica</a></li>
            </ul>
        </div>
      </>
    )
  }
}

MatchNav.label = 'Partido Navegación'

export default MatchNav
