import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'

@Consumer
class CardFeaturedStoryManual extends PureComponent {
  constructor(props) {
    super(props)
    const {
      arcSite,
      deployment,
      contextPath,
      customFields: { path, note1, date1, note2, date2, note3, date3 } = {},
    } = this.props
    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })

    const { schema } = this.storyFormatter

    const source = 'story-by-url'

    const fetchDataModel = data => {
      return {
        source,
        query: {
          website: arcSite,
          website_url: data,
        },
        filter: schema,
      }
    }

    const fetchData = {}
    if (path) fetchData.data = fetchDataModel(path)
    if (note1) fetchData.nota1 = fetchDataModel(note1)
    if (note2) fetchData.nota2 = fetchDataModel(note2)
    if (note3) fetchData.nota3 = fetchDataModel(note3)
    if (fetchData !== {}) this.fetchContent(fetchData)
  }

  render() {
    const {
      editableField,
      arcSite,
      customFields: {
        imageSize,
        headband,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
        imgField,
      } = {},
    } = this.props

    const { data = {}, note1 = {}, note2 = {}, note3 = {} } = this.state || {}

    const datePublishDefault = new Date(`${data.publish_date}`)
    const datePublishNote1 = new Date(`${note1.publish_date}`)
    const datePublishNote2 = new Date(`${note2.publish_date}`)
    const datePublishNote3 = new Date(`${note3.publish_date}`)

    const arrDate = [
      {
        date: datePublishDefault,
        note: data,
      },
      {
        date: datePublishNote1,
        note: note1,
      },
      {
        date: datePublishNote2,
        note: note2,
      },
      {
        date: datePublishNote3,
        note: note3,
      },
    ]

    // const printNote = arrDate.reduce((prev, acc, arr) => {
    //   return prev.date > acc.date ? prev.note : arr[0].note
    // })

    const formattedData = this.storyFormatter.formatStory(data, imgField)
    const { category, title, author, image, multimediaType } = formattedData

    const params = {
      title,
      category,
      author,
      image,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      editableField,
      titleField,
      categoryField,
      arcSite,
      multimediaType,
    }
    return <FeaturedStory {...params} />
  }
}

CardFeaturedStoryManual.propTypes = {
  customFields,
}

CardFeaturedStoryManual.label = 'Destaque por URL'
CardFeaturedStoryManual.static = true

export default CardFeaturedStoryManual
