import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import ExtraordinaryStoryGridChild from './_children/extraordinary-grid-stories'
import customFieldsExtern from './_dependencies/custom-fields'
import { schemaStory, schemaSection } from './_dependencies/schemas-filter'
import Data from '../_dependencies/data'
//import ExtraordinaryStory from '../../../global-components/extraordinary-story'
import EmbedMultimedia from '../../../global-components/embed-multimedia'

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
    if (
      multimediaService !== '' &&
      multimediaSource !== '' &&
      uriStory &&
      uriStory !== ''
    ) {
      const { fetched: fetchStory } = this.fetch(
        serviceUrlStory,
        valuesUrlStory,
        schemaStory
      )
      fetchStory.then(response => {
        this.setState({ dataStory: response })
      })
    }

    const sections = []

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
    }
  }

  fetch(contentService, contentConfigValues, schema) {
    return this.getContent(contentService, contentConfigValues, schema)
  }

  render() {
    const { arcSite } = this.props
    const params = {
      arcSite,
    }
    // return <ExtraordinaryStory {...params} />
    return <ExtraordinaryStoryGridChild {...params} />
    /*return (
      <EmbedMultimedia
        type="image"
        source="http://resizer.shared.arcpublishing.com/NHM-72hdnyWwaCgLPbm23WBaXJA=/500x400/smart/arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/LH2OSHSE2RG3LCPS5HBSALKC3U.jpeg"
      />
    )*/
  }
}

ExtraordinaryStoryGrid.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryGrid.label = 'Apertura extraordinaria con grilla'

export default ExtraordinaryStoryGrid
