import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'
import { Story } from 'types/story'

import { deleteQueryString } from '../../../utilities/parse/queries'
import { removeLastSlash } from '../../../utilities/parse/strings'
import StoryData from '../../../utilities/story-data'
import StoryChildrenContentsLite from '../_children/contents/lite'
import StoryChildrenContinueHeader from '../_children/continue-header/lite'
import StoryChildrenGalleryLite from '../_children/gallery/lite'
import StoryChildrenMultimediaLte from '../_children/multimedia/lite'
import StoryChildrenSocialHeaderLite from '../_children/social-header/lite'
import StoryChildrenTitle from '../_children/title/lite'

const StoryContinousLoad: FC = () => {
  const {
    globalContent,
    arcSite,
    requestUri,
    contextPath,
  } = useAppContext<Story>()
  const { idGoogleAnalitics } = getProperties(arcSite)
  const cleanRequestUri = deleteQueryString(requestUri)

  const { taxonomy: { tags = [] } = {}, websites = {} } = globalContent || {}
  const { website_section: { path = '' } = {} } = websites[arcSite] || {}
  const { slug: tag = '' } = tags[0] || {}

  const getStoriesBySectionQty = () => {
    /**
     * Para El Comercio, cantidad de notas por seccion
     * para filtrar, varia dependiendo si hay tag
     */
    if (arcSite === 'elcomercio') {
      return tag ? 10 : 20
    }
    // Por defecto seran 15 para filtrar
    return 15
  }

  const tagStories =
    useContent(
      arcSite === 'elcomercio'
        ? {
            source: 'story-feed-by-tag',
            query: {
              name: tag,
              stories_qty: 10,
              includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
              contentType: 'metered,free',
            },
          }
        : {}
    ) || {}

  const sectionStories =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section: removeLastSlash(path),
        stories_qty: getStoriesBySectionQty(),
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
        contentType: 'metered,free',
      },
    }) || {}

  const { content_elements: tagElements = [] } = tagStories
  const { content_elements: sectionElements = [] } = sectionStories

  const getTotalStoriesBySection = () => {
    if (arcSite === 'elcomercio') {
      /**
       * Para El Comercio, cantidad de notas por seccion
       * varia dependiendo si hay notas por Tag
       */
      const existTagStories = tag && tagElements && tagElements[0]
      return existTagStories ? 5 : 10
    }
    // Por defecto, son 5 notas por seccion
    return 5
  }

  const filterStoriesCb = (story: Story) => {
    // Filtra las historias que no son Galeria horizontal
    const websiteUrl = story.websites[arcSite]?.website_url
    const type = story.promo_items?.basic_gallery?.type

    return (
      !/^\/(somos|archivo-elcomercio|videos|recetas)\//.test(
        websiteUrl || ''
      ) &&
      cleanRequestUri !== websiteUrl &&
      ((type === 'gallery' && story.subtype !== 'gallery_slider') ||
        (type !== 'gallery' && story.subtype === 'gallery_slider')) &&
      story.subtype !== 'parallax' &&
      story.subtype !== 'minuto_minuto'
    )
  }

  const filterStories = (stories: Story[]) =>
    stories
      .filter(filterStoriesCb)
      .map(
        ({
          websites: { [arcSite]: { website_url: websiteUrl = '' } = {} } = {},
          headlines: { basic = '' } = {},
        }) => ({ link: websiteUrl, title: basic })
      )

  const sectionStoriesPremium =
    useContent(
      arcSite === 'elcomercio'
        ? {
            source: 'story-feed-by-section',
            query: {
              section: removeLastSlash(path),
              stories_qty: getStoriesBySectionQty(),
              includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
              contentType: 'premium',
            },
          }
        : {}
    ) || {}
  const {
    content_elements: sectionElementsPremium = [],
  } = sectionStoriesPremium

  const filteredStories = {
    storiesByTag: tag ? filterStories(tagElements).slice(0, 5) : [],
    storiesBySection: filterStories(sectionElements).slice(
      0,
      getTotalStoriesBySection()
    ),
    storiesBySectionPremium: filterStories(sectionElementsPremium).slice(
      0,
      getTotalStoriesBySection()
    ),
  }

  const filledStContinueScript = {
    section: removeLastSlash(path),
    data: filteredStories,
  }

  React.useEffect(() => {
    const isPremiumUser = () => {
      let isPremium = false
      if (
        window.localStorage &&
        // eslint-disable-next-line no-prototype-builtins
        window.localStorage.hasOwnProperty('ArcId.USER_INFO') &&
        window.localStorage.getItem('ArcId.USER_INFO') !== '{}'
      ) {
        const UUID_USER = JSON.parse(
          window.localStorage.getItem('ArcId.USER_INFO') || '{}'
        ).uuid
        const COUNT_USER = JSON.parse(
          window.localStorage.getItem('ArcP') || '{}'
        )[UUID_USER]
        if (COUNT_USER && COUNT_USER.sub.p.length) {
          isPremium = true
        }
      }
      return isPremium
    }

    const sessionStoriesObject = filledStContinueScript.data || {
      storiesByTag: [],
      storiesBySection: [],
      storiesBySectionPremium: [],
    }

    const nextStoriesArray = isPremiumUser()
      ? [
          ...sessionStoriesObject.storiesBySectionPremium,
          ...sessionStoriesObject.storiesByTag,
        ]
      : [
          ...sessionStoriesObject.storiesByTag,
          ...sessionStoriesObject.storiesBySection,
        ]
    nextStoriesArray.unshift({
      title: document.title,
      link: window.location.pathname,
    })

    console.log(
      'Arreglo de notas que deben cargarse >>>>>>>>>>>>>>>>>>>>',
      nextStoriesArray
    )
  }, [])

  const filterStoriesCbs = (story: Story) => {
    const {
      label: { trustproject },
    } = story

    const {
      isPremium,
      primarySection,
      primarySectionLink,
      title,
      websiteLink,
      subTitle,
      promoItems,
      contentElementsListOne,
      subtype,
      multimedia,
      promoItemJwplayer,
      tags: tagsStory,
      displayDate,
      publishDate,
      createdDate,
      authorImage,
      authorLink,
      author,
      role,
      locality,
      contentElements,
      authorsList,
      authorEmail,
    } = new StoryData({
      data: story,
      contextPath,
      arcSite,
    })

    return (
      <>
        <StoryChildrenSocialHeaderLite
          arcSite={arcSite}
          primarySectionLink={primarySectionLink}
          primarySection={primarySection}
          postTitle={title}
          postPermaLink={websiteLink}
          isPremium={isPremium}
          trustproject={trustproject}
        />

        <StoryChildrenTitle
          arcSite={arcSite}
          primarySectionLink={primarySectionLink}
          primarySection={primarySection}
          title={title}
          subTitle={subTitle}
          isPremium={isPremium}
          contentElementsListOne={contentElementsListOne}
        />

        <StoryChildrenMultimediaLte
          promoItems={promoItems}
          primarySection={primarySection}
          primarySectionLink={primarySectionLink}
          subtype={subtype}
          multimedia={multimedia}
          promoItemJwplayer={promoItemJwplayer}
          tags={tagsStory}
        />

        <StoryChildrenGalleryLite
          subtype={subtype}
          canonicalUrl={websiteLink}
          multimedia={multimedia}
          isPremium={isPremium}
          promoItems={promoItems}
          primarySection={primarySection}
          promoItemJwplayer={promoItemJwplayer}
        />

        <StoryChildrenContentsLite
          arcSite={arcSite}
          contextPath={contextPath}
          requestUri={requestUri}
          displayDate={displayDate}
          publishDate={publishDate}
          createdDate={createdDate}
          authorImage={authorImage}
          authorLink={authorLink}
          author={author}
          role={role}
          locality={locality}
          primarySection={primarySection}
          authorEmail={authorEmail}
          subtype={subtype}
          isPremium={isPremium}
          multimedia={multimedia}
          tags={tags}
          contentElements={contentElements}
          canonicalUrl={websiteLink}
          authorsList={authorsList}
          copyLink
          shareAlign="right"
          liteAdsEvery={2}
        />
      </>
    )
  }

  return (
    <div>
      <h1>Hola mundo</h1>
      <StoryChildrenContinueHeader hideAnchor={false} />
    </div>
  )
}

StoryContinousLoad.label = 'Artículo - Carga Conitnua'

export default StoryContinousLoad
