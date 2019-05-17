import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import ExtraordinaryStoryGridChild from './_children/extraordinary-story-grid'
import customFields from './_dependencies/custom-fields'
import { storySchema, sectionSchema } from './_dependencies/schemas-filter'
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
    console.log(this.state)
  }

  initFetch = () => {
    const { customFields: customFieldsData = {}, arcSite = '' } = this.props

    const { urlStory = {}, multimediaService = '' } = customFieldsData

    if (multimediaService === Data.AUTOMATIC) {
      const { fetched: fetchStory } = this.fetch(urlStory, storySchema(arcSite))
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
        sectionsFetch.push(
          this.fetch(customFieldsData[`section${i}`], sectionSchema)
        )
      }
    }

    if (sectionsFetch.length > 0) {
      Promise.all(sectionsFetch)
        .then(response => {
          console.log('RESPONSE', response)
          const jsonSections = {}
          response.forEach(resp => {
            const { cached: data = {}, fetched } = resp
            console.log('FETCHED', fetched)
            const sectionActive = Object.keys(sections)[
              Object.values(sections).indexOf(data._id)
            ]
            // NO TOCAR: BY CARLOS
            if (data) jsonSections[sectionActive] = { ...data }
            else jsonSections[sectionActive] = {}
          })

          this.setState(jsonSections)
          // AHORA SI PUEDES TOCAR*/
        })
        .catch(err => {
          throw new Error(err)
        })
    }
  }

  fetch(contentConfig, schema) {
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
      return this.getContent(contentService, contentConfigValues, schema)
    }
    return new Promise((resolve, reject) => {
      reject(new Error('Url empty'))
    })
  }

  render() {
    const { arcSite, customFields: customFieldsData } = this.props
    const { storyData, section1, section2, section3, section4 } = this.state

    const formattedStoryData = new Data(customFieldsData, storyData, arcSite)
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
    return <ExtraordinaryStoryGridChild {...params} />
  }
}

ExtraordinaryStoryGrid.propTypes = {
  customFields,
}

ExtraordinaryStoryGrid.label = 'Apertura extraordinaria con grilla'

export default ExtraordinaryStoryGrid
