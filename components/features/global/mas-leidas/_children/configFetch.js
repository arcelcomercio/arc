export default props => {
  const {
    numNotes,
    globalContentConfig: { query: { section = '' } = '' } = '',
    globalContent: {
      taxonomy: { primary_section: { _id = '' } = '' } = '',
    } = {},
  } = props

  let sec = _id || section

  if (sec === 'todas') sec = ''
  else {
    sec = sec.charAt(0) === '/' ? sec : `/${sec}`
  }

  return {
    source: 'stories__most-readed',
    params: {
      section: sec,
      num_notes: numNotes || 5,
    },
  }
}
