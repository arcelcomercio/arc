import React from 'react'
import { useFusionContext } from 'fusion:context'
import { storyTagsBbc } from '../../../utilities/tags'
import { getAssetsPath } from '../../../utilities/constants'

const classes = {
  bbcHead: 'bbc-head p-10',
}
const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'

const StoryBbc = () => {
  const { globalContent, contextPath, arcSite, deployment } = useFusionContext()
  const { taxonomy: { tags = [] } = {} } = globalContent || {}

  const imgBbcSource =
    deployment(
      `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/bbc_head.png`
    ) || ''

  const imgBbc =
    deployment(
      `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/bbc_head_fg.jpg`
    ) || ''

  return (
    <>
      {storyTagsBbc(tags) && (
        <figure className={classes.bbcHead}>
          <a href={URL_BBC} rel="nofollow noopener noreferrer" target="_blank">
            <picture>
              <source media="(max-width: 639px)" data-srcset={imgBbcSource} />
              <img alt="BBC" src={imgBbc} data-src={imgBbc} />
            </picture>
          </a>
        </figure>
      )}
    </>
  )
}

StoryBbc.label = 'Artículo - BBC'
StoryBbc.static = true

export default StoryBbc
