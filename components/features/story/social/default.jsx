import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import StorySocialChildSocial from './_children/social'
import StorySocialChildSocialGestion from './_children/social-gestion' // TODO Salida de gestion
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'

const classes = {
  story: 'w-full text-white',
}
@Consumer
class StorySocial extends PureComponent {
  render() {
    const { contextPath, globalContent: data, arcSite } = this.props
    const { link } = new StoryData({
      data,
      contextPath,
    })

    return (
      <>
        <div className={classes.story}>
          {arcSite !== ConfigParams.SITE_GESTION ? ( // TODO Salida de gestion 30 de julio
            <StorySocialChildSocial url={link} />
          ) : (
            <StorySocialChildSocialGestion url={link} />
          )}
        </div>
      </>
    )
  }
}

StorySocial.label = 'Artículo - Redes Sociales'

export default StorySocial
