import * as React from 'react'

import {
  appendToBody,
  appendToId,
  createScript,
} from '../../../../../utilities/client/nodes'

// Funcion extraida de helpers

const clearUrlOrCode = (url = '') => {
  const clearUrl = url.trim().replace('"', '').replace('"', '')
  return { clearUrl, code: clearUrl.split('#')[1] }
}

const RcriptsContinue: React.FC<{ content: string }> = (data): void => {
  const content = data?.content
  const isDaznServicePlayer =
    content?.includes('player.daznservices.com/') ||
    content?.includes('player.performgroup.com/') ||
    false

  const pattern = content.includes('id')
    ? /<script (.+)id=([A-Za-z0-9 _]*[A-Za-z0-9])(.*)><\/script>/
    : /<script (src=(.*))(.*)(async(=(.*))?)><\/script>/
  const storyVideoPlayerId = content.match(pattern) || []

  let URL = ''
  let URL_VIDEO = ''
  const idVideos = storyVideoPlayerId

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
    const urlAssignHttp = content.includes('player.daznservices.com/')
      ? idVideos[1].replace('src="//', 'https://')
      : idVideos[1]
          .replace('src="//', 'https://')
          .replace('performgroup', 'daznservices')

    URL_VIDEO = content.includes('id')
      ? `${urlAssignHttp}id=${idVideos[2]}`
      : `${urlAssignHttp}`
  }
  const idVideoPlayer = content.includes('id') && `${idVideos[2]}`

  if (URL) {
    appendToBody(createScript({ src: URL, async: true }))
  }

  if (URL_VIDEO) {
    const idElement =
      isDaznServicePlayer && content.includes('id') && storyVideoPlayerId[2]
        ? `id_video_embed_${idVideoPlayer}`
        : `_${clearUrlOrCode(storyVideoPlayerId[2] || '').code || ''}`
    const myList = document.getElementById(idElement)
    appendToId(
      myList,
      createScript({
        src: content.includes('id')
          ? URL_VIDEO
          : clearUrlOrCode(storyVideoPlayerId[2]).clearUrl,
        async: true,
      })
    )
  }
}

export default RcriptsContinue
