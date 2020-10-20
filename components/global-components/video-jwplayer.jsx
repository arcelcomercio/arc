import React from 'react'

const StoryContentChildVideoAmp = ({ data = {} }) => {
  const { key: mediaId = '', duration = '' } = data

  const jscriptVideo = `
  jwplayer("mediaId-${mediaId}").setup({ 
    "playlist": "https://cdn.jwplayer.com/v2/media/${mediaId}"
  });
  `
  return (
    <>
      {mediaId && (
        <>
          <div data-time={duration} id={`mediaId-${mediaId}`}></div>
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
export default StoryContentChildVideoAmp
