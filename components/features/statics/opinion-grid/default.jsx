import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'

import AuthorCard from './_children/author-card'
import EditorialCard from './_children/editorial-card'
import ListItem from './_children/list-item'
import CustomTitle from '../../custom-title/default'
import Ads from '../../../global-components/ads'
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
    let countAdd = 0
    let countAddPrint = 0
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
            let result = null
            countAdd += 1
            if (section && section === 'EDITORIAL') {
              if (countAdd === 4) {
                countAddPrint += 1
                result = (
                  <Fragment>
                    <EditorialCard
                      key={`Editorial-card-${story._id}`}
                      data={data.attributesRaw}
                    />
                    <Ads
                      adElement={`movil${countAddPrint}`}
                      isDesktop={false}
                      isMobile={true}
                      columns=""
                      rows=""
                      freeHtml=""
                    />
                  </Fragment>
                )
                countAdd = 0
              } else {
                result = (
                  <EditorialCard
                    key={`Editorial-card-${story._id}`}
                    data={data.attributesRaw}
                  />
                )
              }
            } else {
              // eslint-disable-next-line no-lonely-if
              if (countAdd === 4) {
                countAddPrint += 1
                result = (
                  <Fragment>
                    <AuthorCard
                      {...{
                        key: `Author-card-${story._id}`,
                        data: data.attributesRaw,
                        deployment,
                        contextPath,
                        arcSite,
                      }}
                    />
                    <Ads
                      adElement={`movil${countAddPrint}`}
                      isDesktop={false}
                      isMobile={true}
                      columns=""
                      rows=""
                      freeHtml=""
                    />
                  </Fragment>
                )
                countAdd = 0
              } else {
                result = (
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
              }
            }
            return result
          })}
        </div>
        <Ads
          adElement="middle1"
          isDesktop={true}
          isMobile={false}
          columns=""
          rows=""
          freeHtml=""
        />

        <div role="list" className={classes.list}>
          <div className={classes.titleBox}>
            <p className={classes.title}>ÚLTIMAS NOTICIAS</p>
          </div>
          {stories.slice(12).map((story, index) => {
            data.__data = story
            return index !== 3 ? (
              <ListItem
                {...{
                  key: `List-item-${story._id}`,
                  data: data.attributesRaw,
                  deployment,
                  contextPath,
                  arcSite,
                }}
              />
            ) : (
              <Fragment>
                <ListItem
                  {...{
                    key: `List-item-${story._id}`,
                    data: data.attributesRaw,
                    deployment,
                    contextPath,
                    arcSite,
                  }}
                />
                <Ads
                  adElement="movil5"
                  isDesktop={false}
                  isMobile={true}
                  columns=""
                  rows=""
                  freeHtml=""
                />
              </Fragment>
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
