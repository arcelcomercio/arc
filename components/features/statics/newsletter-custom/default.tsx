import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FC } from 'types/features'

import NewsletterChild from './_children/newsletter'
import customFields from './_dependencies/custom-fields'

interface CustomNewsletterProps {
  customFields?: {
    imageBanner?: string
    image?: string
    description?: string
    urlTos?: string
    urlPrivacyPolicies?: string
    UrlMoreNews?: string
    colorButton?: string
    activateJS?: string
  }
}

const CustomNewsletter: FC<CustomNewsletterProps> = (props) => {
  const { arcSite } = useAppContext()

  const {
    customFields: {
      description = `Te enviaremos lo mejor de ${arcSite}. Escribe tu correo electrónico y dale clic a "Recibir"`,
      urlTos: urlTerms = '/terminos-y-condiciones/',
      urlPrivacyPolicies = '/politica-de-privacidad/',
      UrlMoreNews: urlMoreNews = '',
      colorButton = '#000000',
      activateJS = 'ACTIVADO',
    } = {},
  } = props

  return (
    <NewsletterChild
      arcSite={arcSite}
      urlTerms={urlTerms}
      urlMoreNews={urlMoreNews}
      description={description}
      colorButton={colorButton}
      activateJS={activateJS}
      urlPrivacyPolicies={urlPrivacyPolicies}
    />
  )
}

CustomNewsletter.propTypes = {
  customFields,
}

CustomNewsletter.label = 'Newsletter Custom'

export default CustomNewsletter
