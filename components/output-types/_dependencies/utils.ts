import { useAppContext } from 'fusion:context'
import { Story } from 'types/story'

import {
  SITE_DEPOR,
  SITE_DIARIOCORREO,
  SITE_ELBOCON,
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_GESTION,
  SITE_OJO,
  SITE_PERU21,
  SITE_TROME,
} from '../../utilities/constants/sitenames'
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

type GetIndigtallProps = {
  CURRENT_ENVIRONMENT: string
}

export const getAppIndigitall = ({
  CURRENT_ENVIRONMENT,
}: GetIndigtallProps): string => {
  const { arcSite } = useAppContext()
  let apiKeyIndigitall = ''

  if (arcSite === SITE_DEPOR && CURRENT_ENVIRONMENT === 'prod') {
    apiKeyIndigitall = '0b44c03c-dbae-4f9f-8128-de5750bb4dc5'
  } else {
    apiKeyIndigitall = '5ff0b626-a41f-4b90-be16-5c6475c9cc05'
  }
  if (arcSite === SITE_DIARIOCORREO && CURRENT_ENVIRONMENT === 'prod') {
    apiKeyIndigitall = '712a1aa5-00ab-412e-8f90-c25c7ce0e6ed'
  } else {
    apiKeyIndigitall = 'd4cf5929-34ce-45f3-b04b-b05ce472222b'
  }
  if (arcSite === SITE_ELBOCON && CURRENT_ENVIRONMENT === 'prod') {
    apiKeyIndigitall = 'fe3d629b-5edd-47e6-bb69-f759d2c20674'
  } else {
    apiKeyIndigitall = '99888cc6-436e-4336-b169-fef8abaf2339'
  }
  if (arcSite === SITE_ELCOMERCIO && CURRENT_ENVIRONMENT === 'prod') {
    apiKeyIndigitall = 'fcd7a137-c984-4394-8015-b5301ca2a9c9'
  } else {
    apiKeyIndigitall = '231e4c67-ca02-435e-ae83-9caae27df94d'
  }
  if (arcSite === SITE_ELCOMERCIOMAG && CURRENT_ENVIRONMENT === 'prod') {
    apiKeyIndigitall = 'e768b29e-be95-4f1c-9d6b-eeb964cc75c7'
  } else {
    apiKeyIndigitall = 'e768b29e-be95-4f1c-9d6b-eeb964cc75c7'
  }
  if (arcSite === SITE_GESTION && CURRENT_ENVIRONMENT === 'prod') {
    apiKeyIndigitall = 'bb3bbfe4-df56-40b1-9863-cf7878646ea9'
  } else {
    apiKeyIndigitall = '9dfb74e8-91b5-40c8-8a50-ab9cb5edbc5a'
  }
  if (arcSite === SITE_OJO && CURRENT_ENVIRONMENT === 'prod') {
    apiKeyIndigitall = '09fa312a-20fb-4197-867b-4c8f325b1c44'
  } else {
    apiKeyIndigitall = '29f0ca92-75ae-47ec-b53b-9264851e97b8'
  }
  if (arcSite === SITE_PERU21 && CURRENT_ENVIRONMENT === 'prod') {
    apiKeyIndigitall = 'eeeb2228-1895-460a-bcdf-77796f23afa8'
  } else {
    apiKeyIndigitall = 'd5d2939e-a645-456b-a226-2f62683c9bc5'
  }
  if (arcSite === SITE_TROME && CURRENT_ENVIRONMENT === 'prod') {
    apiKeyIndigitall = 'd7bb6271-ca1b-4c68-9791-722b5a55c3c4'
  } else {
    apiKeyIndigitall = 'c36b80b9-9016-4a07-8fad-08d015b947a1'
  }

  return apiKeyIndigitall
}
