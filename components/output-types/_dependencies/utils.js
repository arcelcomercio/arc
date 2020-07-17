// eslint-disable-next-line import/prefer-default-export
export const skipAdvertising = (data = []) => {
  return data
    .map(({ slug }) => {
      return slug === 'noads' ? true : ''
    })
    .filter(String)[0]
}

export const getIsStory = ({ metaValue, requestUri }) =>
  metaValue('id') === 'meta_story' ||
  requestUri.match(`^/preview/([A-Z0-9]{26})/?`) ||
  ''

export const getTitle = ({
  metaValue,
  isStory,
  siteTitle,
  storyTitleRe,
  pageNumber,
  requestUri,
}) => {
  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')
  const siteTitleSuffix = siteTitle.toUpperCase()
  let title = `${seoTitle} | ${siteTitleSuffix}`

  if (isStory) {
    title = `${seoTitle}: ${
      storyTitleRe ? storyTitleRe.substring(0, 70) : ''
    } | ${siteTitleSuffix}`
  } else if (
    pageNumber > 1 &&
    (metaValue('id') === 'meta_tag' || metaValue('id') === 'meta_author')
    /*  || metaValue('id') === "meta_search" */
  ) {
    title = `${seoTitle} | Página ${pageNumber} | ${siteTitleSuffix}`
  } else if (metaValue('id') === 'meta_archive') {
    const hasDate = /\d{4}-\d{2}-\d{2}/.test(requestUri)
    const hasSection =
      /\/archivo\/([\w\d-]+)/.test(requestUri) &&
      !/\/archivo\/todas/.test(requestUri)
    if (!hasDate && !hasSection) {
      title = `Archivo de Noticias | ${siteTitleSuffix}`
    }
  }
  return title
}

export const getDescription = ({
  metaValue,
  siteName,
  pageNumber,
  requestUri,
}) => {
  let description = `Últimas noticias, fotos, y videos de Perú y el mundo en ${siteName}.`
  if (metaValue('description') && !metaValue('description').match(/content/)) {
    description = `${metaValue('description')}`
    if (
      (pageNumber > 1 && metaValue('id') === 'meta_tag') ||
      metaValue('id') === 'meta_author'
      /*  || metaValue('id') === "meta_search" */
    ) {
      description = `${metaValue('description')} Página ${pageNumber}.`
    } else if (metaValue('id') === 'meta_archive') {
      const hasDate = /\d{4}-\d{2}-\d{2}/.test(requestUri)
      const hasSection =
        /\/archivo\/([\w\d-]+)/.test(requestUri) &&
        !/\/archivo\/todas/.test(requestUri)
      if (!hasDate && !hasSection) {
        description = `Archivo de noticias de ${siteName}. Noticias actualizadas del Perú y el Mundo con fotos, videos y galerías sobre actualidad, deportes, economía y otros.`
      }
    }
  }
  return description
}

export const getKeywords = ({ metaValue, siteName }) =>
  metaValue('keywords') && !metaValue('keywords').match(/content/)
    ? metaValue('keywords')
    : `Noticias, ${siteName}, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión`
