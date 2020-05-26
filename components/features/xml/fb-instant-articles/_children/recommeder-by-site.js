const RecommederBySite = ({ data = {}, arcSite }) => {
  const process = (contentElements, website, siteUrl) => {
    const stories = contentElements.map(story => {
      // storyData._data = story

      const { websites = {} } = story || {}
      const site = websites[website] || {}
      const websiteUrl = site.website_url || ''

      // const { title, websiteLink } = storyData

      const brandWeb = websites[arcSite] || {}
      // return brandWeb.website_url || ''
      const { website_url: websiteLink = '' } = brandWeb

      /* return {
        // title,
        websiteLink: `${siteUrl}${websiteUrl ||
          websiteLink}${`?ref=recomendados&source=${arcSite}`}`,
      } */
      const link = websiteUrl || websiteLink
      return `${siteUrl}${link}${`?ref=recomendados&source=${arcSite}`}`
    })
    return stories
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
  console.log('++++++++++++++++++++++++++++')
  console.log(arcSite)
  console.log('++++++++++++++++++++++++++++')
  console.log(data)
  console.log('++++++++++++++++++++++++++++')
  console.log(dataProcess)
  console.log('++++++++++++++++++++++++++++')

  return `<ul class="op-related-articles" title="${title || 'NO TE PIERDAS'}">
  ${dataProcess.map(url => `<li><a href="${url}"></a></li>`)}
  </ul>`
}

export default RecommederBySite
