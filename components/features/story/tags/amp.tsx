import { useFusionContext } from 'fusion:context'
import React from 'react'

import { storyTagsBbc } from '../../../utilities/tags'
import StoryContentChildTags from './_children/tags'

const classes = {
  bbcHead: 'bbc-head',
}

const StoryTagsAmp = () => {
  const { globalContent, arcSite } = useFusionContext()
  const { taxonomy: { tags = [] } = {} } = globalContent || {}
  const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
  const imgBbc =
    'https://elcomercio.pe/resizer/Y9rKZd1sqJPCAxhHUsbA4lixQJo=/740x0/smart/filters:format(png):quality(100)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BSK5BMFDTBCMDDJNDOI45PWN3U.png'

  return (
    <>
      <StoryContentChildTags data={tags} arcSite={arcSite} isAmp />
      {storyTagsBbc(tags) && (
        <div className={classes.bbcHead}>
          <a href={URL_BBC} rel="nofollow noopener noreferrer" target="_blank">
            <amp-img
              alt="BBC"
              layout="responsive"
              width="560"
              height="34"
              src={imgBbc}
              data-src={imgBbc}
            />
          </a>
        </div>
      )}
    </>
  )
}

StoryTagsAmp.label = 'Artículo - Tags'
StoryTagsAmp.static = true

export default StoryTagsAmp
