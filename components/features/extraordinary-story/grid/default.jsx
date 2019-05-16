import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import ExtraordinaryGridStoryChild from './_children/extraordinary-grid-stories'
import customFieldsExtern from './_dependencies/custom-fields'
import { schemaStory, schemaSection } from './_dependencies/schemas-filter'
import Data from '../_dependencies/data'
import SectionData from '../../../utilities/section-data'

@Consumer
class ExtraordinaryStoryGrid extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      storyData: {},
      section1: {},
      section2: {},
      section3: {},
      section4: {},
    }
    this.isVideo = false
    this.initFetch()
  }

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
      arcSite = '',
    } = this.props

    if (multimediaService === Data.AUTOMATIC) {
      this.fetch(urlStory, schemaStory(arcSite), 'storyData')
    }

    this.fetch(firstSection, schemaSection, 'section1')
    this.fetch(secondSection, schemaSection, 'section2')
    this.fetch(thirdSection, schemaSection, 'section3')
    this.fetch(fourthSection, schemaSection, 'section4')
  }

  fetch(contentConfig, schema, stateProperty) {
    const { contentService = '', contentConfigValues = {} } = contentConfig
    const hasSection =
      Object.prototype.hasOwnProperty.call(contentConfigValues, '_id') &&
      contentConfigValues._id !== ''
    const hasStory =
      Object.prototype.hasOwnProperty.call(
        contentConfigValues,
        'website_url'
      ) && contentConfigValues.website_url !== ''

    if (hasSection || hasStory) {
      const { fetched } = this.getContent(
        contentService,
        contentConfigValues,
        schema
      )
      fetched
        .then(response => {
          this.setState({ [stateProperty]: response })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  render() {
    const { arcSite, customFields } = this.props
    const { storyData, section1, section2, section3, section4 } = this.state

    const formattedStoryData = new Data(customFields, storyData, arcSite)
    const formattedSection1 = new SectionData(section1, arcSite)
    const formattedSection2 = new SectionData(section2, arcSite)
    const formattedSection3 = new SectionData(section3, arcSite)
    const formattedSection4 = new SectionData(section4, arcSite)
    this.isVideo = formattedStoryData.isVideo

    const params = {
      arcSite,
      storyData: formattedStoryData,
      section1: formattedSection1,
      section2: formattedSection2,
      section3: formattedSection3,
      section4: formattedSection4,
    }
    return <ExtraordinaryGridStoryChild {...params} />
  }
}

ExtraordinaryStoryGrid.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryGrid.label = 'Apertura extraordinaria con grilla'

export default ExtraordinaryStoryGrid
