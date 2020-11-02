import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'
import {
  arrayDays,
  arrayMonths,
} from '../../components/utilities/date-time/constants'
import { removeLastSlash } from '../../components/utilities/parse/strings'
import { loadDateFromYYYYMMDD } from '../../components/utilities/date-time/dates'

const schemaName = 'section'

const params = [
  {
    name: '_id',
    displayName: 'ID de la sección',
    type: 'text',
  },
  {
    name: 'date',
    displayName: 'fecha',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { _id: auxId, date } = key

  const { archiveLimit: stringLimit } = getProperties(website)
  let dateLimit = loadDateFromYYYYMMDD(stringLimit)

  if (!dateLimit) dateLimit = new Date('2009')

  if (new Date(date) <= dateLimit) throw new RedirectError(`/410`, 410)

  const id = !auxId || auxId === '/todas' ? '/' : auxId
  const clearSlug = removeLastSlash(id)

  return `/site/v3/website/${website}/section${!id ? '' : `?_id=${clearSlug}`}`
}

const splitSections = sections =>
  sections
    .slice(1)
    .split('/')
    .map(
      section =>
        ` ${section
          .charAt(0)
          .toUpperCase()
          .concat(section.slice(1))
          .replace(/-/, ' ')}`
    )
    .toString()

const transform = (data, key) => {
  // Destructuración del key para prevenir que no devuelva null
  const { _id: id, date: auxDate = '' } = key
  const sections =
    !id || id === '/' || id === '/todas' ? 'Todas' : splitSections(id)
  // const { name: sectionName = 'Todas' } = data || {}

  const date = auxDate === null ? '' : auxDate

  const formatDate = date ? new Date(date) : ''

  return {
    ...data,
    params: {
      section_name: sections, // sectionName,
      // sections,
      date,
    },
    archiveParams: {
      // eslint-disable-next-line no-nested-ternary
      date: date
        ? `ARCHIVO DE ${sections.toString().toUpperCase()}, ${arrayDays[
            formatDate.getUTCDay()
          ].toUpperCase()} ${formatDate.getUTCDate()} DE ${arrayMonths[
            formatDate.getUTCMonth()
          ].toUpperCase()} DEL ${formatDate.getUTCFullYear()}`
        : sections !== 'Todas'
        ? `ARCHIVO DE ${sections.toString().toUpperCase()}, ÚLTIMO MINUTO`
        : 'ÚLTIMO MINUTO',
      date_desc: date ? `, ${date}` : '',
    },
  }
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}
