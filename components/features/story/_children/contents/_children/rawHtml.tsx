import { useAppContext } from 'fusion:context'
import * as React from 'react'

import LiteYoutube from '../../../../../global-components/lite-youtube'

const classes = {
  newsEmbed: 'story-content__embed',
}

interface FeatureProps {
  content?: string
}
// Funcion extraida de helpers

const clearUrlOrCode = (url = '') => {
  const clearUrl = url.trim().replace('"', '').replace('"', '')
  return { clearUrl, code: clearUrl.split('#')[1] }
}

const extractHash = (path = '') => path.replace(/.+#|"/g, '')

const RawHTMLChildren: React.FC<FeatureProps> = ({ content = '' }) => {
  const isDaznServicePlayer =
    content?.includes('player.daznservices.com/') ||
    content?.includes('player.performgroup.com/') ||
    false

  const pattern = content.includes('id')
    ? /<script (.+)id=([A-Za-z0-9 _]*[A-Za-z0-9])(.*)><\/script>/
    : /<script (src=(.*))(.*)(async(=(.*))?)><\/script>/
  const storyVideoPlayerId = content.match(pattern) || []

  const { outputType } = useAppContext()
  let URL = ''
  let URL_VIDEO = ''

  if (content.includes('widgets.js')) {
    const beginURL = content.indexOf('<script')
    const endURL = content.lastIndexOf('</script>')
    const script = content.slice(beginURL, endURL + 9)
    const scriptResult = script.replace('src="//', 'src="https://')
    const rgexpURL = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
    const [URI] = rgexpURL.exec(scriptResult) || []
    URL = URI
  } else if (
    isDaznServicePlayer &&
    content.trim().match(/^<script(.*)<\/script>$/)
  ) {
    const idVideos = storyVideoPlayerId
    const urlAssignHttp = content.includes('player.daznservices.com/')
      ? idVideos[1].replace('src="//', 'https://')
      : idVideos[1]
          .replace('src="//', 'https://')
          .replace('performgroup', 'daznservices')

    URL_VIDEO = content.includes('id')
      ? `${urlAssignHttp}id=${idVideos[2]}`
      : `${urlAssignHttp}`
  }

  const idVideo = storyVideoPlayerId
  const idVideoEmbed =
    isDaznServicePlayer && content.includes('id') && idVideo[2]
      ? `id_video_embed_${idVideo[2]}`
      : `_${clearUrlOrCode(idVideo[2] || '').code || ''}`
  const isWidgets = URL && URL.includes('widgets.js')
  if ((URL_VIDEO || URL) && !content.includes('<mxm')) {
    return (
      <>
        {URL_VIDEO && outputType === 'lite' ? (
          <div id={idVideoEmbed} className={classes.newsEmbed}>
            <iframe
              title="video de dazn services"
              sandbox="allow-scripts allow-same-origin"
              width="480"
              height="360"
              poster=""
              layout="responsive"
              src={`https://player.daznservices.com/player/v4/assets/amp-iframe-loader.html#${extractHash(
                URL_VIDEO
              )}`}
              loading="lazy">
              <div overflow tabIndex={0} role="button">
                Show Player
              </div>
            </iframe>
          </div>
        ) : null}

        {isWidgets ? (
          <div
            className={classes.newsEmbed}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        ) : null}
      </>
    )
  }

  // Return aqui en caso de que sea video de Youtube
  const hasYoutubeVideo = /<iframe.+youtu\.be|youtube\.com/.test(content)
  if (hasYoutubeVideo) {
    const [, videoId] = content.match(/\/embed\/([\w-]+)/) || []
    return videoId ? <LiteYoutube videoId={videoId} loading="lazy" /> : null
  }

  // Fallback para cualquier iframe y contenido en general
  const iframeEmbed = content.includes('<iframe')
  const mxmEmbed = content.includes('<mxm')
  return iframeEmbed && !mxmEmbed ? (
    <>
      <div
        className={classes.newsEmbed}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  ) : (
    <div
      className={classes.newsEmbed}
      dangerouslySetInnerHTML={{
        __html:
          isDaznServicePlayer && outputType !== 'lite'
            ? content.trim().replace('performgroup', 'daznservices')
            : content,
      }}
    />
  )
}

export default RawHTMLChildren
