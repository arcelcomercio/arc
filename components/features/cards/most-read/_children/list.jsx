import React from 'react'
import { useEditableContent } from 'fusion:content'
import CardMostReadItem from './item'

const classes = {
  mostRead: 'flex flex-col most-read bg-white lg:p-0',
  title: `most-read__title flex flex-row items-center bg-base-200 uppercase font-bold justify-between text-left text-white pr-20 pl-20 position-relative`,
  link: 'most-read__link',
  icon: 'most-read__icon icon-marca',
}

const CardMostReadChildList = props => {
  const { viewImage, stories, customTitle, isAdmin, customLink } = props
  const { editableField } = useEditableContent()

  return (
    <div role="list" className={classes.mostRead}>
      <h4 itemProp="name" className={classes.title}>
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
          const params = { item, viewImage, isAdmin }
          return <CardMostReadItem key={key} {...params} />
        })}
    </div>
  )
}

export default CardMostReadChildList
