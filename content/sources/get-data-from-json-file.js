const params = [
  {
    name: 'json_file',
    displayName: 'Url del archivo JSON',
    type: 'text',
  },
]

const resolve = ({ json_file: jsonFile }) => {
  if (!jsonFile)
    throw new Error('Esta fuente de contenido requiere la URL del JSON')
  return jsonFile
}

export default {
  resolve,
  params,
}
