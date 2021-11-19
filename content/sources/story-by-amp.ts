import toolboxOptimizer from '@ampproject/toolbox-optimizer'
import { ENVIRONMENT } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { ConentSourceBase } from 'types/content-source'
import { Story } from 'types/story'

export type AmpSignerQuery = {
  'arc-site': string
  website_url: string
}

type AmpByIdParams = AmpSignerQuery & ConentSourceBase

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota s',
    type: 'text',
  },
]
const transform = async (
  data: Story,
  { 'arc-site': website }: AmpSignerQuery
): any => {
  if (!website) return data
  const opts = {}
  const originalHtml = data

  const ampOptimize = toolboxOptimizer.create({
    verbose: true,
  })

  const optimizedHtml = await ampOptimize.transformHtml(originalHtml, opts)

  const datas = { optimizedHtml }

  return datas
}

const resolve = ({
  website_url: websiteUrl,
  'arc-site': website,
}: AmpByIdParams): string => {
  const { siteUrl } = getProperties(website)
  const pathUrl =
    ENVIRONMENT === 'elcomercio'
      ? siteUrl
      : `https://elcomercio-${website}-sandbox.cdn.arcpublishing.com`

  const uri = `${pathUrl}${websiteUrl}?outputType=ampnew&_website=${website}`
  console.log('uri', uri)
  return uri
}

export default {
  resolve,
  transform,
  params,
}
