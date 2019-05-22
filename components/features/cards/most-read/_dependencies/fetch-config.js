export default (globalContentConfig, globalContent, storiesQty) => {
  const { query: { section = '' } = {} } = globalContentConfig || {}
  const { taxonomy: { primary_section: { _id = '' } = {} } = {} } =
    globalContent || {}

  let sec = _id || section

  if (sec === 'todas') sec = ''
  else if (sec !== '') {
    sec = sec.charAt(0) === '/' ? sec : `/${sec}`
  }

  return {
    source: 'story-feed-by-views',
    params: {
      section: sec,
      size: storiesQty,
    },
  }
}
