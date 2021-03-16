import React from 'react'
import { useFusionContext } from 'fusion:context'
import { storyTagsBbc } from '../../../utilities/tags'
import { getAssetsPath } from '../../../utilities/assets'

const classes = {
  bbcHead: 'bbc-head p-10',
}
const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'

const StoryBbc = () => {
  const { globalContent, contextPath, arcSite } = useFusionContext()
  const { taxonomy: { tags = [] } = {} } = globalContent || {}

  const imgBbcSource =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''

  const imgBbc =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/bbc_head_fg.jpg?d=1` || ''

  return (
    <>
      {storyTagsBbc(tags) && (
        <figure className={classes.bbcHead}>
          <a
            itemProp="url"
            href={URL_BBC}
            rel="nofollow noopener noreferrer"
            target="_blank">
            <picture>
              <source media="(max-width: 639px)" srcSet={imgBbcSource} />
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
