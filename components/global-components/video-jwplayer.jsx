import React from 'react'

const StoryContentChildVideoJwplayer = ({ data = {} }) => {
  const { key: mediaId = '', duration = '' } = data

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
      )}
    </>
  )
}
export default StoryContentChildVideoJwplayer
