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
      customFields: {
        note1,
        date1,
        note2,
        date2,
        note3,
        date3,
        path = '',
      } = {},
    } = this.props

    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })

    const regex = /^http/g
    this.isExternalLink = regex.test(path)

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

    const currentNotePath =
      scheduledNotes.length > 0 ? scheduledNotes[0].path : path

    this.fetchContent({
      data: {
        source,
        query: {
          website_url: currentNotePath,
        },
        filter: schema,
        // Si la nota programada no existe o no está publicada, usar la nota del campo "URL" (path)
        // Esta nota se almacenará en el estado defaultData
        transform: data => {
          if (!data) {
            this.fetchContent({
              defaultData: {
                source,
                query: {
                  website_url: path,
                },
                filter: schema,
              },
            })
          }
          // /////////////////////////
          return data
        },
      },
    })
  }

  render() {
    const {
      editableField,
      arcSite,
      isAdmin,
      customFields: {
        imageSize,
        headband,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
        imgField,
        path = '',
      } = {},
    } = this.props

    const { data = {}, defaultData = {} } = this.state || {}

    // Si la data no existe usar el estado defaultData
    const existingData = data._id ? data : defaultData
    // //////////////////////////////////////////////
    const formattedData = this.storyFormatter.formatStory(
      existingData,
      imgField
    )
    const {
      category,
      title,
      author,
      multimediaLandscapeL,
      multimediaLandscapeMD,
      multimediaPortraitMD,
      multimediaSquareS,
      multimediaLazyDefault,
      multimediaType,
    } = formattedData

    if (this.isExternalLink) {
      title.url = path
      category.url = path
    }

    const params = {
      title,
      category,
      author,
      multimediaLandscapeL,
      multimediaLandscapeMD,
      multimediaPortraitMD,
      multimediaSquareS,
      multimediaLazyDefault,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      editableField,
      titleField,
      categoryField,
      arcSite,
      multimediaType,
      isAdmin,
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
