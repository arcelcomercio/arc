import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'
import { CommetaryOptaWidget } from 'types/commentary-opta-widget'

import { getAssetsPath } from '../../utilities/assets'
import { localISODate } from '../../utilities/date-time/dates'
import StoryData from '../../utilities/story-data'

const formatWidgetDate = (entryDate?: string) => {
  // Por defecto el Widget está mandando la fecha con el timezone 'Europe/London' 'UTC+1'
  if (!entryDate) return ''
  const actualDate = new Date(`${entryDate} UTC+1`)
  return localISODate(actualDate)
}

const addHoursToDate = (hours: number, entryDate?: string) => {
  if (!entryDate) return ''
  const localDate = entryDate ? new Date(entryDate) : new Date()
  localDate.setHours(localDate.getHours() + hours)
  return localISODate(localDate)
}

const LiveBlogPostingData = (): JSX.Element => {
  const {
    siteProperties: { siteUrl, siteName, socialNetworks },
    arcSite,
    contextPath,
    globalContent,
  } = useFusionContext()

  const {
    title,
    subTitle,
    publishDate: updateDate,
    link,
    multimedia,
    author,
    authorLink,
  } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })

  const { resized_urls: { image = '' } = {} } =
    useContent(
      multimedia
        ? {
            source: 'photo-resizer',
            query: {
              url: multimedia,
              presets: 'image:1200x800',
            },
          }
        : {}
    ) || {}

  const widgetData: CommetaryOptaWidget =
    useContent({
      source: 'get-data-from-opta-widget',
      query: {
        url:
          'https://secure.widget.cloud.opta.net/v3/amp.html?w=widget~commentary%C2%A6competition~5%C2%A6season~2021%C2%A6match~2244604%C2%A6template~normal%C2%A6live~true%C2%A6data_type~auto%C2%A6order_by~time_descending%C2%A6show_event_icons~true%C2%A6show_minor_events~true%C2%A6fixed_height_comments~0%C2%A6show_live~true%C2%A6show_logo~true%C2%A6show_title~true%C2%A6breakpoints~400%C2%A6sport~football&s=782834e1fd5a215304e57cddad80b844&t=America%2FLima&l=es_CO',
      },
    }) || {}

  const startDate = formatWidgetDate(
    widgetData?.data?.Commentary?.['@attributes']?.game_date
  )
  const endDate = addHoursToDate(2, startDate)

  const logo: {
    [x: string]: {
      url: string
      width: string
      height: string
    }
  } = {
    elcomercio: {
      url: 'logo-elcomercio-388x60.png',
      width: '388',
      height: '60',
    },
    depor: {
      url: 'logo-amp.png',
      width: '230',
      height: '60',
    },
  }

  const graphSchema = {
    '@graph': [
      {
        '@type': 'Organization',
        '@id': '#organization',
        name: siteName,
        url: siteUrl,
        sameAs: socialNetworks
          ?.filter(
            ({ name }) =>
              name === 'facebook' || name === 'twitter' || name === 'instagram'
          )
          .map(({ url }) => url),
        logo: {
          '@type': 'ImageObject',
          '@id': '#logoImage',
          url: `${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/${
            logo?.[arcSite].url || 'logo-amp.png'
          }`,
          width: logo?.[arcSite].width || '230',
          height: logo?.[arcSite].height || '60',
        },
      },
      {
        '@type': 'LiveBlogPosting',
        '@id': '#liveBlogPosting',
        headline: title,
        description: subTitle,
        dateModified: localISODate(updateDate),
        url: `${siteUrl}${link}`,
        name: title,
        // about: {
        //   '@context': 'https://schema.org/',
        //   '@type': 'Event',
        //   name: subTitle,
        //   // TODO: validar si es correcto aplicar estas fechas
        //   startDate,
        //   endDate,
        //   // TODO: validar como generar esta data
        //   // location: { name: 'Peru -lima', address: 'Lima' },
        //   description: subTitle,
        //   eventAttendanceMode: `${siteUrl}${link}`,
        //   // TODO: validar que colocar en url de organizer
        //   organizer: { name: 'elcomercio', url: '' },
        //   // TODO: validar qie colocar en performer y eventStatus
        //   performer: 'xdfsdf ',
        //   eventStatus: 'envico',
        //   image: '',
        // },
        publisher: { '@type': 'Organization', '@id': '#organization' },
        coverageStartTime: startDate,
        image: [{ '@type': 'ImageObject', '@id': '#openingImage', url: image }],
        author: [
          {
            '@type': 'Person',
            '@id': '#author',
            name: author,
            url: authorLink,
          },
        ],
      },
    ],
    '@context': 'https://schema.org',
  }

  const LiveBlogPostingSchema = {
    '@type': 'LiveBlogPosting',
    '@id': '#liveBlogPosting',
    coverageEndTime: endDate,
    liveBlogUpdate: widgetData?.data?.Commentary?.message?.map(
      (messageItem) => ({
        '@type': 'BlogPosting',
        headline: title,
        datePublished: formatWidgetDate(
          messageItem?.['@attributes']?.timestamp
        ),
        dateModified: formatWidgetDate(
          messageItem?.['@attributes']?.last_modified
        ),
        alternateName: subTitle,
        mainEntityOfPage: { '@type': 'WebPage', '@id': '' },
        author: [{ '@id': '#author' }],
        publisher: { '@type': 'Organization', '@id': '#organization' },
        url: `${siteUrl}${link}`,
        articleBody: messageItem?.['@attributes']?.comment,
        image: { '@type': 'ImageObject', '@id': '#openingImage' },
      })
    ),
    '@context': 'https://schema.org',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LiveBlogPostingSchema),
        }}
      />
    </>
  )
}

export default LiveBlogPostingData
