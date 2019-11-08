import React, { PureComponent } from 'react'
import {
  createScript,
  appendToBody,
  appendToId,
  storyVideoPlayerId,
} from '../../../../utilities/helpers'

const classes = {
  newsEmbed: 'story-content__embed',
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
      content.match(/^<script(.*)<\/script>$/)
    ) {
      const idVideos = storyVideoPlayerId(content)
      const urlAssignHttp = idVideos[1]
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

  componentDidMount() {
    if (this.URL) {
      appendToBody(createScript({ src: this.URL, async: true }))
    }

    if (this.URL_VIDEO) {
      const { content } = this.props
      const idVideo = storyVideoPlayerId(content)
      const idElement =
        isDaznServicePlayer(content) && content.includes('id') && idVideo[2]
          ? `id_video_embed_${this.ID_VIDEO}`
          : `_${clearUrlOrCode(idVideo[2] || '').code || ''}`
      const myList = document.getElementById(idElement)
      appendToId(
        myList,
        createScript({
          src: content.includes('id')
            ? this.URL_VIDEO
            : clearUrlOrCode(idVideo[2]).clearUrl,
          async: true,
        })
      )
    }
  }

  render() {
    const { content } = this.props
    const idVideo = storyVideoPlayerId(content)

    const idVideoEmbed =
      isDaznServicePlayer(content) && content.includes('id') && idVideo[2]
        ? `id_video_embed_${idVideo[2]}`
        : `_${clearUrlOrCode(idVideo[2] || '').code || ''}`

    return (
      <>
        <div
          id={idVideoEmbed}
          className={classes.newsEmbed}
          dangerouslySetInnerHTML={{
            __html: isDaznServicePlayer(content)
              ? content.replace('performgroup', 'daznservices')
              : content,
          }}
        />
      </>
    )
  }
}

export default rawHTML
