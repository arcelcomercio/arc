import React from 'react'
import StoriesListCardChildItem from './item'
import StoryData from '../../../../utilities/story-data'

const classes = {
  listItem: 'stories-list-card__list-item overflow-y-auto',
}

const StoriesListsCardChildList = ({
  seeHour,
  seeImageNews,
  listNews,
  deployment,
  arcSite,
  contextPath,
}) => {
  const elementFormatter = new StoryData({ deployment, arcSite, contextPath })
  return (
    <div className={classes.listItem}>
      {listNews.map((el, index) => {
        elementFormatter.__data = el
        const data = elementFormatter.attributesRaw
        const fechaPublicacion = new Date(data.date)
        let time = ''

        const fechapresente = new Date().getTime()

        if (
          (fechapresente - new Date(data.date).getTime()) / 1000 / 60 / 60 >=
          24
        ) {
          time = `${
            fechaPublicacion.getDate() < 10
              ? `0${fechaPublicacion.getDate()}`
              : fechaPublicacion.getDate()
          }/${
            fechaPublicacion.getMonth() < 10
              ? `0${fechaPublicacion.getMonth()}`
              : fechaPublicacion.getMonth()
          }/${fechaPublicacion.getFullYear()}`
        } else {
          time = `${fechaPublicacion.getHours()}:${
            fechaPublicacion.getMinutes() < 10
              ? `0${fechaPublicacion.getMinutes()}`
              : fechaPublicacion.getMinutes()
          }-`
        }

        return (
          <StoriesListCardChildItem
            key={data.link}
            seeHour={seeHour}
            seeImageNews={
              seeImageNews === true && index === 0 /* ? true : false */
            }
            time={time}
            title={data.title}
            urlNews={data.link}
            multimedia={data.multimedia}
            multimediaType={data.multimediaType}
          />
        )
      })}
    </div>
  )
}

export default StoriesListsCardChildList
