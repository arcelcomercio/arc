import React from 'react'
import ENV from 'fusion:environment'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import ArcArticleBody from '@arc-core-components/feature_article-body'
import PropTypes from 'prop-types'

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
}
const DEFAULT_POLICY = 'termsAndConditions'
const CONTENT_SOURCE = 'story-by-id'

const classes = {
  staticPolicy:
    'info-pages bg-white secondary-font text-md line-h-lg p-20 lg:p-40',
  title:
    'info-pages__title font-bold uppercase mb-25 title-md line-h-sm primary-font border-b-1 border-solid border-base pb-20',
}

const InfoPages = props => {
  const { customFields: { typeOfPolicy } = {} } = props
  const { arcSite } = useFusionContext()
  const { infoPagesDev = {}, infoPagesProd = {} } = getProperties(arcSite)

  const getPolicyId = () => {
    const infoPagesEnv =
      ENV.ENVIRONMENT === 'elcomercio' ? infoPagesProd : infoPagesDev

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
