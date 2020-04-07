import { getAssetsPath } from '../../../../utilities/assets'

export default ({
  deployment,
  nav,
  contextPath = '',
  arcSite = '',
  siteDomain,
}) => {
  const { logoSomos } = nav
  return {
    initParams: () => {
      return {
        logo: deployment(
          `${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/${logoSomos}`
        ),
        link: '/',
        alt: siteDomain,
      }
    },
  }
}
