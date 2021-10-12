import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'

export type ArchiveSitemapQuery = {
  playerId?: string
  mediaId?: string
  imagen?: string
}

const MediaJWplayer = (): JSX.Element => {
  const { globalContent } = useAppContext<ArchiveSitemapQuery>()
  console.log('globalContent', globalContent?.imagen)

  const { resized_urls: { imagenJwplayer = '' } = {} } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: globalContent?.imagen,
        presets: 'imagenJwplayer:480x300',
      },
    }) || {}

  const script = `
  jwplayer('${globalContent?.mediaId}').setup({
    playlist: [{
    file: "https://cdn.jwplayer.com/manifests/${globalContent?.mediaId}.m3u8",
    recommendations :'https://cdn.jwplayer.com/v2/media/${globalContent?.mediaId}',
    image: "${imagenJwplayer}",
    }],
    advertising: {
        schedule: "",
    }
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
