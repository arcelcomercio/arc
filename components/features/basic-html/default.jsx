import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import customFields from './_dependencies/custom-fields'
import {
  createMarkup,
  createScript,
  appendToBody,
} from '../../utilities/helpers'

// TODO: aplicar context para usar solo customFields
const classes = {
  htmlContainer: 'htmlContainer overflow-x-auto overflow-y-hidden',
}

@Consumer
class BasicHtml extends PureComponent {
  componentDidMount() {
    const { customFields: { freeHtml = '' } = {} } = this.props

    // TODO: separar en funciones puras
    if (freeHtml) {
      const contentTwitter = freeHtml.includes('https://twitter.com')
      if (contentTwitter) {
        const scriptCDN = freeHtml.slice(
          freeHtml.indexOf('<script'),
          freeHtml.lastIndexOf('</script>') + 9
        )
        const rgexpURL = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
        const url = rgexpURL.exec(scriptCDN)[0]
        appendToBody(createScript({ src: url, async: true }))
      }
    }
  }

  render() {
    const {
      outputType,
      isAdmin,
      customFields: { freeHtml = '' } = {},
    } = this.props

    const addEmptyBackground = () => (!freeHtml && isAdmin ? 'bg-gray-200' : '')

    return (
      <div className={classes.htmlContainer}>
        {freeHtml && outputType !== 'amp' && (
          <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />
        )}
        {!freeHtml && isAdmin && (
          <div
            dangerouslySetInnerHTML={createMarkup(freeHtml)}
            className={addEmptyBackground()}
          />
        )}
      </div>
    )
  }
}

BasicHtml.propTypes = {
  customFields,
}

BasicHtml.label = 'HTML Básico'

export default BasicHtml
