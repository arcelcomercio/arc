import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import ArcStoryContent, {
  Oembed,
  Text,
} from '@arc-core-components/feature_article-body'

import { replaceTags } from '../../../utilities/tags'

import {
  ELEMENT_HEADER,
  ELEMENT_IMAGE,
  ELEMENT_QUOTE,
  ELEMENT_RAW_HTML,
  ELEMENT_TABLE,
  ELEMENT_TEXT,
  ELEMENT_VIDEO,
  ELEMENT_GALLERY,
  ELEMENT_OEMBED,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_INTERSTITIAL_LINK,
  ELEMENT_LINK_LIST,
} from '../../../utilities/constants/element-types'

import StoryData from '../../../utilities/story-data'

import StoryContentsChildImage from '../../story/contents/_children/image'
import StoryContentsChildVideo from '../../story/contents/_children/video'
import StoryContentsChildVideoNativo from '../../story/contents/_children/video-nativo'
import StoryHeaderChildGallery from '../../story/gallery/_children/gallery'
import StoryContentsChildBlockQuote from '../../story/contents/_children/blockquote'
import StoryContentsChildTable from '../../../global-components/story-table'
import StoryContentsChildInterstitialLink from '../../story/contents/_children/interstitial-link'
import StoryContentsChildLinkList from '../../story/contents/_children/link-list'
import StoryContentChildRawHTML from '../../story/contents/_children/rawHtml'

import schemaFilter from './_dependencies/schema-filter'

const CONTENT_SOURCE = 'story-by-id'

const classes = {
  news: 'story-content w-full pr-20 pl-20',
  content:
    'story-content__content body-content__content position-relative flex flex-col',
  textClasses:
    'story-content__font--secondary body-content__text text-black mb-25 title-xs line-h-md mt-20 secondary-font mx-auto body-content__animated',
  blockquoteClass:
    'story-content__blockquote text-gray-300 line-h-sm ml-15 mt-40 mb-40 pl-10 pr-30 body-content__animated',
  newsImage:
    'story-content__image w-full m-0 story-content__image--cover body-content__animated',
  newsEmbed: 'story-content__embed embed-script body-content__animated',
  alignmentClasses: 'story-content__alignment',
  headerText: 'body-content__header-text mx-auto body-content__animated',
  author: 'body-content__author mx-auto text-black',
}

const BodyContentSpecial = props => {
  const { customFields: { storyCode = '', hideAuthor = false } = {} } = props

  const { isAdmin, arcSite, contextPath, deployment } = useFusionContext()

  const story = useContent({
    source: CONTENT_SOURCE,
    query: {
      _id: storyCode,
      published: 'false',
    },
    filter: schemaFilter,
  })

  const {
    author,
    multimediaLazyDefault,
    contentPosicionPublicidad,
  } = new StoryData({
    data: story,
    contextPath,
    deployment,
    arcSite,
  })

  /* const params = {
    author,
    updatedDate: getDateSeo(updatedDate || createdDate),
    date,
    primarySectionLink,
    primarySection,
    subtype,
    ...promoItems,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    multimediaLazyDefault,
    primaryImage: true,
  } */

  const htmlScript = `"use strict";var playVideo=document.createEvent("Event"),pauseVideo=document.createEvent("Event");playVideo.initEvent("playVideo",!0,!0),pauseVideo.initEvent("pauseVideo",!0,!0);var options={autohide:1,modestbranding:1,rel:0,quality:"hd720"},onYouTubeIframeAPIReady=function(t){var e=function(t){var e=t.target,i=e.getIframe();i.classList.add("body-content__animated"),i.addEventListener("playVideo",function(t){return e.playVideo()}),i.addEventListener("pauseVideo",function(t){return e.pauseVideo()}),options.quality&&e.setPlaybackQuality(options.quality)};document.querySelectorAll("[id][width][height][data-video-id]").forEach(function(t){new YT.Player(t.getAttribute("id"),{width:t.getAttribute("width"),height:t.getAttribute("height"),videoId:t.getAttribute("data-video-id"),playerVars:options,events:{onReady:e}})})},isVisible=function(t){var e=t.getBoundingClientRect().top,i=t.getBoundingClientRect().height;return e<=document.documentElement.clientHeight&&e+i>0},attachEvent=function(t,e,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent&&t.attachEvent("on".concat(e),i)},update=function(){document.querySelectorAll(".body-content__animated").forEach(function(t){isVisible(t)?(t.classList.add("visible"),"iframe"===t.tagName.toLowerCase()&&t.getAttribute("src").includes("youtube.com")&&t.dispatchEvent(playVideo)):(t.classList.remove("visible"),"iframe"===t.tagName.toLowerCase()&&t.getAttribute("src").includes("youtube.com")&&t.dispatchEvent(pauseVideo))})};attachEvent(window,"scroll",update),attachEvent(window,"resize",update),setTimeout(function(){update()},500);`

  /*
  const playVideo = document.createEvent('Event')
  const pauseVideo = document.createEvent('Event')
  playVideo.initEvent('playVideo', true, true)
  pauseVideo.initEvent('pauseVideo', true, true)

  const options = {
    autohide: 1,
    modestbranding: 1,
    rel: 0,
    quality: 'hd720'
  }
  
  const onYouTubeIframeAPIReady = (e) => {
    const onPlayerReady = evt => {
      const player = evt.target
      const iframe = player.getIframe()
      iframe.classList.add('body-content__animated')
      iframe.addEventListener('playVideo', e => player.playVideo())
      iframe.addEventListener('pauseVideo', e => player.pauseVideo())
      if (options.quality) {
        player.setPlaybackQuality(options.quality);
      }
    }
    
    const ytVideos = document.querySelectorAll('[id][width][height][data-video-id]')
    ytVideos.forEach(vid => {
      new YT.Player(vid.getAttribute('id'), {
          width: vid.getAttribute('width'),
          height: vid.getAttribute('height'),
          videoId: vid.getAttribute('data-video-id'),
          playerVars: options,
          events: {
            'onReady': onPlayerReady
          }
      });
    })
  }

  const isVisible = el => {
    const topEle = el.getBoundingClientRect().top
    const heightEle = el.getBoundingClientRect().height  
    const posBottomWindow = document.documentElement.clientHeight
    return (topEle <= posBottomWindow && (topEle + heightEle) > 0);
  };
  
  const attachEvent = (ele, evt, callbackFunction) => {
      if (ele.addEventListener) {
        ele.addEventListener(evt, callbackFunction, false);
      } else if (ele.attachEvent) { 
        ele.attachEvent(`on${evt}`, callbackFunction) 
      };
  };
  
  const update = () => {
      const elements = document.querySelectorAll('.body-content__animated')
      elements.forEach(item => {
        if (isVisible(item)) {
          item.classList.add('visible')
          if (item.tagName.toLowerCase() === 'iframe' && item.getAttribute('src').includes('youtube.com')) item.dispatchEvent(playVideo)
        } else {
          item.classList.remove('visible')
          if (item.tagName.toLowerCase() === 'iframe' && item.getAttribute('src').includes('youtube.com')) item.dispatchEvent(pauseVideo)
        }
      })
  };
  
  attachEvent(window, "scroll", update);
  attachEvent(window, "resize", update);
  setTimeout(() => {
    update();
  }, 500)
*/

  return (
    <div className={classes.content} id="contenedor">
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html:
            '"use strict";var tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);',
        }}></script>
      {author !== '' && !hideAuthor && (
        <span className={classes.author}>Por: {author}</span>
      )}
      {contentPosicionPublicidad && (
        <ArcStoryContent
          data={contentPosicionPublicidad}
          elementClasses={classes}
          renderElement={element => {
            const {
              type,
              subtype: sub,
              raw_oembed: rawOembed,
              content,
              level,
              alignment = '',
              headlines: { basic: captionVideo = '' } = {},
              url = '',
              items = [],
            } = element
            if (type === ELEMENT_IMAGE) {
              const presets = 'landscapeMd:314,storySmall:482,large:980'

              return (
                <div className="body-content__animated">
                  <StoryContentsChildImage
                    {...element}
                    multimediaLazyDefault={multimediaLazyDefault}
                    presets={presets}
                  />
                </div>
              )
            }
            if (type === ELEMENT_VIDEO) {
              return (
                <>
                  {element && element.embed_html ? (
                    <StoryContentsChildVideo
                      data={element.embed_html}
                      {...element}
                      className={classes.newsImage}
                      description={captionVideo}
                      contentElemtent="true"
                    />
                  ) : (
                    <StoryContentsChildVideoNativo
                      streams={element && element.streams}
                    />
                  )}
                </>
              )
            }
            if (type === ELEMENT_GALLERY) {
              return (
                <StoryHeaderChildGallery
                  contentElementGallery={element}
                  type={type}
                />
              )
            }
            if (type === ELEMENT_TABLE) {
              return <StoryContentsChildTable data={element} type={type} />
            }
            if (type === ELEMENT_QUOTE) {
              return <StoryContentsChildBlockQuote data={element} />
            }
            if (type === ELEMENT_INTERSTITIAL_LINK) {
              return (
                <StoryContentsChildInterstitialLink
                  url={url}
                  content={content}
                  isAmp={false}
                />
              )
            }
            if (type === ELEMENT_LINK_LIST) {
              return (
                <StoryContentsChildLinkList
                  items={items}
                  multimediaLazyDefault={multimediaLazyDefault}
                  arcSite={arcSite}
                  isAdmin={isAdmin}
                />
              )
            }
            if (type === ELEMENT_OEMBED) {
              return (
                <Oembed
                  rawOembed={rawOembed}
                  subtype={sub}
                  className={classes.newsEmbed}
                />
              )
            }

            if (type === ELEMENT_HEADER && level === 2) {
              return (
                <h2
                  className={classes.headerText}
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              )
            }

            if (type === ELEMENT_TEXT) {
              const alignmentClass = alignment
                ? `${classes.textClasses} ${classes.alignmentClasses}-${alignment}`
                : classes.textClasses

              return (
                <Text
                  content={replaceTags(content)}
                  className={alignmentClass}
                />
              )
            }

            if (type === ELEMENT_BLOCKQUOTE) {
              return (
                <>
                  <blockquote
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                    className={classes.blockquoteClass}
                  />
                </>
              )
            }

            if (type === ELEMENT_RAW_HTML) {
              return <StoryContentChildRawHTML content={content} />
            }
            return ''
          }}
        />
      )}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: htmlScript }}></script>
    </div>
  )
}

BodyContentSpecial.label = 'Especial - Contenido Nota'
BodyContentSpecial.static = true

BodyContentSpecial.propTypes = {
  customFields: PropTypes.shape({
    storyCode: PropTypes.string.tag({
      name: 'ID de historia',
    }),
    hideAuthor: PropTypes.bool.tag({
      name: 'Ocultar autor',
    }),
  }),
}

export default BodyContentSpecial
