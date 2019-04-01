export default props => {
  const {
    numNotes,
    globalContentConfig: { query: { section = '' } = '' } = '',
    globalContent: {
      taxonomy: { primary_section: { _id = '' } = '' } = '',
    } = {},
  } = props

  const sec = _id || section

  return {
    source: 'historias-por-vistas',
    params: {
      section: sec,
      size: numNotes || 5,
    },
  }
}
