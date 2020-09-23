import React from 'react'
import { useEditableContent } from 'fusion:content'
import CardMostReadItem from './item'
import { getAssetsPath } from '../../../../../utilities/assets'

const classes = {
  mostRead: 'most-read f f-col ',
  title: `most-read__title f`,
  link: 'most-read__link',
  logo: 'most-read__logo',
  icon: 'most-read__icon ',
}

const CardMostReadChildList = props => {
  const {
    viewImage,
    stories,
    customTitle,
    customLink,
    contextPath,
    arcSite,
  } = props
  const { editableField } = useEditableContent()
  const logoSidebar = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/elcomercio/images/logo-sidebar.png?d=1`
  return (
    <div role="list" className={classes.mostRead}>
      <h4 itemProp="name" className={classes.title}>
        <img className={classes.logo} alt="logo" src={logoSidebar}></img>

        <span {...editableField('customTitle')}>
          <a
            itemProp="url"
            className={classes.link}
            href={customLink || '/archivo'}>
            {customTitle || 'Lo más visto'}
          </a>
        </span>
        <i className={classes.icon} />
      </h4>

      {stories &&
        stories.map((item, i) => {
          const key = `most-read-${i}-${item.id}`
          const params = { item, viewImage, arcSite }
          return <CardMostReadItem key={key} {...params} />
        })}
    </div>
  )
}

export default CardMostReadChildList
