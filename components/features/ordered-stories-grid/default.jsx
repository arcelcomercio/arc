import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isIE } from '../../utilities/helpers'

import DataStory from '../../utilities/story-data'
import FeaturedStory from '../../global-components/featured-story'
import Ads from './_children/ads/default'

const ADS = 'publicidad'
const STORY = 'destaque'

const elements = [
  { col: 2, row: 1, type: STORY },
  { col: 1, row: 2, type: ADS },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 2, row: 1, type: STORY },
]

const classes = {
  container: ' grid--content grid--col-3 grid--col-2 grid--col-1 w-full mt-20',
}

@Consumer
class OrderedStoriesGrid extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      gridClass: 'grid',
    }
  }

  componentDidMount() {
    if (isIE()) this.setState({ gridClass: 'ie-flex' })
  }

  renderGrilla() {
    const {
      globalContent,
      deployment,
      contextPath,
      arcSite,
      customFields,
      isAdmin,
    } = this.props
    const { content_elements: contentElements = [] } = globalContent || {}

    const dataStory = new DataStory({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'md',
    })
    let storyNumber = 0

    return elements.map(element => {
      if (element.type === STORY) {
        dataStory.__data = contentElements[storyNumber]
        const params = {
          title: {
            name: dataStory.title,
            url: dataStory.link,
          },
          category: {
            name: dataStory.primarySection,
            url: dataStory.primarySectionLink,
          },
          author: {
            name: dataStory.author,
            url: dataStory.authorLink,
          },
          multimediaLandscapeL: dataStory.multimediaLandscapeL,
          multimediaLandscapeMD: dataStory.multimediaLandscapeMD,
          multimediaPortraitMD: dataStory.multimediaPortraitMD,
          multimediaSquareS: dataStory.multimediaSquareS,
          multimediaLazyDefault: dataStory.multimediaLazyDefault,
          imageSize: 'complete',
          headband: 'normal',
          size: element.col === 1 ? 'oneCol' : 'twoCol',
          hightlightOnMobile: true,
          arcSite,
          multimediaType: dataStory.multimediaType,
          isAdmin,
          multimediaSubtitle: dataStory.multimediaSubtitle,
          multimediaCaption: dataStory.multimediaCaption,
        }
        storyNumber += 1
        return <FeaturedStory key={dataStory.id} {...params} />
      }
      if (element.type === ADS) {
        const { adElement, isDesktop, isMobile, freeHtml } = customFields || {}
        return (
          <Ads
            adElement={adElement}
            isDesktop={isDesktop}
            isMobile={isMobile}
            columns={element.col === 2 ? 'twoCol' : 'oneCol'}
            rows={element.row === 2 ? 'twoRow' : 'oneRow'}
            freeHtml={freeHtml}
          />
        )
      }
      return {}
    })
  }

  render() {
    const { gridClass } = this.state
    return (
      <div className={gridClass.concat(classes.container)}>
        {this.renderGrilla()}
      </div>
    )
  }
}

OrderedStoriesGrid.propTypes = {
  customFields: PropTypes.shape({
    initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la historia:',
      min: 1,
      max: 100,
      step: 1,
      defaultValue: 1,
      description:
        'Indique el número de la historia desde la que quiere empezar a imprimir. La primera historia corresponde al número 1',
    }),
    /**
     *      CustomFields de publicidad
     */
    adElement: PropTypes.string.tag({
      name: 'Identificador de publicidad',
    }),
    isDesktop: PropTypes.bool.tag({
      name: 'Desktop',
      group: 'Dispositivo de publicidad',
    }),
    isMobile: PropTypes.bool.tag({
      name: 'Mobile',
      group: 'Dispositivo de publicidad',
    }),
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
      group: 'Agregar bloque de html para publicidad',
    }),
  }),
}

OrderedStoriesGrid.label = 'Grilla de Historias Ordenadas'

export default OrderedStoriesGrid
