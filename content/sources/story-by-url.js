import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStories } from '../../components/utilities/resizer'

const schemaName = 'story'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
  {
    name: 'published',
    displayName: 'Esta Nota esta publica? (Defecto es true)',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

const transformImg = ({ contentElements, website, presets }) => {
  const { resizerUrl } = getProperties(website)
  return addResizedUrlsToStories({
    contentElements,
    resizerUrl,
    resizerSecret,
    presets,
  })
}

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')

  const website = key['arc-site'] || 'Arc Site no está definido'
  const { website_url: websiteUrl, published = '' } = key
  const isPublished = published === 'false' ? 'false' : 'true'

  const sourceInclude = `&included_fields=type,created_date,revision,last_updated_date,canonical_url,headlines,owner,content_restrictions,subheadlines,taxonomy,promo_items,display_date,credits,first_publish_date,websites,publish_date,website,website_url,redirect_url`

  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${website}&published=${isPublished}${sourceInclude}`
  return requestUri
}

const transform = (data, { 'arc-site': website, presets: customPresets }) => {
  if (data.type === 'redirect') return data

  const { promo_items: { basic_gallery: basicGallery } = {} } = data

  const presets =
    customPresets === 'no-presets'
      ? ''
      : customPresets ||
        'landscape_xl:980x528,landscape_l:648x374,landscape_md:314x157,landscape_s:234x161,landscape_xs:118x72,portrait_xl:528x900,portrait_l:374x648,portrait_md:314x374,portrait_s:161x220,portrait_xs:75x90,square_xl:900x900,square_l:600x600,square_md:300x300,square_s:150x150,square_xs:75x75,small:100x200,large:940x569,story_small:482x290,amp_new:1200x800,amp:900x600'

  let dataStory = data || {}

  if (basicGallery && basicGallery.promo_items) {
    const { content_elements: galleryContentElements } = basicGallery || {}
    if (!galleryContentElements)
      dataStory.promo_items.basic_gallery.content_elements = []
  }

  /**
   * Si, por ahora siempre va a a existir presets por defecto pero
   * se espera que esto cambie en el futuro porque todos los features
   * deberian definir sus propios presets. Cuando eso suceda, esta validacion
   * si tendra completo sentido.
   */
  if (presets) {
    ;[dataStory] = transformImg({
      contentElements: [dataStory],
      website,
      presets, // i.e. 'mobile:314x157'
    })
  }

  return { ...dataStory }
}

export default {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}
