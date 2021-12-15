import * as React from 'react'

import StoryContentsChildHighlightedQuotes from './custom-ec-blocks/highlighted-quotes'
import StoryContentsChildIntertitle from './custom-ec-blocks/intertitle'

const StoryContentChildCustomEcBlocks: React.FC<{
  data: any
}> = (props) => {
  const {
    data: { embed: { config: { block = '' } = {}, } = {}, } = {},
  } = props

  if (block === 'highlighted-quotes') {
    return (<StoryContentsChildHighlightedQuotes data={props.data} />)
  }
  if (block === 'intertitle') {
    return (<StoryContentsChildIntertitle data={props.data} />)
  }

  return null
}

export default StoryContentChildCustomEcBlocks
