// TODO: reemplazar por otro content source by section con website. Esto fue temporal

const resolve = (): string =>
  '/content/v4/search/published?q=canonical_website:elcomerciomag+AND+publish_date:%7Bnow-7d%20TO%20*%7D+AND+type:story&sort=publish_date:desc&from=0&size=25&website=elcomerciomag'

export default {
  resolve,
  ttl: 300,
}
