import React, { PureComponent } from 'react'
import {
  createScript,
  appendToBody,
  appendToId,
  storyVideoPlayer,
} from '../../../../utilities/helpers'
import ConfigParams from '../../../../utilities/config-params'

const classes = {
  newsEmbed: 'story-content__embed',
}

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
    } else if (content.includes('player.daznservices.com/player.js')) {
      const idVideos = storyVideoPlayer(content)

      this.URL_VIDEO = `${ConfigParams.VIDEO_JS_LINK}${idVideos[2]}`

      this.ID_VIDEO = `${idVideos[2]}`
    } else {
      this.newContent = content
    }
  }

  componentDidMount() {
    if (this.URL) {
      appendToBody(createScript({ src: this.URL, async: true }))
    }

    if (this.URL_VIDEO) {
      const myList = document.getElementById(`id_video_embed_${this.ID_VIDEO}`)
      appendToId(
        myList,
        createScript({
          src: this.URL_VIDEO,
          async: true,
        })
      )
    }
  }

  render() {
    const { content } = this.props
    const idVideo = storyVideoPlayer(content)

    const idVideoEmbed =
      content.includes('player.daznservices.com/player.js') && idVideo[2]
        ? `id_video_embed_${idVideo[2]}`
        : '_'
    return (
      <>
        <div
          id={idVideoEmbed}
          className={classes.newsEmbed}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </>
    )
  }
}

export default rawHTML
