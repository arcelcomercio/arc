import * as React from 'react'

import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
// seguro hay que cambiar algunos children
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import StoryItemChild from './_lite/_children/item'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'
import { SITE_ELCOMERCIOMAG } from '../../../utilities/constants/sitenames'
import { separatorBasicFields } from '../../../utilities/included-fields'

const classes = {
  storyInterest: 'st-interest',
  title: 'st-interest__title',
  titleP: 'st-interest__title-p',
}

const CONTENT_SOURCE = 'story-feed-by-tag'

const InterestByTagAmp = props => {
  const { customFields: { tag = '', storiesQty = 4 } = {} } = props
  const {
    arcSite,
    globalContent: dataContent,
    contextPath,
    deployment,
    isAdmin,
    outputType,
  } = useAppContext()

  const { tags: [{ slug = 'peru' } = {}] = [], id: excluir } = new StoryData({
    data: dataContent,
    contextPath,
  })

  const urlTag = `/${tag || slug}/`
  const { content_elements: storyData = [] } =
    useContent({
      source: CONTENT_SOURCE,
      query: {
        website: arcSite,
        name: urlTag,
        size: storiesQty,
        presets: 'no-presets',
        includedFields: separatorBasicFields,
      },
      filter: schemaFilter(arcSite),
    }) || {}

  const instance =
    storyData &&
    new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

  let key = 0

  const dataInterest = storyData
    .map(story => {
      return story && story._id !== excluir ? story : ''
    })
    .filter(String)

  const isMag = arcSite === SITE_ELCOMERCIOMAG
  const linkSource = `&source=${isMag ? 'notepierdas' : 'tepuedeinteresar'}`
  const linkOutput = isMag ? '' : `&outputType=${outputType}`
  const sectionTitle = 'No te pierdas'

  const getSize = cant => {
    const dataStories = dataInterest.map((story, i) => {
      if (key === cant) return false
      instance.__data = story
      key += 1
      const link = `${
        instance.websiteLink
      }?ref=${outputType}&pos=${key}${linkSource}${
        instance.isPremium === false ? linkOutput : ''
      }`

      const data = {
        title: instance.title,
        subtitle: instance.subTitle,
        link,
        section: instance.primarySection,
        sectionLink: instance.primarySectionLink,
        image: instance.multimedia,
        multimediaType: instance.multimediaType,
        isAdmin,
      }
      return (
        <StoryItemChild data={data} key={UtilListKey(i)} arcSite={arcSite} />
      )
    })
    return dataStories
  }

  return (
    dataInterest &&
    dataInterest[0] && (
      <section className={classes.storyInterest}>
        <p className={classes.titleP}></p>
        <h2 className={classes.title}>{sectionTitle}</h2>
        <>{getSize(storiesQty)}</>
      </section>
    )
  )
}

InterestByTagAmp.propTypes = {
  customFields,
}

InterestByTagAmp.label = 'Artículo - Te puede interesar'
InterestByTagAmp.static = true

export default InterestByTagAmp
