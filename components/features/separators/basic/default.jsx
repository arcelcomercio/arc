import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import SeparatorList from './_children/separator'

/** TODO: Agregar editableField() al título del separador */

@Consumer
class SeparatorBasic extends PureComponent {
  constructor(props) {
    super(props)

    const {
      arcSite,
      customFields: {
        titleSeparator = '',
        titleLink = '/',
        section = '',
        htmlCode = '',
      } = {},
    } = props

    this.state = {
      device: this.setDevice(),
      titleSeparator,
      arcSite,
      titleLink,
      section,
      htmlCode,
      items: [],
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
    this.getContentApi()
  }

  getContentApi = () => {
    let newsNumber = 4
    const { device, section, titleSeparator } = this.state

    if (device === 'mobile') newsNumber = 1

    const { fetched } = this.getContent(
      'story-feed-by-section',
      {
        section,
        news_number: newsNumber,
      },
      schemaFilter
    )
    fetched
      .then(
        ({
          content_elements: contentElements,
          section_name: sectionName = '',
        }) => {
          this.setState({
            items: contentElements,
            titleSeparator: titleSeparator || sectionName || 'Últimas noticias',
          })
        }
      )
      .catch(e => {
        throw new Error(e)
      })
  }

  handleResize = () => {
    const wsize = window.innerWidth
    const { device } = this.state

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.getContentApi()
      // ------ Set the new state if you change from desktop to mobile
    } else if (wsize < 1024 && wsize >= 640 && device !== 'tablet') {
      this.setState({
        device: 'tablet',
      })
      this.getContentApi()
    } else if (wsize < 640 && device !== 'mobile') {
      // ------ Set the new state if you change from desktop to mobile
      this.setState({
        device: 'mobile',
      })
      this.getContentApi()
    }
  }

  setDevice = () => {
    const wsize = window.innerWidth

    if (wsize < 640) {
      return 'mobile'
    }
    if (wsize >= 640 && wsize < 1024) {
      return 'tablet'
    }
    return 'desktop'
  }

  render() {
    const { titleSeparator, arcSite, titleLink, htmlCode, items } = this.state
    return (
      <SeparatorList
        data={{ titleSeparator, arcSite, titleLink, htmlCode, items }}
      />
    )
    /**
     *    data: {
     *      titleSeparator,
     *      titleLink,
     *      htmlCode,
     *      items,
     *     }
     */
  }
}

SeparatorBasic.propTypes = {
  customFields,
}
SeparatorBasic.label = 'Separador Básico'

export default SeparatorBasic
