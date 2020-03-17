import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
]

const pattern = ({ 'arc-site': website, section }) => {
  const { siteUrl } = getProperties(website)
  throw new RedirectError(`${siteUrl}${section}/`, 301)
}

const resolve = key => pattern(key)

const source = {
  resolve,
  params,
  ttl: 600,
}

export default source
