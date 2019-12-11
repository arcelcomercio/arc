import xmlbuilder from 'xmlbuilder'

/**
 * @description Para que este output-type funcione correctamente debe usarse
 * junto al layout "xml". Los features deben tener la extensión ".js" en lugar
 * de ".jsx" y deben devolver un objeto plano, este objeto definirá la
 * estructura resultante del XML.
 * Detalles sobre estructura de objeto:
 * https://github.com/oozcitak/xmlbuilder-js/wiki/Conversion-From-Object
 */

const newsletterLegacy = ({ children }) => {
  // Only return the data from the first child.
  return xmlbuilder
    .create(
      children[0] || 'root',
      { version: '1.0', encoding: 'UTF-8' },
      {
        separateArrayItems: true,
      }
    )
    .end({
      pretty: true,
    })
}

// XML content type
newsletterLegacy.contentType = 'application/xml'

export default newsletterLegacy
