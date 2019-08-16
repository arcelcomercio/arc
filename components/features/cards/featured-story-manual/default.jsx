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
      isAdmin,
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

    const validateScheduledNotes = () => {
      const filter = '{ publish_date }'
      this.fetchContent({
        nota1: {
          source,
          query: {
            website_url: note1,
            published: 'false',
          },
          filter,
        },
      })

      this.fetchContent({
        nota2: {
          source,
          query: {
            website_url: note2,
            published: 'false',
          },
          filter,
        },
      })

      this.fetchContent({
        nota3: {
          source,
          query: {
            website_url: note3,
            published: 'false',
          },
          filter,
        },
      })
      const { nota1 = {}, nota2 = {}, nota3 = {} } = this.state
      const dateNote1 = nota1.publish_date && new Date(nota1.publish_date)
      const dateNote2 = nota2.publish_date && new Date(nota2.publish_date)
      const dateNote3 = nota3.publish_date && new Date(nota3.publish_date)

      const arrError = []
      if (note1 !== '' && date1 < dateNote1) {
        arrError.push({
          note: 'Nota 1',
          publish_date: dateNote1,
          programate_date: date1,
        })
      }
      if (note2 !== '' && date2 < dateNote2) {
        arrError.push({
          note: 'Nota 2',
          publish_date: dateNote2,
          programate_date: date2,
        })
      }
      if (note3 !== '' && date3 < dateNote3) {
        arrError.push({
          note: 'Nota 3',
          publish_date: dateNote3,
          programate_date: date3,
        })
      }

      this.state = {
        errorList: arrError,
      }
    }

    if (isAdmin) {
      validateScheduledNotes()
    }

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

    const { errorList, data = {}, defaultData = {} } = this.state || {}

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
      errorList,
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
