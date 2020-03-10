import React, { PureComponent } from 'react'

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

    return (
      <>
        {this.URL_VIDEO || this.URL ? (
          <>
            {this.URL_VIDEO && (
              <div id={idVideoEmbed} className={classes.newsEmbed}>
                <script src={this.URL_VIDEO.replace('"', '')} defer></script>
              </div>
            )}
            {this.URL && <script src={this.URL} defer></script>}

            {isWidgets && (
              <div
                className={classes.newsEmbed}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            )}
          </>
        ) : (
          <div
            className={classes.newsEmbed}
            dangerouslySetInnerHTML={{
              __html: isDaznServicePlayer(content)
                ? content.trim().replace('performgroup', 'daznservices')
                : content
                    .replace('</script>:', '</script>')
                    .replace(':<script>', '<script>'),
            }}
          />
        )}
      </>
    )
  }
}

export default rawHTML
