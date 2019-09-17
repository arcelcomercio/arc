import React, { PureComponent } from 'react'
import { createScript, appendToBody } from '../../../../utilities/helpers'

const classes = {
  newsEmbed: 'story-content__embed',
}

class rawHTML extends PureComponent {
  constructor(props) {
    super(props)
    const { content } = this.props
    this.newContent = ''
    this.URL = ''
    if (content.includes('widgets.js')) {
      const beginURL = content.indexOf('<script')
      const endURL = content.lastIndexOf('</script>')
      const script = content.slice(beginURL, endURL + 9)
      const scriptResult = script.replace('src="//', 'src="https://')
      this.newContent = content.replace(scriptResult, '')
      const rgexpURL = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
      const [URI] = rgexpURL.exec(scriptResult) || []
      this.URL = URI
    } else {
      this.newContent = content
    }
  }

  componentDidMount() {
    if (this.URL) {
      appendToBody(createScript({ src: this.URL, async: true }))
    }
  }

  render() {
    const { content } = this.props
    return (
      <div
        className={classes.newsEmbed}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }
}

export default rawHTML
