import { useAppContext } from 'fusion:context'
import { Story } from 'types/story'

import { SITE_DEPOR } from '../../utilities/constants/sitenames'
import { dateDayAndMouthNOYEAR } from '../../utilities/date-time/dates'

export const getMetaValue = (key: string): string | undefined => {
  const { metaValue } = useAppContext()
  const value = metaValue(key)
  return value && !/content/.test(value) ? value : undefined
}

export const getLang = (): string => {
  const { requestUri, arcSite } = useAppContext()
  let lang = 'es'

  if (arcSite === SITE_DEPOR) {
    if (requestUri.match('^/usa')) {
      lang = 'es-us'
    } else if (/^\/mexico/.test(requestUri)) {
      lang = 'es-mx'
    } else if (/^\/colombia/.test(requestUri)) {
      lang = 'es-co'
    }
  }

  return lang
}

export const getIframeStory = (): boolean => {
  const { requestUri } = useAppContext()
  return requestUri.includes('/carga-continua')
}

export const getIsStory = (): boolean => {
  const { requestUri } = useAppContext()
  return (
    getMetaValue('id') === 'meta_story' ||
    /^\/preview\/([A-Z0-9]{26})\/?/.test(requestUri)
  )
}

export const getSectionPath = (): string => {
  const { requestUri } = useAppContext()
  const path = requestUri.replace('/carga-continua', '').split('?')[0]
  const sectionList = path.split('/').slice(1)
  return sectionList[0]
}

export const skipAdvertising = (data: { slug: string }[] = []): boolean =>
  data.some(({ slug }) => slug === 'noads')

type GetKeywordsProps = { siteName: string }

export const getKeywords = ({ siteName }: GetKeywordsProps): string =>
  getMetaValue('keywords') ||
  `Noticias, ${siteName}, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión`

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
  const { requestUri } = useAppContext()
  const isStory = getIsStory()

  const metaId = getMetaValue('id')
  const seoTitle = getMetaValue('title')
  const siteTitleSuffix = siteTitle?.toUpperCase()
  let title = `${seoTitle} | ${siteTitleSuffix}`

  if (isStory) {
    // title = `${seoTitle}: ${
    //   storyTitleRe ? storyTitleRe.substring(0, 70) : ''
    // } | ${siteTitleSuffix}`
    const urlTitle = requestUri.split('/')
    const sectionName = urlTitle[1] && urlTitle[1].toUpperCase()
    const siteTitleSuffixR = siteTitleSuffix?.replace('NOTICIAS ', '')
    title = `${storyTitleRe} | ${sectionName} | ${siteTitleSuffixR}`
  } else if (
    pageNumber > 1 &&
    (metaId === 'meta_tag' || metaId === 'meta_author')
    /*  || metaId === "meta_search" */
  ) {
    title = `${seoTitle} | Página ${pageNumber} | ${siteTitleSuffix}`
  } else if (metaId === 'meta_archive') {
    const hasDate = /\d{4}-\d{2}-\d{2}/.test(requestUri)
    const hasSection =
      /\/archivo\/([\w\d-]+)/.test(requestUri) &&
      !/\/archivo\/todas/.test(requestUri)
    if (!hasDate && !hasSection) {
      title = `Archivo de Noticias | ${siteTitleSuffix}`
    }
  } else if (metaId === 'meta_tag' && /\/noticias\//.test(requestUri)) {
    title = `${seoTitle} hoy ${dateDayAndMouthNOYEAR()} | ${siteTitleSuffix}`
  }
  return title
}

type GetDescriptionProps = {
  siteName: string
  pageNumber: number
  isStory: boolean
}

export const getDescription = ({
  siteName,
  pageNumber,
  isStory,
}: GetDescriptionProps): string => {
  const { requestUri, globalContent } = useAppContext<Story>()
  let description = `Últimas noticias, fotos, y videos de Perú y el mundo en ${siteName}.`
  const metaDescription = getMetaValue('description')

  if (metaDescription) {
    description = `${metaDescription}`
    const metaId = getMetaValue('id')
    if (
      (pageNumber > 1 && metaId === 'meta_tag') ||
      metaId === 'meta_author'
      /*  || metaId === "meta_search" */
    ) {
      description = `${metaDescription} Página ${pageNumber}.`
    } else if (metaId === 'meta_archive') {
      const hasDate = /\d{4}-\d{2}-\d{2}/.test(requestUri)
      const hasSection =
        /\/archivo\/([\w\d-]+)/.test(requestUri) &&
        !/\/archivo\/todas/.test(requestUri)
      if (!hasDate && !hasSection) {
        description = `Archivo de noticias de ${siteName}. Noticias actualizadas del Perú y el Mundo con fotos, videos y galerías sobre actualidad, deportes, economía y otros.`
      }
    }
  }
  if (isStory) {
    description = globalContent?.description?.basic || metaDescription || ''
  }

  return description
}
