import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import ExtraordinaryStoryGridChild from './_children/extraordinary-grid-stories'
import customFieldsExtern from './_dependencies/custom-fields'
import { schemaStory, schemaSection } from './_dependencies/schemas-filter'
import Data from '../_dependencies/data'

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
        urlStory: {
          contentService: serviceUrlStory = '',
          contentConfigValues: valuesUrlStory = {},
        } = {},
        multimediaService = '',
        multimediaSource = '',
        firstSection: {
          contentService: serviceFirstSection = '',
          contentConfigValues: valuesFirstSection = {},
        } = {},
        secondSection: {
          contentService: serviceSecondSection = '',
          contentConfigValues: valuesSecondSection = {},
        } = {},
        thirdSection: {
          contentService: serviceThirdSection = '',
          contentConfigValues: valuesThirdSection = {},
        } = {},
        fourthSection: {
          contentService: serviceFourthSection = '',
          contentConfigValues: valuesFourthSection = {},
        } = {},
      },
    } = this.props

    const { website_url: uriStory = '' } = valuesUrlStory
    if ((multimediaService === '' || multimediaService === 'default') && uriStory && uriStory !== '') {
      const { fetched: fetchStory } = this.fetch(
        serviceUrlStory,
        valuesUrlStory,
        schemaStory
      )
      fetchStory.then(response => {
        this.setState({ dataStory: response })
      })
    }

    /* const sections = []

    const { _id: slugSection = '' } = valuesFirstSection
    if (slugSection && slugSection !== '') {
      const { fetched: fetchFirstSection } = this.fetch(
        serviceFirstSection,
        valuesFirstSection,
        schemaSection
      )
    }

    const { _id: slugSection = '' } = valuesFirstSection
    if (slugSection && slugSection !== '') {
      const { fetched: fetchFirstSection } = this.fetch(
        serviceFirstSection,
        valuesFirstSection,
        schemaSection
      )
    } */
  }

  fetch(contentService, contentConfigValues, schema) {
    return this.getContent(contentService, contentConfigValues, schema)
  }

  render() {
    const { arcSite, customFields } = this.props
    const { dataStory } = this.state

    const formattedDataStory = new Data(customFields, dataStory, arcSite)
    this.isVideo = formattedDataStory.isVideo

    const params = {
      arcSite,
      dataStory: formattedDataStory,
    }
    console.log('dataStory')
    console.dir(dataStory)
    console.log('formattedDataStory')
    console.dir(formattedDataStory)
    return <ExtraordinaryStoryGridChild {...params} />
  }
}

ExtraordinaryStoryGrid.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryGrid.label = 'Apertura extraordinaria con grilla'

export default ExtraordinaryStoryGrid
