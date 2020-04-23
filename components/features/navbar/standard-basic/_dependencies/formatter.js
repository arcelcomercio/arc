import schemaFilter from './schema-filter'
import { getAssetsPath } from '../../../../utilities/assets'

const CONTENT_SOURCE = 'navigation-by-hierarchy'
const DEFAULT_HIERARCHY = 'menu-default'

export default props => ({
  main: () => {
    const { deployment, nav, contextPath = '', arcSite = '' } = props
    const { logo } = nav
    return {
      initParams: () => {
        return {
          logo: deployment(
            `${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/${logo}`
          ),
          logoLeft: {
            src: deployment(
              `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/otorongo.png`
            ),
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
