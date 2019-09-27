import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import LiveStreaming from './_children/streaming-live'
import { getPhotoId } from '../../../utilities/helpers'

const PHOTO_SOURCE = 'photo-by-id'

const PHOTO_SCHEMA = `{
  resized_urls { 
    landscape_l 
    landscape_md
    portrait_md 
    square_s 
    lazy_default  
  }
}`
@Consumer
class CardFeaturedStoryManualLive extends PureComponent {
  constructor(props) {
    super(props)
    const {
      arcSite,
      isAdmin,
      deployment,
      contextPath,
      customFields: {
        imgField,
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
      if (note1 !== '') {
        this.fetchContent({
          auxNote1: {
            source,
            query: {
              website_url: note1,
              published: 'false',
            },
            filter,
          },
        })
      }

      if (note2 !== '') {
        this.fetchContent({
          auxNote2: {
            source,
            query: {
              website_url: note2,
              published: 'false',
            },
            filter,
          },
        })
      }

      if (note3 !== '') {
        this.fetchContent({
          auxNote3: {
            source,
            query: {
              website_url: note3,
              published: 'false',
            },
            filter,
          },
        })
      }

      const { auxNote1 = {}, auxNote2 = {}, auxNote3 = {} } = this.state || {}
      const dateNote1 = auxNote1.publish_date && new Date(auxNote1.publish_date)
      const dateNote2 = auxNote2.publish_date && new Date(auxNote2.publish_date)
      const dateNote3 = auxNote3.publish_date && new Date(auxNote3.publish_date)

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
      return arrError
    }

    if (isAdmin) {
      this.errorList = validateScheduledNotes()
    }

    if (imgField) {
      const photoId = getPhotoId(imgField)
      if (photoId) {
        this.fetchContent({
          customPhoto: {
            source: PHOTO_SOURCE,
            query: {
              _id: photoId,
            },
            filter: PHOTO_SCHEMA,
          },
        })
      }
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
      contextPath,
      deployment,
      customFields: {
        imageSize,
        headband,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
        imgField,
        flagLive,
        platformLive,
        urlVideo,
        path = '',
      } = {},
      siteProperties: { siteName = '' } = {},
    } = this.props

    const { customPhoto = {}, data = {}, defaultData = {} } = this.state || {}

    // Si la data no existe usar el estado defaultData
    const existingData = data._id ? data : defaultData
    // //////////////////////////////////////////////
    const formattedData = this.storyFormatter.formatStory(
      existingData,
      imgField,
      customPhoto
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
      siteName,
      errorList: this.errorList || [],
    }

    const paramsLive = {
      arcSite,
      contextPath,
      deployment,
      platformLive,
      urlVideo,
    }

    return (
      <>
        {!flagLive && <FeaturedStory {...params} />}
        {flagLive && <LiveStreaming {...paramsLive} />}
      </>
    )
  }
}

CardFeaturedStoryManualLive.propTypes = {
  customFields,
}

CardFeaturedStoryManualLive.label = 'Destaque por URL / En Vivo'
CardFeaturedStoryManualLive.static = true

export default CardFeaturedStoryManualLive
