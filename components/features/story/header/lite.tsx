import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import ShareButtons from '../../../global-components/lite/share/index'
import StoryData from '../../../utilities/story-data'
import Description from './_children/description'
import Headband from './_children/headband'
import Headsubscription from './_children/headsubscription'
import Multimedia from './_children/multimedia'
import Title from './_children/title'

const classes = {
  container: 'story-header',
  box: 'story-header__box',
}
const StoryHeader: FC = (props) => {
  const {
    arcSite,
    contextPath,
    deployment,
    globalContent: data,
  } = useAppContext()
  const {
    customFields: {
      headbandTag,
      headband,
      headerType = '',
      linktext = '',
      link = '',
    } = {},
  } = props

  const {
    multimedia,
    title,
    multimediaCaption,
    section,
    subTitle,
  } = new StoryData({
    data,
    contextPath,
    deployment,
    arcSite,
  })

  const LiveblogNews = () => (
    <>
      <Headband tag={headbandTag || 'Ahora:'} text={headband || section} />
      <Title text={title} />
      <Multimedia
        width="787"
        heigth="442"
        caption={multimediaCaption}
        // credit="creditos"
        src={multimedia}
      />
    </>
  )

  const EspecialB = () => (
    <>
      <Headsubscription />
      <Headband tag={headbandTag} text={headband || section} />
      <div className={classes.box}>
        <Title text={title} />
        <Description text={subTitle} linktext={linktext} link={link} />
      </div>
      <ShareButtons />
      <Multimedia
        width="1366"
        heigth="768"
        caption={multimediaCaption}
        // credit="creditos"
        src={multimedia}
      />
    </>
  )

  const getComponentHeader = (type: string) => {
    if (type === 'liveblognews') {
      return <LiveblogNews />
    }
    if (type === 'especialb') {
      return <EspecialB />
    }
    return <></>
  }

  return (
    <div className={`${classes.container} ${headerType}`}>
      {getComponentHeader(headerType)}
    </div>
  )
}

StoryHeader.propTypes = {
  customFields: PropTypes.shape({
    headerType: PropTypes.oneOf(['liveblognews', 'especialb']).tag({
      name: 'Tipo de header',
      labels: {
        liveblognews: 'Liveblog News',
        especialb: 'Especial B',
      },
      defaultValue: 'liveblognews',
    }),
    headbandTag: PropTypes.string.tag({
      name: 'Tag de cintillo',
    }),
    headband: PropTypes.string.tag({
      name: 'Cintillo',
    }),
    linktext: PropTypes.string.tag({
      name: 'Texto del link',
      group: 'Especial B',
    }),
    link: PropTypes.string.tag({
      name: 'Link',
      group: 'Especial B',
    }),
  }),
}

StoryHeader.label = 'Destaques - Cabeceras'
StoryHeader.static = true
export default StoryHeader
