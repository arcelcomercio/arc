import {
  SITE_ELCOMERCIOMAG,
  SITE_ELCOMERCIO,
} from '../../../../utilities/constants/sitenames'

const RecommederBySite = ({ data = {}, arcSite }) => {
  if (arcSite !== SITE_ELCOMERCIO && arcSite !== SITE_ELCOMERCIOMAG) return ''

  const process = (contentElements, website, siteUrl) => {
    const stories = contentElements.map(story => {
      const { websites = {} } = story || {}
      const site = websites[website] || {}
      const websiteUrl = site.website_url || ''
      const brandWeb = websites[arcSite] || {}
      const { website_url: websiteLink = '' } = brandWeb
      const link = websiteUrl || websiteLink
      return `${siteUrl}${link}${`?ref=recomendados&source=${arcSite}`}`
    })
    return stories || []
  }

  const {
    dataOne = [],
    dataTwo = [],
    websiteOne = '',
    websiteTwo = '',
    siteUrlOne = '',
    siteUrlTwo = '',
    title = '',
  } = data

  const dataProcessOne = process(dataOne, websiteOne, siteUrlOne)
  const dataProcessTwo = process(dataTwo, websiteTwo, siteUrlTwo)
  const dataProcess = [...dataProcessOne, ...dataProcessTwo]

  return `<ul class="op-related-articles" title="${title || 'NO TE PIERDAS'}">
  ${dataProcess.slice(0, 3).map(url => `<li><a href="${url}"></a></li>`)}
  </ul>`
}

export default RecommederBySite
