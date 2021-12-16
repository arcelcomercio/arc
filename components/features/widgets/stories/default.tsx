import { useContent } from 'fusion:content'
import * as React from 'react'
import { FC } from 'types/features'

import StoryWidget from './_children/stories'
import { stylesStoryWidget } from './_dependencies/styles'

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
  const dataStories: SPCStories[] =
    useContent({
      source: 'get-spc-stories',
      query: {},
    }) || {}

  return (
    <div id="SPC_Anchor_Content">
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
    </div>
  )
}

WidgetStories.static = true
WidgetStories.label = 'Stories'

export default WidgetStories
