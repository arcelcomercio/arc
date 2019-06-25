import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import ArcArticleBody from '@arc-core-components/feature_article-body'
import PropTypes from 'prop-types'
import ENV from 'fusion:environment'

import StoryTable from '../../../global-components/story-table'

const infoPages = {
  termsAndConditions: 'Términos y condiciones de uso',
  guidingPrinciples: 'Principios Rectores',
  privacyPolicies: 'Política de privacidad',
  integratedManagementPolicy: 'Politica Integrada de Gestión',
  arcoProcedure: 'Derechos ARCO',
  cookiesPolicy: 'Políticas de cookies',
  aboutUs: 'Quienes Somos',
}
const defaultPolicy = 'termsAndConditions'

const classes = {
  staticPolicy: 'info-pages b g-tertiarysecondary-font text-sm line-h-md',
  title: 'info-pages__title font-bold uppercase mb-25 title-md',
}

@Consumer
class InfoPages extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      contentElements: [],
      headlines: '',
    }
  }

  componentDidMount() {
    this.getPolicyContent()
  }

  getPolicyContent() {
    const {
      siteProperties: { infoPagesDev = {}, infoPagesProd = {} } = {},
      customFields: { typeOfPolicy } = {},
      arcSite,
    } = this.props || {}

    const infoPagesEnv =
      ENV.ENVIRONMENT === 'elcomercio' ? infoPagesProd : infoPagesDev
    const infoPageId = typeOfPolicy
      ? infoPagesEnv[typeOfPolicy]
      : infoPagesEnv[defaultPolicy]

    const contentSource = 'story-by-id'
    const params = {
      _id: infoPageId,
      published: 1,
    }

    const { fetched } = this.getContent(contentSource, params)
    fetched
      .then(res => {
        this.setState({
          contentElements: res.content_elements,
          headlines: res.headlines.basic,
        })
      })
      .catch(e => {
        const errorMessage = `No existe el contenido "${
          typeOfPolicy ? infoPages[typeOfPolicy] : infoPages[defaultPolicy]
        }" para "${arcSite}"`
        this.setState({ headlines: errorMessage })
        // eslint-disable-next-line no-console
        console.error(e)
      })
  }

  render() {
    const { contentElements, headlines } = this.state
    return (
      <div className={classes.staticPolicy}>
        <h1 className={classes.title}>{headlines}</h1>
        <ArcArticleBody
          data={contentElements}
          renderElement={element => {
            const { type } = element
            if (type === 'table') {
              return <StoryTable data={element} type={type} />
            }
            return ''
          }}
        />
      </div>
    )
  }
}

InfoPages.propTypes = {
  customFields: PropTypes.shape({
    typeOfPolicy: PropTypes.oneOf(Object.keys(infoPages)).tag({
      name: 'Página',
      labels: infoPages,
      defaultValue: defaultPolicy,
      description:
        'Este campo usa notas no publicadas de elipsis declaradas en el "site properties"',
    }),
    /* storyId: PropTypes.string.tag({
      name: 'ID de historia no publicada',
      group: 'Editar fuente de contenido',
      description:
        'En este campo se debe colocar el ID de una historia no publicada de elpsis',
    }), */
  }),
}

InfoPages.label = 'Páginas estáticas'

export default InfoPages
