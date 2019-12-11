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
    const { customFields: { freeHtml = '', adsSpace } = {} } = this.props

    if (adsSpace && adsSpace !== 'none') {
      this.fetchContent({
        adsSpaces: {
          source: 'get-ads-spaces',
          query: { space: adsSpace },
        },
      })
    }

    // TODO: separar en funciones puras
    if (freeHtml) {
      const contentTwitter = freeHtml.includes('https://twitter.com')
      if (contentTwitter) {
        const scriptCDN = freeHtml.slice(
          freeHtml.indexOf('<script'),
          freeHtml.lastIndexOf('</script>') + 9
        )
        const rgexpURL = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
        const match = rgexpURL.exec(scriptCDN)
        const url = match && match.length > 0 ? match[0] : ''
        appendToBody(createScript({ src: url, async: true }))
      }
    }
  }

  getAdsSpace() {
    const { adsSpaces = {} } = this.state || {}
    const { customFields: { adsSpace } = {} } = this.props

    const toDate = dateStr => {
      const [date, time] = dateStr.split(' ')
      const [day, month, year] = date.split('/')
      return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
    }

    if (adsSpaces[adsSpace]) {
      const [currentSpace] = adsSpaces[adsSpace] || []
      const {
        fec_inicio: fecInicio,
        fec_fin: fecFin,
        des_html: desHtml,
      } = currentSpace
      const currentDate = new Date()
      const initDate = toDate(fecInicio)
      const endDate = toDate(fecFin)

      return currentDate > initDate && endDate > currentDate ? desHtml : false
    }

    return false
  }

  render() {
    const {
      outputType,
      isAdmin,
      customFields: { freeHtml = '', adsBorder = '' } = {},
    } = this.props

    const addEmptyBorder = () =>
    adsBorder === 'containerp' ? 'container-publicidad' : ''

    const addEmptyBackground = () => (!freeHtml && isAdmin ? 'bg-gray-200' : '')

    if (this.getAdsSpace()) {
      return (
        <div
          className={addEmptyBorder()}
          dangerouslySetInnerHTML={createMarkup(this.getAdsSpace())}
        />
      )
    }
    return (
      <div className={` ${classes.htmlContainer} `}>
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
