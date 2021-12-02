import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import StoryData from '../../../utilities/story-data'
import Headband from './_children/headband'
import Multimedia from './_children/multimedia'
import Title from './_children/title'

const classes = {
  container: 'story-header',
}
const StoryHeader: FC = (props) => {
  const {
    arcSite,
    contextPath,
    deployment,
    globalContent: data,
  } = useAppContext()
  const {
    customFields: { headbandTag, headband, headerType = '' } = {},
  } = props

  const { multimedia, title, multimediaCaption, section } = new StoryData({
    data,
    contextPath,
    deployment,
    arcSite,
  })

  return (
    <div className={`${classes.container} ${headerType}`}>
      <Headband tag={headbandTag || 'Ahora:'} text={headband || section} />
      <Title text={title} />
      <Multimedia
        width="787"
        heigth="442"
        caption={multimediaCaption}
        // credit="creditos"
        src={multimedia}
      />
    </div>
  )
}

StoryHeader.propTypes = {
  customFields: PropTypes.shape({
    headbandTag: PropTypes.string.tag({
      name: 'Tag de cintillo',
    }),
    headband: PropTypes.string.tag({
      name: 'Cintillo',
    }),
    headerType: PropTypes.oneOf(['liveblognews']).tag({
      name: 'Tipo de header',
      labels: {
        liveblognews: 'Liveblog News',
      },
      defaultValue: 'liveblognews',
    }),
  }),
}

StoryHeader.label = 'Destaques - Cabeceras'
StoryHeader.static = true
export default StoryHeader
