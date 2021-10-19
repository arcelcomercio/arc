/* eslint-disable camelcase */
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import React from 'react'

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

  const { resized_urls: { image } = {} } =
    useContent(
      blockData?.url
        ? {
            source: 'photo-resizer',
            query: {
              url: blockData?.url,
              presets: 'image:2000x0',
            },
          }
        : ''
    ) || {}

  const { resized_urls: { mobile_image: mobileImage } = {} } =
    useContent(
      blockData?.url
        ? {
            source: 'photo-resizer',
            query: {
              url: blockData?.url_mobile,
              presets: 'mobile_image:640x0',
            },
          }
        : ''
    ) || {}

  const { resized_urls: { logo_image: logoImage } = {} } =
    useContent(
      blockData?.url_logo
        ? {
            source: 'photo-resizer',
            query: {
              url: blockData?.url_logo,
              presets: 'logo_image:0x100',
              quality: 100,
              format: /\.png$/.test(blockData?.url_logo) ? 'png' : '',
            },
          }
        : ''
    ) || {}

  return blockType === 'featured' ? (
    <>
      {blockData?.type === 'image' ? (
        <div className="featured-img">
          {blockData?.url_logo && (
            <img
              className="featured-img__logo"
              src={logoImage}
              alt="Noticia - logo"
            />
          )}
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
            <source srcSet={mobileImage} media="(max-width: 639px)" />
            <img
              className="featured-img__img"
              style={{ backgroundColor: blockData?.bg_color || 'transparent' }}
              src={image}
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
          }}
        />
      ) : null}
    </>
  ) : null
}

StoryTitleLite.label = 'Artículo - Imagen Destacada con Titular'
StoryTitleLite.static = true

export default StoryTitleLite
