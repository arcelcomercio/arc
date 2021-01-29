const resolve = key => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  return `https://d2dvq461rdwooi.cloudfront.net/${website}/output/ads/ads.json`
}

export default {
    resolve,
    params: {
      website: 'text',
    },
  }
  