import { getAssetsPath } from '../../../../utilities/assets'

export default ({ nav, contextPath = '', arcSite = '', siteDomain }) => {
  const { logoSomos } = nav
  return {
    initParams: () => {
      return {
        logo: `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/${logoSomos}?d=1`,
        link: '/',
        alt: siteDomain,
      }
    },
  }
}
