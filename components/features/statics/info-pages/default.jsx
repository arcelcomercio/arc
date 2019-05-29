import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import ArcArticleBody from '@arc-core-components/feature_article-body'
import PropTypes from 'prop-types'

import ArticleTable from '../../../global-components/article-table'

const policiesList = {
  termsAndConditions: 'Términos y condiciones de uso',
  guidingPrinciples: 'Principios Rectores',
  privacyPolicies: 'Política de privacidad',
  policyIntegratedManagement: 'Politica Integrada de Gestión',
  arcoProcedure: 'Derechos ARCO',
  cookiesPolicy: 'Políticas de cookies',
  aboutUs: 'Quienes Somos',
}
const defaultPolicy = 'termsAndConditions'

const classes = {
  staticPolicy: 'info-pages',
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
      siteProperties: { policies = {} } = {},
      customFields: { typeOfPolicy } = {},
      arcSite,
    } = this.props || {}

    const contentSource = 'story-by-id'
    const params = {
      _id: typeOfPolicy ? policies[typeOfPolicy] : policies[defaultPolicy],
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
          typeOfPolicy
            ? policiesList[typeOfPolicy]
            : policiesList[defaultPolicy]
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
        <h1>{headlines}</h1>
        <ArcArticleBody
          data={contentElements}
          renderElement={element => {
            const { type } = element
            if (type === 'table') {
              return <ArticleTable data={element} type={type} />
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
    typeOfPolicy: PropTypes.oneOf(Object.keys(policiesList)).tag({
      name: 'Página',
      labels: policiesList,
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
