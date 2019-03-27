export default props => {
  const {
    numNotes,
    globalContentConfig: { query: { section = '' } = '' } = '',
    globalContent: {
      taxonomy: { primary_section: { _id = '' } = '' } = '',
    } = {},
  } = props

  const sec = _id !== undefined ? _id : section

  return {
    source: 'stories__most-readed',
    params: {
      section: sec,
      num_notes: numNotes || 5,
    },
  }
}
