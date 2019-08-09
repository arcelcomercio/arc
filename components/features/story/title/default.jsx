import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import StoryTitleChildHeading from './_children/heading'
import StoryTitleChildShareSubheading from './_children/subheading'
import StoryData from '../../../utilities/story-data'

const classes = {
  story: 'w-full text-white',
}
@Consumer
class StoryTitle extends PureComponent {
  render() {
    const { contextPath, globalContent: data } = this.props
    const { title, subTitle } = new StoryData({
      data,
      contextPath,
    })

    const parameters = { title, subTitle }
    return (
      <>
        <div className={classes.story}>
          <StoryTitleChildHeading {...parameters} />
          <StoryTitleChildShareSubheading {...parameters} />
        </div>
      </>
    )
  }
}

StoryTitle.label = 'Artículo - Titulo'
StoryTitle.static = true

export default StoryTitle
