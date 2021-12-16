import ArcArticleBody from '@arc-core-components/feature_article-body'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { ENVIRONMENT } from 'fusion:environment'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import React from 'react'

import StoryTable from '../../../global-components/story-table'

const infoPages = {
  termsAndConditions: 'Términos y condiciones de uso',
  guidingPrinciples: 'Principios Rectores',
  privacyPolicies: 'Política de privacidad',
  integratedManagementPolicy: 'Politica Integrada de Gestión',
  arcoProcedure: 'Derechos ARCO',
  cookiesPolicy: 'Políticas de cookies',
  aboutUs: 'Quienes Somos',
  frequentQuestions: 'Preguntas frecuentes',
  dataTreatment: 'Tratamiento de Datos',
}
const DEFAULT_POLICY = 'termsAndConditions'
const CONTENT_SOURCE = 'story-by-id'

const classes = {
  staticPolicy: 'info-pages',
  title: 'info-pages__title',
}

const InfoPages = (props) => {
  const { customFields: { typeOfPolicy } = {} } = props
  const { arcSite } = useFusionContext()
  const { infoPagesDev = {}, infoPagesProd = {} } = getProperties(arcSite)

  const getPolicyId = () => {
    const infoPagesEnv =
      ENVIRONMENT === 'elcomercio' ? infoPagesProd : infoPagesDev

    const infoPageId = typeOfPolicy
      ? infoPagesEnv[typeOfPolicy]
      : infoPagesEnv[DEFAULT_POLICY]

    const params = {
      _id: infoPageId,
      published: 'false',
    }

    return params
  }

  const data = useContent({
    source: CONTENT_SOURCE,
    query: { ...getPolicyId() },
    transform: ({
      content_elements: contentElements = [],
      headlines = {},
    } = {}) => {
      const filteredData = {
        contentElements,
        headlines: headlines.basic,
      }
      return { ...filteredData }
    },
  })

  const {
    contentElements = [],
    headlines = 'No existe contenido para la página seleccionada.',
  } = data || {}

  return (
    <div
      className={`${classes.staticPolicy} ${
        typeOfPolicy === 'cookiesPolicy' ? 'info-pages__left' : ''
      }`}>
      <h1 itemProp="name" className={classes.title}>
        {headlines}
      </h1>
      <ArcArticleBody
        data={contentElements}
        renderElement={(element) => {
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

InfoPages.propTypes = {
  customFields: PropTypes.shape({
    typeOfPolicy: PropTypes.oneOf(Object.keys(infoPages)).tag({
      name: 'Página',
      labels: infoPages,
      defaultValue: DEFAULT_POLICY,
      description:
        'Este campo usa notas no publicadas de elipsis declaradas en el "site properties"',
    }),
  }),
}

InfoPages.label = 'Páginas estáticas'
InfoPages.static = true

export default InfoPages
