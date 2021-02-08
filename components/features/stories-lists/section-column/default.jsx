import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import { sectionColumnsFields } from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Header from './_children/header'
import ListItem from './_children/item'

const classes = {
  container: 'sec-col bg-white flex flex-col',
  list: 'sec-col__list bg-white h-full',
}

const newsNumber = 4

const SectionColumnListCard = props => {
  const { arcSite, contextPath, deployment } = useAppContext()
  const {
    customFields: { section, titleList, urlTitle, background },
  } = props

  const params = {
    section,
    excludeSections: '/impresa',
    stories_qty: newsNumber,
    presets: 'no-presets',
    includedFields: sectionColumnsFields,
  }
  const data =
    useContent({
      source: 'story-feed-by-section',
      query: params,
      filter: schemaFilter(arcSite),
    }) || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
  })

  return (
    <div className={classes.container}>
      <Header
        titleList={titleList}
        urlTitle={urlTitle}
        background={background}
      />
      <div role="list" className={classes.list}>
        {data.content_elements
          ? data.content_elements.map((story, index) => {
              storyData.__data = story

              return (
                <ListItem
                  key={`section-col-${storyData.id}`}
                  seeImageNews={index === 0}
                  title={storyData.title}
                  urlNews={storyData.websiteLink}
                  multimedia={storyData.multimedia}
                  multimediaType={storyData.multimediaType}
                  author={storyData.author}
                  urlAutor={storyData.authorLink}
                />
              )
            })
          : null}
      </div>
    </div>
  )
}

SectionColumnListCard.propTypes = {
  customFields,
}

SectionColumnListCard.label = 'Noticias por sección'
SectionColumnListCard.static = true

export default SectionColumnListCard
