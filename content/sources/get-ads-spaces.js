const resolve = () => {
  return `https://d2dvq461rdwooi.cloudfront.net/output/publicidad/espacios.json`
}

const transform = (data, { 'arc-site': website, space }) => {
  if (!space || !website) return data

  if (!data[website]) return {}

  return data[website].filter(el => Object.keys(el).includes(space))[0] || {}
}

export default {
  resolve,
  transform,
  params: {
    space: 'text',
  },
}
