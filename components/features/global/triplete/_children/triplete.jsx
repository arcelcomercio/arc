import React from 'react'
import Data from './data'
import Icon from './icon'

const classes = {
  triplete: 'triplete',
  tripleteItem: 'triplete__item',
  tripleteTitle: 'triplete__title',
  tripleteAuthor: 'triplete__author',
  tripleteMultimedia: 'triplete__multimedia',
}
const TripleteChildren = props => {
  const { customFields, state, website, editableField } = props
  const data = new Data(customFields, state, website)
  return (
    <div className={classes.triplete}>
      {[1, 2, 3].map(index => (
        <article
          className={`${classes.tripleteItem} ${classes.tripleteItem}--${
            data.multimediaOrientation
          }`}
        >
          <div className={classes.tripleteTitle}>
            <h2>
              <a href={data.getLink(index)} {...editableField(`title${index}`)}>
                {data.getTitle(index)}
              </a>
            </h2>
          </div>
          <figure className={classes.tripleteMultimedia}>
            <a href={data.getLink(index)}>
              <img src={data.getMultimedia(index)} alt={data.getTitle(index)} />
            </a>
            <Icon iconClass={data.getIconClass(index)} />
          </figure>
          <div className={classes.tripleteAuthor}>
            <a href={data.authorOrSectionLink(index)}>
              {data.authorOrSection(index)}
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

export default TripleteChildren
