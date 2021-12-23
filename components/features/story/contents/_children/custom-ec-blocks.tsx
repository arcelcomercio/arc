import * as React from 'react'

import StoryContentsChildDespiece from './custom-ec-blocks/despiece'
import StoryContentsChildHighlightedQuotes from './custom-ec-blocks/highlighted-quotes'
import StoryContentsChildIntertitle from './custom-ec-blocks/intertitle'
import StoryContentsChildRankingItem from './custom-ec-blocks/ranking-item'
import StoryContentsChildRankingItemWithQuotes from './custom-ec-blocks/ranking-item-with-quotes'

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
  if (block === 'despiece') {
    return (<StoryContentsChildDespiece data={props.data} />)
  }
  if(block === 'ranking-item'){
    return (<StoryContentsChildRankingItem data={props.data} />)
  }
  if(block === 'ranking-item-with-quotes'){
    return (<StoryContentsChildRankingItemWithQuotes data={props.data} />)
  }

  return null
}

export default StoryContentChildCustomEcBlocks
