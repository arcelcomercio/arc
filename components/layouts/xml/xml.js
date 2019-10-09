/**
 * @description  Según la documentación del ALC,
 * https://elcomercio.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/recipes/creating-non-html-output-types.md?version=2.3
 * Es importante que al usar el output-type "xml" se haga
 * uso de este layout para que el objeto proveniente del
 * feature llegue integro.
 */

const XmlLayout = ({ children }) => {
  // Only return the data from the first child (body)
  return Array.isArray(children) ? children[0] : null
}

XmlLayout.sections = ['body']

export default XmlLayout
