export default props => {
  const { arcSite, numNotes, requestUri } = props
  return {
    source: 'stories__most-readed',
    params: {
      website: arcSite,
      section: `/${requestUri.split('?')[0].split('/')[1]}`,
      num_notes: numNotes,
    },
  }
}
