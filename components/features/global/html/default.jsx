import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

@Consumer
class Html extends Component {

  componentDidMount(){
    const { freeHtml } = this.props.customFields
    if(freeHtml && freeHtml.includes('http://twitter.com')){
      const scriptCDN = freeHtml.slice(
        freeHtml.indexOf('<script'),
        freeHtml.lastIndexOf('</script>') + 9
      )
      const rgexpURL = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
      const getURL = rgexpURL.exec(scriptCDN)[0]
      const createScript = document.createElement("script");
      createScript.src = getURL
      createScript.async = true
      document.body.appendChild(createScript)
    }

    console.log('En Prod')
  }

  render() {
    const { customFields } = this.props
    const createMarkup = html => {
      return { __html: html }
    }
    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={createMarkup(customFields.freeHtml)} />
  }
}

Html.propTypes = {
  customFields: PropTypes.shape({
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
    }),
  }),
}

export default Html
