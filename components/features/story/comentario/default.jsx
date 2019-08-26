import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import StoryData from '../../../utilities/story-data'
import customFields from './_dependencies/custom-fields'
import {
  createScript,
  appendToBody,
  deleteQueryString,
} from '../../../utilities/helpers'

const classes = {
  story: 'w-full text-white pt-20 pr-20 pl-20 ',
  spotim: 'story-spotim pt-20 pr-20 pl-20',
  spotimScript: 'story-spotim-script pt-20 pr-20 pl-20',
}

@Consumer
class StoryComentario extends PureComponent {
  componentDidMount() {
    const {
      customFields: { comment = '', spotId = 'sp_LX2WRR7S' } = {},
    } = this.props

    if (
      comment === 'spotim' &&
      document.querySelector('.story-spotim-script')
    ) {
      const recirculation = `https://recirculation.spot.im/spot/${spotId}`
      const launcher = `https://launcher.spot.im/spot/${spotId}`
      const URL = 'https://statics.ecoid.pe/js/spotim.js?ver=2.06'
      appendToBody(createScript({ src: URL, defer: true }))

      const nodeRecirculation = createScript({
        src: recirculation,
        async: true,
      })
      document.querySelector('.story-spotim-script').before(nodeRecirculation)
      const idnota = document.querySelector('meta[name="data-article-id"]')

      const node = createScript({ src: launcher, async: true })
      node.setAttribute('data-spotim-module', 'spotim-launcher')
      node.setAttribute(
        'data-post-url',
        deleteQueryString(window.location.href)
      )
      node.setAttribute('data-post-id', idnota.content)
      document.querySelector('.story-spotim-script').before(node)
    }
  }

  render() {
    const {
      contextPath,
      globalContent: data,
      siteProperties: { siteUrl } = {},
      customFields: { comment = '', spotId = 'sp_LX2WRR7S', excluir = '' } = {},
    } = this.props

    const { link, comments, primarySection } = new StoryData({
      data,
      contextPath,
    })
    const excluirArray = excluir.split('|')
    const excluirComment = excluirArray.indexOf(primarySection)
    return (
      <>
        {comment === 'faceboosk' && (
          <div className={classes.story}>
            <div
              className="fb-comments"
              data-href={`${siteUrl}${link}`}
              data-numposts="5"
            />
          </div>
        )}
        {comment === 'spotim' && comments && excluirComment === -1 && (
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

export default StoryComentario
