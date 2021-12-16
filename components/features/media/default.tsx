import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'

export type ArchiveSitemapQuery = {
  playerId?: string
  mediaId?: string
  imagen?: string
  title?: string
}

const MediaJWplayer = (): JSX.Element => {
  const { globalContent } = useAppContext<ArchiveSitemapQuery>()

  const { resized_urls: { imagenJwplayer = '' } = {} } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: globalContent?.imagen,
        presets: 'imagenJwplayer:600x330',
      },
    }) || {}

  const script = `
  jwplayer('${globalContent?.mediaId}').setup({
    playlist: [{
    file: "https://cdn.jwplayer.com/manifests/${globalContent?.mediaId}.m3u8",
    title: decodeURIComponent("${globalContent?.title}"),
    recommendations :"https://cdn.jwplayer.com/v2/media/${globalContent?.mediaId}",
    image: "${imagenJwplayer}",
    }]
    
  });  
  `
  return (
    <>
      <div id={globalContent?.mediaId} />
      <script
        type="text/javascript"
        src={`https://cdn.jwplayer.com/libraries/${globalContent?.playerId}.js`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: script,
        }}
      />
    </>
  )
}

MediaJWplayer.label = 'Media - JWplayer'
MediaJWplayer.static = true

export default MediaJWplayer
