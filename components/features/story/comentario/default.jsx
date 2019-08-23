import React, { PureComponent } from 'react'

import StoryData from '../../../utilities/story-data'
import customFields from './_dependencies/custom-fields'
import {
  createMarkup,
  createScript,
  appendToBody,
} from '../../../utilities/helpers'

const classes = {
  story: 'w-full text-white pt-20 pr-20 pl-20 ',
  spotim: 'story-spotim',
  spotimScript: 'story-spotim-script',
}

class StoryComentario extends PureComponent {
  componentDidMount() {
    const {
      customFields: { comment = '', spotId = 'sp_LX2WRR7S' } = {},
    } = this.props

    if (comment) {
      const recirculation = `https://recirculation.spot.im/spot/${spotId}`
      const launcher = `https://launcher.spot.im/spot/${spotId}`
      const URL = 'https://statics.ecoid.pe/js/spotim.js?ver=2.06'
      appendToBody(createScript({ src: URL, defer: true }))

      const nodeRecirculation = createScript({
        src: recirculation,
        async: true,
      })
      document.querySelector('.story-spotim-script').before(nodeRecirculation)

      const node = createScript({ src: launcher, async: true })
      node.setAttribute('data-spotim-module', 'spotim-launcher')
      node.setAttribute('data-post-url', window.location.href)
      node.setAttribute('data-post-id', 'ddd')
      document.querySelector('.story-spotim-script').before(node)
    }
  }

  render() {
    const {
      contextPath,
      globalContent: data,
      siteProperties: { siteUrl } = {},
      customFields: { comment = '', spotId = 'sp_LX2WRR7S' } = {},
    } = this.props

    const { websiteUrl, comments } = new StoryData({
      data,
      contextPath,
    })

    return (
      <>
        {comment === 'faceboosk' && (
          <div className={classes.story}>
            <div
              className="fb-comments"
              data-href={`${siteUrl}${websiteUrl}`}
              data-numposts="5"
            />
          </div>
        )}
        {comment === 'spotim' && (
          <>
            <div
              data-spotim-module="recirculation"
              data-spot-id={spotId}
              className={classes.spotim}
            />
            <div className={classes.spotimScript} />
          </>
        )}
      </>
    )
  }
}

StoryComentario.propTypes = {
  customFields,
}

StoryComentario.label = 'Artículo - Comentario'
// StoryComentario.static = true

export default StoryComentario
