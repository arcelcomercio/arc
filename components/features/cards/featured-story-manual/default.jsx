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
    /* console.log('note3', note3) */
    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })

    const { schema } = this.storyFormatter

    const source = 'story-by-url'

    const actualDate = new Date().getTime()

    const scheduledNotes = [
      {
        path: note1,
        date: date1,
      },
      {
        path: note2,
        date: date2,
      },
      {
        path: note3,
        date: date3,
      },
    ]
      .filter(el => el.path && el.date)
      .filter(el => actualDate > el.date)
      .sort((a, b) => (b.date > a.date ? 1 : -1))

    /* console.log(
      scheduledNotes.map(el => {
        return new Date(el.date)
      })
    ) */

    const currentNotePath =
      scheduledNotes.length > 0 ? scheduledNotes[0].path : path

    /* console.log('currentNotePath', currentNotePath) */

    this.fetchContent({
      data: {
        source,
        query: {
          website_url: currentNotePath,
        },
        filter: schema,
      },
    })
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

    const { data = {} } = this.state || {}

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
