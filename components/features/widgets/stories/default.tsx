import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'

import StoryWidget from './_children/stories'
import {
  stylesStoryWidget,
  stylesStoryWidgetMobile,
} from './_dependencies/styles'

interface SPCStories {
  anchorTitle: string
  country: string
  domain: string
  goggleUrl?: string
  id: string
  isBranded: boolean
  lastFrameImg: string
  link: string
  new: number
  parentLastFrameImg?: string
  parentThumbnail?: string
  parentTitle?: string
  separator?: number
  since: string
  slug: string
  target: string
  thumbnail: string
  title: string
  type: string
  url: string
}

const WidgetStories: FC = () => {
  const { arcSite } = useAppContext()

  const dataStories: SPCStories[] =
    useContent({
      source: 'get-spc-stories',
      query: {},
    }) || {}

  const { siteName } = getProperties(arcSite)

  return (
    <div id="SPC_Anchor_Content">
      <h1 className="stories-title">Stories {siteName}</h1>
      <div className="stories">
        {dataStories.map((story, index) => (
          <StoryWidget
            key={story.id}
            title={story.title}
            anchorTitle={story.anchorTitle}
            url={story.url}
            lastFrameImg={story.lastFrameImg}
            target={story.target}
            index={index}
          />
        ))}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: stylesStoryWidget,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: stylesStoryWidgetMobile,
        }}
      />
    </div>
  )
}

WidgetStories.static = true
WidgetStories.label = 'Stories'

export default WidgetStories
