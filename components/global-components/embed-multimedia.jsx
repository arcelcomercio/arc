import ENV from 'fusion:environment'
import React from 'react'
import {
  VIDEO,
  ELEMENT_YOUTUBE_ID,
} from '../utilities/constants/multimedia-types'
import StoryContentChildVideoJwplayer from './video-jwplayer'
import { defaultImage } from '../utilities/assets'

const JWPLAYER = 'jwplayer'
const GOLDFISH = 'goldfish'
const YOUTUBE = 'youtube'

const GOLDFISH_ENV = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
const ORG_ID = 'elcomercio'

const EmbedMultimedia = props => {
  const image = (
    url,
    { deployment, contextPath, website, title = '', linkStory = '' }
  ) => {
    return (
      <a itemProp="url" href={linkStory} className="w-full h-full">
        <img
          // Siempre está en la parte inicial de la pag, no hace falta lazyload
          // TODO: buscar la manera de aplicar resize a esta imagen.
          className="embed-multimedia-image w-full h-full object-cover"
          src={
            url ||
            defaultImage({
              deployment,
              contextPath,
              arcSite: website,
              size: 'md',
            })
          }
          alt={title}
        />
      </a>
    )
  }

  const videoYoutube = (codeId, { width = '100%', height = '100%' }) => {
    return (
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${codeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        title="Youtube"
        allowFullScreen
        className="youtube-iframe"
      />
    )
  }

  const videoGoldfish = (
    multimediaSource,
    { deployment, contextPath, website, title = '', secondMultimedia = '' }
  ) => {
    return multimediaSource ? (
      <>
        <div
          id={`powa-${multimediaSource}`}
          data-env={GOLDFISH_ENV}
          data-api={GOLDFISH_ENV}
          data-org={ORG_ID}
          data-uuid={multimediaSource}
          data-aspect-ratio="0.562"
          className="powa w-full">
          {secondMultimedia &&
            image(secondMultimedia, {
              deployment,
              contextPath,
              website,
              title,
            })}
        </div>
        <script
          async
          src={deployment(
            `${contextPath}/resources/assets/js/powaSettings.min.js`
          )}
        />
        <script
          async
          src={`https://d1tqo5nrys2b20.cloudfront.net/${GOLDFISH_ENV}/powaBoot.js?org=elcomercio`}
        />
      </>
    ) : (
      image(multimediaSource, { deployment, contextPath, website, title })
    )
  }

  const videoJwplayer = (
    multimediaSource,
    { deployment, contextPath, website, title = '' }
  ) => {
    const params = {
      key: multimediaSource,
    }
    const videoScript = `"use strict";var jwplayerObserver=function(e,r){e.forEach(function(e){var t=e.isIntersecting,n=e.target;if(t){console.log("target",n);var o=n.getAttribute("id");if((o=o.split("_"))[1]){var a="https://cdn.jwplayer.com/players/"+o[1]+"-"+o[2]+".js",i=document.createElement("script");i.type="text/javascript",i.src=a,document.head.append(i)}r.unobserve(n)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.body.querySelectorAll(".jwplayer-lazy")),r=new IntersectionObserver(jwplayerObserver,{rootMargin:"0px"});e.forEach(function(e){r.observe(e)})}})});
    `
    return multimediaSource ? (
      <>
        <StoryContentChildVideoJwplayer
          data={params}></StoryContentChildVideoJwplayer>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: videoScript,
          }}
        />
      </>
    ) : (
      image(multimediaSource, { deployment, contextPath, website, title })
    )
  }

  const getMultimedia = type => {
    if (type === JWPLAYER) {
      return videoJwplayer
    }
    if (type === GOLDFISH || type === { VIDEO, ELEMENT_YOUTUBE_ID }.VIDEO) {
      return videoGoldfish
    }
    if (
      type === YOUTUBE ||
      type === { VIDEO, ELEMENT_YOUTUBE_ID }.ELEMENT_YOUTUBE_ID
    ) {
      return videoYoutube
    }
    return image
  }

  const {
    type,
    source,
    deployment,
    contextPath,
    website,
    title = '',
    linkStory = '',
    secondMultimedia = '',
    width = '100%',
    height = '100%',
  } = props

  return getMultimedia(type)(source, {
    deployment,
    contextPath,
    title,
    website,
    linkStory,
    secondMultimedia,
    width,
    height,
  })
}

export default EmbedMultimedia
