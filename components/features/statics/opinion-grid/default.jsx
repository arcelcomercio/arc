import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'

import AuthorCard from './_children/author-card'
import EditorialCard from './_children/editorial-card'
import ListItem from './_children/list-item'
import CustomTitle from '../../custom-title/default'

// TODO: author-card y editorial-card pueden evitar código duplicado con un contenedor
const classes = {
  container: 'opinion-grid grid full-width',
  externalTitle: 'opinion-grid--title',
  list: 'opinion-grid--list full-width',
  titleBox: 'opinion-grid__box-title full-width',
  title: 'opinion-grid__title uppercase text-center',
  moreBox: 'opinion-grid__box-more flex justify-center',
  more: 'opinion-grid__more uppercase text-center',
}
@Consumer
class StaticOpinionGrid extends PureComponent {
  render() {
    const { globalContent, deployment, contextPath, arcSite } = this.props
    const { content_elements: contentElements } = globalContent || {}
    const stories = contentElements || []
    const data = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    return (
      <div>
        <div className={classes.title}>
          <CustomTitle />
        </div>
        <div className={classes.container}>
          {stories.slice(0, 12).map(story => {
            data.__data = story
            const { taxonomy: { primary_section: { name } = '' } = {} } =
              story || {}
            const section = name ? name.toUpperCase() : ''
            return section && section === 'EDITORIAL' ? (
              <EditorialCard
                key={`Editorial-card-${story._id}`}
                data={data.attributesRaw}
              />
            ) : (
              <AuthorCard
                key={`Author-card-${story._id}`}
                data={data.attributesRaw}
              />
            )
          })}
        </div>
        <div className={classes.list}>
          <div className={classes.titleBox}>
            <p className={classes.title}>ÚLTIMAS NOTICIAS</p>
          </div>
          {stories.slice(12).map(story => {
            data.__data = story
            return (
              <ListItem
                key={`List-item-${story._id}`}
                data={data.attributesRaw}
              />
            )
          })}
          <div className={classes.moreBox}>
            <a href="/archivo/opinion" className={classes.more}>
              Ver Más
            </a>
          </div>
        </div>
      </div>
    )
  }
}

StaticOpinionGrid.label = 'Grilla y listado de Opinión'
StaticOpinionGrid.static = true

export default StaticOpinionGrid
