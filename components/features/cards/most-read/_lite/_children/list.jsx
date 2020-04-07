import React from 'react'
import { useEditableContent } from 'fusion:content'
import CardMostReadItem from './item'

const classes = {
  mostRead: 'most-read f f-col ',
  title: `most-read__title f`,
  link: 'most-read__link',
  icon: 'most-read__icon ',
}

const CardMostReadChildList = props => {
  const { viewImage, stories, customTitle, isAdmin, customLink } = props
  const { editableField } = useEditableContent()

  return (
    <div role="list" className={classes.mostRead}>
      <h4 className={classes.title}>
        <span {...editableField('customTitle')}>
          <a className={classes.link} href={customLink || '/archivo'}>
            {customTitle || 'Lo más visto'}
          </a>
        </span>
        <i className={classes.icon} />
      </h4>

      {stories &&
        stories.map((item, i) => {
          const key = `most-read-${i}-${item.id}`
          const params = { item, viewImage, isAdmin }
          return <CardMostReadItem key={key} {...params} />
        })}
    </div>
  )
}

export default CardMostReadChildList
