// eslint-disable-next-line import/prefer-default-export
export const getPreroll = ({ section, arcSite, siteDomain, metaValue }) => {
  const getSectionSlug = (sectionId = '') => {
    return sectionId.split('/')[1] || 'default'
  }

  if (arcSite) {
    const arcSiteNew = arcSite === 'peru21g21' ? 'peru21' : arcSite
    const domain =
      arcSite === 'elcomerciomag' ? `mag.${siteDomain}` : siteDomain

    let tipoplantilla = ''
    switch (metaValue('id')) {
      case 'meta_section':
        tipoplantilla = 'sect'
        break
      case 'meta_story':
        tipoplantilla = 'post'
        break
      default:
        tipoplantilla = 'post'
        break
    }

    const sectionSlug = getSectionSlug(section)

    return `https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/${arcSiteNew}/web/${tipoplantilla}/${sectionSlug
      .split('-')
      .join(
        ''
      )}/preroll&description_url=https%3A%2F%2F${domain}%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Dweb%26publisher%3D${arcSiteNew}%26seccion%3D${sectionSlug
      .split('-')
      .join(
        ''
      )}%26tipoplantilla%3D${tipoplantilla}&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=`
  }

  return ''
}
