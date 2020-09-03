import React from 'react'
import { SITE_ELCOMERCIO } from '../../utilities/constants/sitenames'

export default ({ arcSite, siteUrl, siteName }) => {
  const pathPage = 'buenas-practicas'
  const redaccion = '/autor/redaccion-ec/'

  const structuredDataTrust = `{
    "@context": "http://schema.org",
    "@type": "NewsMediaOrganization",    
    "name": "${siteName}",
    "ethicsPolicy": "${siteUrl}/${pathPage}/#politica-etica",
    "masthead": "${siteUrl}/${pathPage}/#equipo-editorial-principal4",
    "missionCoveragePrioritiesPolicy": "${siteUrl}/${pathPage}/#mision",
    "diversityPolicy": "${siteUrl}/${pathPage}/#declaracion-de-diversidad-de-pareceres",
    "correctionsPolicy": "${siteUrl}/${pathPage}/#politica-de-correcciones-y-practicas",
    "verificationFactCheckingPolicy": "${siteUrl}/${pathPage}/#verificacion-estandares-de-corroboracion",
    "unnamedSourcesPolicy": "${siteUrl}/${pathPage}/#fuentes-anonimas",
    "actionableFeedbackPolicy": "${siteUrl}/${pathPage}/#retroalimentacion-factible",
    "ownershipFundingInfo": "${siteUrl}/${pathPage}/#fecha-de-fundacion-y-estructura-de-la-propiedad",
    "diversityStaffingReport": "${siteUrl}/${pathPage}/#informe-de-diversidad-de-empleados",
    "noBylinesPolicy": "${siteUrl}${redaccion}",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Contacto",
        "email": "contacto@elcomercio.pe",
        "url": "${siteUrl}/${pathPage}/#informacion-de-la-sala-de-prensa"
      }
    ]
  }`

  return arcSite === SITE_ELCOMERCIO ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredDataTrust }}
    />
  ) : (
    <></>
  )
}
