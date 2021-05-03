import { ConentSourceBase } from 'types/content-source'

export type GetDataFromJsonFileQuery = {
  json_file: string
}

type GetDataFromJsonFileParams = GetDataFromJsonFileQuery & ConentSourceBase

const params = [
  {
    name: 'json_file',
    displayName: 'Url del archivo JSON',
    type: 'text',
  },
]

const resolve = ({
  json_file: jsonFile,
}: GetDataFromJsonFileParams): string | never => {
  if (!jsonFile)
    throw new Error('Esta fuente de contenido requiere la URL del JSON')
  return jsonFile
}

export default {
  resolve,
  params,
}
