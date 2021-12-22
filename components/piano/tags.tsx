import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { Zones } from 'types/piano'
import { ContentCode } from 'types/story'

import { env } from '../utilities/arc/env'
import { ContentTiers } from '../utilities/constants/content-tiers'
import { PROD } from '../utilities/constants/environment'

interface PianoTagsProps {
  tags?: string[]
  zone?: Zones
  contentTier?: ContentCode
  storyId?: string
  section?: string
  publishDate?: string
  author?: string
  subtype?: string
  paidContent?: boolean
  disabled?: boolean
}

/**
 * Estas propiedades deben estar definidas antes de inicializar piano
 * con `tp.init()`.
 *
 * Para habilitar el **modo depuración**, debes agregar el parámetro `debug=1` a la URL.
 *
 * @param props
 * @param props.tags - Tags del contenido.
 * @param props.zone
 * @param props.contentTier - Nivel de acceso a la historia.
 * @param props.storyId - ID de la historia.
 * @param props.section - Sección de la historia.
 * @param props.publishDate - Fecha de publicación de la historia.
 * @param props.author - Autor de la historia.
 * @param props.paidContent - Indica si la historia es pagada por un tercero o no.
 * @param props.disabled - Deshabilita el componente.
 *
 * @see [Content tracking docs](https://docs.piano.io/content-tracking/)
 * @see [DMP document parsing docs](https://docs.piano.io/dmp-document-parsing/)
 */
const PianoTags: React.FC<PianoTagsProps> = ({
  tags = [],
  zone = 'web',
  contentTier = ContentTiers.Free,
  storyId = '',
  section,
  publishDate,
  author,
  subtype,
  paidContent = false,
  disabled = false,
}) => {
  if (disabled) return null

  const enableGA = `tp.push(["init", function () { tp.enableGACrossDomainLinking(); }]);`
  const setPianoIdProvider = `tp.push(["setUsePianoIdUserProvider", true ]);`
  const setZone = `tp.push(["setZone", "${zone}"]);`
  const setSandbox = env !== PROD ? 'tp.push(["setSandbox", true]);' : ''

  const { requestUri } = useAppContext()
  const isDebug = /debug=1/.test(requestUri)
  const setDebug = isDebug ? 'tp.push(["setDebug", true]);' : ''

  // Los `pianoBaseTags` se usan en todas la páginas
  const pianoBaseTags = `
  tp = window.tp || [];
  ${enableGA}${setPianoIdProvider}${setZone}${setSandbox}${setDebug}
  `

  const tagsArray = storyId
    ? [...tags, contentTier, subtype, section].filter(Boolean)
    : []
  const setTags =
    tagsArray.length > 0
      ? `tp.push(["setTags", [${tagsArray
          .map((tag) => `"${tag?.toLowerCase()}"`)
          .join(',')}]]);`
      : ''

  const setSection = section
    ? `tp.push(["setContentSection", "${section.toLowerCase()}"]);`
    : ''
  const setPublishDate = publishDate
    ? `tp.push(["setContentCreated", "${publishDate}"]);`
    : ''
  const setAuthor = author ? `tp.push(["setContentAuthor", "${author}"]);` : ''
  const setNativeContent = storyId
    ? `tp.push(["setContentIsNative", ${paidContent ? 'true' : 'false'}]);`
    : ''

  // `pianoStoryTags` sólo se deben usar en noticias
  const pianoStoryTags = `${setTags}${setSection}${setPublishDate}${setAuthor}${setNativeContent}`

  // custom variables tp.push(["setCustomVariable", "userState", "Subscriber"]);
  // custom params 1 tp.push(["setCustomParam", "name", "value", "scope"]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: pianoBaseTags + pianoStoryTags }}
      />
      <meta
        name="cXenseParse:pageclass"
        content={storyId ? 'article' : 'frontpage'}
      />
      {storyId ? <meta name="cXenseParse:articleid" content={storyId} /> : null}
    </>
  )
}

export default PianoTags
