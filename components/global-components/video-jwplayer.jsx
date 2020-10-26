import React from 'react'
import { useFusionContext } from 'fusion:context'

const StoryContentChildVideoJwplayer = ({ data = {} }) => {
  const { siteProperties: { jwplayerId = '' } = {} } = useFusionContext()

  const { key: mediaId = '', duration = '', has_ads: hasAds = 0 } = data

  const jscriptVideo = `
  jwplayer("mediaId-${mediaId}").setup({ 
    "playlist": "https://cdn.jwplayer.com/v2/media/${mediaId}",
    "image":"https://cdn.jwplayer.com/v2/media/${mediaId}/poster.jpg?width=720"
  });
  `
  return (
    <>
      {mediaId && (
        <>
          {hasAds ? (
            <>
              <div
                data-time={duration}
                data-mediaid={mediaId}
                className="video-jwplayer"
                id={`mediaId-${mediaId}`}></div>
              <script
                type="text/JavaScript"
                dangerouslySetInnerHTML={{
                  __html: jscriptVideo,
                }}
              />
            </>
          ) : (
            <>
              <script
                src={`https://cdn.jwplayer.com/players/${mediaId}-${jwplayerId}.js`}></script>
              <div id={`botr_${mediaId}_${jwplayerId}_div`}></div>
            </>
          )}
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoJwplayer
