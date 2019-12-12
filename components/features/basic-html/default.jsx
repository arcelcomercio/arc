import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import customFields from './_dependencies/custom-fields'
import {
  createMarkup,
  createScript,
  appendToBody,
  appendToId,
  storyVideoPlayerId
} from '../../utilities/helpers'

// TODO: aplicar context para usar solo customFields
const classes = {
  htmlContainer: 'htmlContainer overflow-x-auto overflow-y-hidden',
  newsEmbed: 'story-content__embed',
}

const isDaznServicePlayer = content =>
  content.includes('player.daznservices.com/') ||
  content.includes('player.performgroup.com/')

const clearUrlOrCode = (url = '') => {
  const clearUrl = url
    .trim()
    .replace('"', '')
    .replace('"', '')
  return { clearUrl, code: clearUrl.split('#')[1] }
}

@Consumer
class BasicHtml extends PureComponent {

  constructor(props) {

    super(props)
    const { customFields: { freeHtml = '' } = {} } = this.props
    this.ID_VIDEO = ''
    this.URL_VIDEO = ''

    if (
      isDaznServicePlayer(freeHtml) &&
      freeHtml.trim().match(/^<script(.*)<\/script>$/)
    ) {
      const idVideos = storyVideoPlayerId(freeHtml)
      const urlAssignHttp = freeHtml.includes('player.daznservices.com/')
        ? idVideos[1].replace('src="//', 'https://')
        : idVideos[1]
          .replace('src="//', 'https://')
          .replace('performgroup', 'daznservices')

      this.URL_VIDEO = freeHtml.includes('id')
        ? `${urlAssignHttp}id=${idVideos[2]}`
        : `${urlAssignHttp}`

      this.ID_VIDEO = freeHtml.includes('id') && `${idVideos[2]}`
    }
  }

  componentDidMount() {
    const { customFields: { freeHtml = '', adsSpace } = {} } = this.props

    // DaznService Video Player
    if (this.URL) {
      appendToBody(createScript({ src: this.URL, async: true }))
    }
    if (this.URL_VIDEO) {
      const idVideo = storyVideoPlayerId(freeHtml)
      const idElement =
        isDaznServicePlayer(freeHtml) && freeHtml.includes('id') && idVideo[2]
          ? `id_video_embed_${this.ID_VIDEO}`
          : `_${clearUrlOrCode(idVideo[2] || '').code || ''}`
      const myList = document.getElementById(idElement)
      appendToId(
        myList,
        createScript({
          src: freeHtml.includes('id')
            ? this.URL_VIDEO
            : clearUrlOrCode(idVideo[2]).clearUrl,
          async: true,
        })
      )
    }

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

    // DaznService Player
    if (isDaznServicePlayer(freeHtml)) {

      const idVideo = storyVideoPlayerId(freeHtml)

      const idVideoEmbed =
        isDaznServicePlayer(freeHtml) && freeHtml.includes('id') && idVideo[2]
          ? `id_video_embed_${idVideo[2]}`
          : `_${clearUrlOrCode(idVideo[2] || '').code || ''}`

      return (<div className={classes.htmlContainer}>
        <div
          id={idVideoEmbed}
          className={classes.newsEmbed}
          dangerouslySetInnerHTML={{
            __html: isDaznServicePlayer(freeHtml)
              ? freeHtml.trim().replace('performgroup', 'daznservices')
              : freeHtml,
          }}
        />
      </div>
      )
    }

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
