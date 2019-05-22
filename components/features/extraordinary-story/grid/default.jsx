import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import ExtraordinaryStoryGridChild from './_children/extraordinary-story-grid'
import customFields from './_dependencies/custom-fields'
import { storySchema, sectionSchema } from './_dependencies/schemas-filter'
import Data from '../_dependencies/data'
import SectionData from '../../../utilities/section-data'

@Consumer
class ExtraordinaryStoryGrid extends Component {
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

  componentDidMount() {
    if (window.powaBoot && this.isVideo) {
      window.powaBoot()
    }
  }

  initFetch = () => {
    const { customFields: customFieldsData = {}, arcSite = '' } = this.props

    const { urlStory = {}, multimediaService = '' } = customFieldsData

    if (multimediaService === Data.AUTOMATIC) {
      const { fetched: fetchStory = {} } = this.fetch(
        urlStory,
        storySchema(arcSite)
      )
      fetchStory.then(response => {
        this.setState({ storyData: response })
      })
    }

    const sections = {}
    const sectionsFetch = []
    for (let i = 1; i <= 4; i++) {
      const { contentConfigValues: { _id = '' } = {} } =
        customFieldsData[`section${i}`] || {}
      if (_id !== '') {
        sections[`section${i}`] = _id
        const { fetched } = this.fetch(
          customFieldsData[`section${i}`],
          sectionSchema
        )
        sectionsFetch.push(fetched)
      }
    }

    if (sectionsFetch.length > 0) {
      Promise.all(sectionsFetch)
        .then(results => {
          const jsonSections = {}
          results.forEach(res => {
            const { _id = '' } = res || {}
            const sectionActive = Object.keys(sections)[
              Object.values(sections).indexOf(_id)
            ]
            jsonSections[sectionActive] = res || {}
          })
          this.setState(jsonSections)
        })
        .catch(err => {
          throw new Error(err)
        })
    }
  }

  fetch(contentConfig, schema) {
    const { contentService = '', contentConfigValues = {} } = contentConfig
    return this.getContent(contentService, contentConfigValues, schema)
  }

  render() {
    const {
      deployment,
      contextPath,
      arcSite,
      customFields: customFieldsData,
    } = this.props
    const { storyData, section1, section2, section3, section4 } = this.state
    const formattedStoryData = new Data({
      customFields: customFieldsData,
      data: storyData,
      arcSite,
      deployment,
      contextPath,
      defaultImgSize: 'sm',
    })
    const formattedSection1 = new SectionData(section1, arcSite)
    const formattedSection2 = new SectionData(section2, arcSite)
    const formattedSection3 = new SectionData(section3, arcSite)
    const formattedSection4 = new SectionData(section4, arcSite)
    this.isVideo = formattedStoryData.isVideo
    const imgLogo = deployment(
      `${contextPath}/resources/assets/extraordinary-story/grid/logo.png`
    )

    const params = {
      storyData: formattedStoryData,
      section1: formattedSection1,
      section2: formattedSection2,
      section3: formattedSection3,
      section4: formattedSection4,
      deployment,
      contextPath,
      arcSite,
      imgLogo,
    }
    return <ExtraordinaryStoryGridChild {...params} />
  }
}

ExtraordinaryStoryGrid.propTypes = {
  customFields,
}

ExtraordinaryStoryGrid.label = 'Apertura extraordinaria con grilla'

export default ExtraordinaryStoryGrid
