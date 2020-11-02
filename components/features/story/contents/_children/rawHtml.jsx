import React, { PureComponent } from 'react'
import LiteYoutube from '../../../../global-components/lite-youtube'

const classes = {
  newsEmbed: 'story-content__embed',
}

// Funcion extraida de helpers
const storyVideoPlayerId = (content = '') => {
  const pattern = content.includes('id')
    ? /<script (.+)id=([A-Za-z0-9 _]*[A-Za-z0-9])(.*)><\/script>/
    : /<script (src=(.*))(.*)(async(=(.*))?)><\/script>/
  return content.match(pattern) || []
}

const clearUrlOrCode = (url = '') => {
  const clearUrl = url
    .trim()
    .replace('"', '')
    .replace('"', '')
  return { clearUrl, code: clearUrl.split('#')[1] }
}

const isDaznServicePlayer = content =>
  content.includes('player.daznservices.com/') ||
  content.includes('player.performgroup.com/')

class rawHTML extends PureComponent {
  constructor(props) {
    super(props)
    const { content } = this.props
    this.newContent = ''
    this.URL = ''
    this.ID_VIDEO = ''
    this.URL_VIDEO = ''
    if (content.includes('widgets.js')) {
      const beginURL = content.indexOf('<script')
      const endURL = content.lastIndexOf('</script>')
      const script = content.slice(beginURL, endURL + 9)
      const scriptResult = script.replace('src="//', 'src="https://')
      this.newContent = content.replace(scriptResult, '')
      const rgexpURL = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
      const [URI] = rgexpURL.exec(scriptResult) || []
      this.URL = URI
    } else if (
      isDaznServicePlayer(content) &&
      content.trim().match(/^<script(.*)<\/script>$/)
    ) {
      const idVideos = storyVideoPlayerId(content)
      const urlAssignHttp = content.includes('player.daznservices.com/')
        ? idVideos[1].replace('src="//', 'https://')
        : idVideos[1]
            .replace('src="//', 'https://')
            .replace('performgroup', 'daznservices')

      this.URL_VIDEO = content.includes('id')
        ? `${urlAssignHttp}id=${idVideos[2]}`
        : `${urlAssignHttp}`

      this.ID_VIDEO = content.includes('id') && `${idVideos[2]}`
    } else {
      this.newContent = content
    }
  }

  render() {
    const { content } = this.props
    const idVideo = storyVideoPlayerId(content)
    const idVideoEmbed =
      isDaznServicePlayer(content) && content.includes('id') && idVideo[2]
        ? `id_video_embed_${idVideo[2]}`
        : `_${clearUrlOrCode(idVideo[2] || '').code || ''}`
    const isWidgets = this.URL && this.URL.includes('widgets.js')
    if ((this.URL_VIDEO || this.URL) && !content.includes('<mxm')) {
      return (
        <>
          {this.URL_VIDEO && (
            <div id={idVideoEmbed} className={classes.newsEmbed}>
              <script src={this.URL_VIDEO.replace('"', '')} defer />
            </div>
          )}
          {this.URL && <script src={this.URL} defer />}

          {isWidgets && (
            <div
              className={classes.newsEmbed}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          )}
        </>
      )
    }

    // Return aqui en caso de que sea video de Youtube
    const hasYoutubeVideo = /<iframe.+youtu\.be|youtube\.com/.test(content)
    if (hasYoutubeVideo) {
      const [, videoId] = content.match(/\/embed\/([\w-]+)/) || []
      if (videoId) return <LiteYoutube videoId={videoId} loading="lazy" />
    }

    // Fallback para cualquier iframe y contenido en general
    const iframeEmbed = content.includes('<iframe')
    const mxmEmbed = content.includes('<mxm')
    return (
      <>
        {iframeEmbed && !mxmEmbed ? (
          <>
            <div
              className="story-contents__lL-iframe story-contents__p-default"
              data-type="iframe"
              data-iframe={content}
            />
          </>
        ) : (
          <div
            className={classes.newsEmbed}
            dangerouslySetInnerHTML={{
              __html: isDaznServicePlayer(content)
                ? content.trim().replace('performgroup', 'daznservices')
                : content
                    .replace('</script>:', '</script>')
                    .replace(':<script', '<script')
                    .replace(/:icon:/gm, '<div  class="more-compartir"></div>')
                    .replace(
                      /:fijado:/gm,
                      '<svg xmlns="http://www.w3.org/2000/svg" class="icon-compartir" width="20" height="20" viewBox="0 0 475 475"><path d="M380 247c-15-19-32-28-51-28V73c10 0 19-4 26-11 7-7 11-16 11-26 0-10-4-18-11-26C347 4 339 0 329 0H146c-10 0-18 4-26 11-7 7-11 16-11 26 0 10 4 19 11 26 7 7 16 11 26 11v146c-19 0-36 9-51 28-15 19-22 40-22 63 0 5 2 9 5 13 4 4 8 5 13 5h115l22 139c1 5 4 8 9 8h0c2 0 4-1 6-2 2-2 3-4 3-6l15-138h123c5 0 9-2 13-5 4-4 5-8 5-13C402 287 395 266 380 247zM210 210c0 3-1 5-3 7-2 2-4 3-7 3-3 0-5-1-7-3-2-2-3-4-3-7V82c0-3 1-5 3-7 2-2 4-3 7-3 3 0 5 1 7 3 2 2 3 4 3 7V210z" data-original="#000000"/></svg>'
                    ),
            }}
          />
        )}
      </>
    )
  }
}

export default rawHTML
