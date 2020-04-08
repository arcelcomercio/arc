import schemaFilter from './schema-filter'
import { getAssetsPath } from '../../../../utilities/assets'

const CONTENT_SOURCE = 'navigation-by-hierarchy'
const DEFAULT_HIERARCHY = 'menu-default'

export default props => ({
  main: () => {
    const { nav, contextPath = '', arcSite = '' } = props
    const { logo } = nav
    return {
      initParams: () => {
        return {
          logo: `${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/${logo}?d=1`,
          logoLeft: {
            src: `${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/otorongo.png?d=1`,
            alt: arcSite,
          },
        }
      },
      fetch: () => {
        const source = CONTENT_SOURCE
        const params = {
          hierarchy: DEFAULT_HIERARCHY,
        }
        return {
          config: {
            source,
            params,
          },
        }
      },
    }
  },
  getSchema: () => {
    return schemaFilter
  },
})
