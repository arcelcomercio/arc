import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import ArcArticleBody from '@arc-core-components/feature_article-body'
import PropTypes from 'prop-types'

import ArticleTable from '../../../global-components/article-table'

const policiesList = {
  termsAndConditions: 'Términos y condiciones de uso',
  guidingPrinciples: 'Principios Rectores de El Comercio',
  privacyPolicies: 'Política de privacidad',
  policyIntegratedManagement: 'Politica Integrada de Gestión',
  arcoProcedure: 'Derechos ARCO',
  cookiesPolicy: 'Políticas de cookies',
  aboutUs: 'Quienes Somos',
}

@Consumer
class Policies extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      contentElements: [],
      contentTitle: '',
    }
    policiesList.arcoProcedure =
      'Procedimiento para garantizar el ejercicio de derechos de acceso, rectificación, cancelación y oposición de datos personales (Derechos ARCO)'
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
      _id: policies[typeOfPolicy],
      published: 1,
    }
    const { fetched } = this.getContent(contentSource, params)
    fetched
      .then(res => {
        this.setState({
          contentElements: res.content_elements,
          contentTitle: policiesList[typeOfPolicy],
        })
      })
      .catch(e => {
        const errorMessage = `No existe el contenido "${
          policiesList[typeOfPolicy]
        }" para "${arcSite}"`
        this.setState({ contentTitle: errorMessage })
        // eslint-disable-next-line no-console
        console.log(e)
      })
  }

  render() {
    const { contentElements, contentTitle } = this.state
    return (
      <div className="statics-policies">
        <h1>{contentTitle}</h1>
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

Policies.propTypes = {
  customFields: PropTypes.shape({
    typeOfPolicy: PropTypes.oneOf([
      'termsAndConditions',
      'guidingPrinciples',
      'privacyPolicies',
      'policyIntegratedManagement',
      'arcoProcedure',
      'cookiesPolicy',
      'aboutUs',
    ]).tag({
      name: 'Tipo de política',
      labels: policiesList,
      defaultValue: 'termsAndConditions',
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

Policies.label = 'Políticas'

export default Policies
