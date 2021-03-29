/* eslint-disable camelcase */
import React from 'react'

import { useFusionContext } from 'fusion:context'
import StoryData from '../../../utilities/story-data'

const StoryTitleLite = () => {
  const {
    // siteProperties: { jwplayers = {} } = {},
    contextPath,
    globalContent: data,
    arcSite,
  } = useFusionContext()

  // const playerId = jwplayers.elcomercio || jwplayers.gec
  // const jwplayerId = playerId.player

  const { title, subTitle } = new StoryData({
    data,
    contextPath,
    arcSite,
  })

  const blockType = data?.promo_items?.basic_parallax?.embed?.config?.block
  const blockData = data?.promo_items?.basic_parallax?.embed?.config?.data

  return blockType === 'featured' ? (
    <>
      {blockData?.type === 'image' ? (
        <div className="featured-img">
          <img
            className="featured-img__logo"
            src={blockData?.url_logo}
            alt="Noticia - logo"
          />
          <h2
            style={{ color: blockData?.color || '#777' }}
            className="featured-img__subtitle">
            {subTitle}
          </h2>
          <h1
            style={{ color: blockData?.color || '#777' }}
            className="featured-img__title">
            {title}
          </h1>

          <picture>
            <source srcSet={blockData?.url_mobile} media="(max-width: 639px)" />
            <img
              className="featured-img__img"
              style={{ backgroundColor: blockData?.bg_color || 'transparent' }}
              src={blockData?.url}
              alt={title}
            />
          </picture>
        </div>
      ) : null}
      {blockData?.type === 'html' ? (
        <div
          style={{ height: '100%', width: '100%' }}
          dangerouslySetInnerHTML={{
            __html: blockData?.html,
          }}></div>
      ) : null}
    </>
  ) : null
}

/* 
<div id={`botr_${'JWVegU6y'}_${jwplayerId}_div`}></div>
<script
  src={`https://cdn.jwplayer.com/players/${'JWVegU6y'}-${jwplayerId}.js`}></script>

<script
  dangerouslySetInnerHTML={{
    __html: `
    jwplayer("botr_JWVegU6y_CW5g4pdQ_div").setup(Object.assign(jwplayer("botr_JWVegU6y_CW5g4pdQ_div").getConfig(), {autostart: true, controls: false, mute: true}))
`,
  }}></script> */

StoryTitleLite.label = 'Artículo - Imagen Destacada con Titular'
StoryTitleLite.static = true

export default StoryTitleLite
