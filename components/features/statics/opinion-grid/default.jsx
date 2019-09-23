import React, { PureComponent,Component } from 'react'
import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'

import AuthorCard from './_children/author-card'
import EditorialCard from './_children/editorial-card'
import ListItem from './_children/list-item'
import CustomTitle from '../../custom-title/default'

// TODO: author-card y editorial-card pueden evitar código duplicado con un contenedor
const classes = {
  container: 'opinion-grid grid w-full m-0 mx-auto',
  externalTitle: 'opinion-grid--title pt-20 pb-20 pl-0 pr-0 m-0 mx-auto',
  list: 'opinion-grid--list w-full m-0 mx-auto',
  titleBox:
    'opinion-grid__box-title w-full pt-15 pb-15 border-b-1 border-solid border-gray md:pt-25 md:pb-25 md:pl-0 md:pr-0',
  title: 'opinion-grid__title uppercase text-center secondary-font title-xs',
  moreBox: 'flex justify-center pt-25 pb-15',
  more: 'opinion-grid__more uppercase text-center text-md text-gray-300',
}
@Consumer
class StaticOpinionGrid extends Component {
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
        <div role="list" className={classes.container}>
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
                {...{
                  key: `Author-card-${story._id}`,
                  data: data.attributesRaw,
                  deployment,
                  contextPath,
                  arcSite,
                }}
              />
            )
          })}
        </div>
        <div role="list" className={classes.list}>
          <div className={classes.titleBox}>
            <p className={classes.title}>ÚLTIMAS NOTICIAS</p>
          </div>
          {stories.slice(12).map(story => {
            data.__data = story
            return (
              <ListItem
                {...{
                  key: `List-item-${story._id}`,
                  data: data.attributesRaw,
                  deployment,
                  contextPath,
                  arcSite,
                }}
               
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
