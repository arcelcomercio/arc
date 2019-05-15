import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import ExtraordinaryStoryGridChild from './_children/extraordinary-grid-stories'
import customFieldsExtern from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from '../_dependencies/data'

const API_URL = 'section-by-slug'
@Consumer
class ExtraordinaryStoryGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataStory: {},
      section1: {},
      section2: {},
      section3: {},
      section4: {},
    }
    this.isVideo = false

    this.initFetch()
  }

  /*componentDidMount() {
    const {
      globalContent,
      customFields: { sectionName },
    } = this.props
    const { section_name: hasSection } = globalContent || {}

    if (hasSection && (sectionName === '/' || sectionName === '')) {
      this.setState({ data: globalContent || {} })
    } //else this.fetch()
  }*/

  componentDidUpdate() {
    if (window.powaBoot && this.isVideo) {
      window.powaBoot()
    }
  }

  initFetch = () => {
    const {
      customFields: {
        urlStory = {},
        multimediaService = '',
        firstSection = {},
        secondSection = {},
        thirdSection = {},
        fourthSection = {},
      },
    } = this.props

    const {
      contentConfigValues: { website_url: uriStory = '' },
    } = urlStory
    if (uriStory && uriStory !== '') {
      const { fetched: fetchStory } = this.fetch(urlStory)
      fetchStory.then(response => {
        this.setState({ dataStory: response })
      })
    }
  }

  fetch({ contentService = '', contentConfigValues = {} }, schema) {
    return this.getContent(contentService, contentConfigValues, schema)
  }

  render() {
    const { arcSite } = this.props
    const {
      data: { content_elements: contentElements = [] },
    } = this.state

    const formattedData = new Data(customFields, data, arcSite)
    this.isVideo = formattedData.isVideo

    const params = {
      arcSite,
    }
    return <ExtraordinaryStoryGridChild {...params} />
  }
}

ExtraordinaryStoryGrid.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryGrid.label = 'Apertura extraordinaria con grilla'

export default ExtraordinaryStoryGrid
