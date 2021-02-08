/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'
import { separatorBasicFields } from '../../../utilities/included-fields'
import { getAssetsPath } from '../../../utilities/assets'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import StorySeparatorChildItem from './_children/item'

const classes = {
  storyInterest: 'story-interest w-full h-auto pr-20 pl-20',
  container: 'story-interest__container block w-full h-auto ',
  title:
    'story-interest__titleList block w-full h-auto font-bold mb-10 uppercase p-20 text-center md:text-left',
  list: 'story-interest__list flex pl-20 pr-20',
}

const CONTENT_SOURCE = 'story-feed-by-tag'

const InterestByTag = props => {
  const {
    customFields: {
      tagToFetch = '',
      renderDefault = true,
      titleDefault = 'Te puede interesar:',
    } = {},
  } = props

  const {
    arcSite,
    globalContent: dataContent,
    contextPath,
    deployment,
  } = useAppContext()

  const { tags: [{ slug = 'peru' } = {}] = [], id: excluir } = new StoryData({
    data: dataContent,
    contextPath,
  })

  const urlTag = `/${tagToFetch || slug}/`

  const { content_elements: storyData = [] } =
    useContent({
      source: CONTENT_SOURCE,
      query: {
        website: arcSite,
        name: urlTag,
        size: 5,
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
    })

  let key = 0

  const dataInterest = storyData
    .map(story => {
      return story && story._id !== excluir ? story : ''
    })
    .filter(String)

  const {
    assets: {
      premium: { logo },
    },
  } = getProperties(arcSite)

  const logoPremium = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/${logo}?d=1`

  return renderDefault && dataInterest && dataInterest[0] ? (
    <div className={classes.storyInterest}>
      <div className={classes.container}>
        <div className={classes.title}>{titleDefault}</div>
        <ul className={classes.list}>
          {dataInterest.map((story, i) => {
            if (key === 4) return false
            instance.__data = story
            key += 1

            return (
              <StorySeparatorChildItem
                key={UtilListKey(i)}
                title={instance.title}
                link={instance.websiteLink}
                section={instance.primarySection}
                sectionLink={instance.primarySectionLink}
                multimedia={instance.multimedia}
                multimediaType={instance.multimediaType}
                isPremium={instance.isPremium}
                arcSite={arcSite}
                logo={logoPremium}
              />
            )
          })}
        </ul>
      </div>
    </div>
  ) : null
}

InterestByTag.propTypes = {
  customFields,
}

InterestByTag.label = 'Artículo - Te puede interesar'
InterestByTag.static = true

export default InterestByTag
