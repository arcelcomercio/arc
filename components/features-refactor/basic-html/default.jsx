import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

@Consumer
class BasicHtml extends PureComponent {
  componentDidMount() {
    const {
      customFields: { freeHtml = '' },
    } = this.props
    const contentTwitter = freeHtml && freeHtml.includes('https://twitter.com')
    if (contentTwitter) {
      const scriptCDN = freeHtml.slice(
        freeHtml.indexOf('<script'),
        freeHtml.lastIndexOf('</script>') + 9
      )
      const rgexpURL = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
      const getURL = rgexpURL.exec(scriptCDN)[0]
      const createScript = document.createElement('script')
      createScript.src = getURL
      createScript.async = true
      document.body.appendChild(createScript)
    }
  }

  render() {
    const { customFields } = this.props
    return <div dangerouslySetInnerHTML={{ __html: customFields.freeHtml }} />
  }
}

BasicHtml.propTypes = {
  customFields: PropTypes.shape({
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
    }),
  }),
}

BasicHtml.label = 'HTML Básico'
BasicHtml.static = true

export default BasicHtml
