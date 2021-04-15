import { useAppContext } from 'fusion:context'

import { SITE_DEPOR } from '../../utilities/constants/sitenames'

export const getLang = (): string => {
  const { requestUri, arcSite } = useAppContext()
  let lang = 'es'

  if (arcSite === SITE_DEPOR) {
    if (requestUri.match('^/usa')) {
      lang = 'es-us'
    } else if (/^\/mexico/.test(requestUri)) {
      lang = 'es-mx'
    }
  }

  return lang
}

export const getIframeStory = (): boolean => {
  const { requestUri } = useAppContext()
  return requestUri.includes('/carga-continua')
}

export const getIsStory = (): boolean => {
  const { requestUri, metaValue } = useAppContext()
  return (
    metaValue('id') === 'meta_story' ||
    /^\/preview\/([A-Z0-9]{26})\/?/.test(requestUri)
  )
}

export const skipAdvertising = (data: { slug: string }[] = []): boolean =>
  data.some(({ slug }) => slug === 'noads')

type GetKeywordsProps = { siteName: string }

export const getKeywords = ({ siteName }: GetKeywordsProps): string => {
  const { metaValue } = useAppContext()
  return metaValue('keywords') && !metaValue('keywords').match(/content/)
    ? metaValue('keywords')
    : `Noticias, ${siteName}, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión`
}

type GetTitleProps = {
  siteTitle: string
  storyTitleRe: string
  pageNumber: number
}

export const getTitle = ({
  siteTitle,
  storyTitleRe,
  pageNumber,
}: GetTitleProps): string => {
  const { requestUri, metaValue } = useAppContext()
  const isStory = getIsStory()

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')
  const siteTitleSuffix = siteTitle.toUpperCase()
  let title = `${seoTitle} | ${siteTitleSuffix}`

  if (isStory) {
    // title = `${seoTitle}: ${
    //   storyTitleRe ? storyTitleRe.substring(0, 70) : ''
    // } | ${siteTitleSuffix}`
    const urlTitle = requestUri.split('/')
    const sectionName = urlTitle[1] && urlTitle[1].toUpperCase()
    const siteTitleSuffixR = siteTitleSuffix.replace('NOTICIAS ', '')
    title = `${storyTitleRe} | ${sectionName} | ${siteTitleSuffixR}`
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

type GetDescriptionProps = {
  siteName: string
  pageNumber: number
}

export const getDescription = ({
  siteName,
  pageNumber,
}: GetDescriptionProps): string => {
  const { requestUri, metaValue } = useAppContext()
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
