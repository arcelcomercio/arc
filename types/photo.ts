import { AdditionalPropertiesBase, ANSBase, ANSDates, Owner } from 'types/ans'
import { AnyObject } from 'types/utils'

import { ResizedUrls } from '../components/utilities/resizer/format-presets'

interface PhotoAdditionalProperties extends AdditionalPropertiesBase {
  fullSizeResizeUrl: string
  galleries: any[]
  ingestionMethod: string
  mime_type: string
  originalName: string
  originalUrl: string
  proxyUrl: string
  resizeUrl: string
  thumbnailResizeUrl: string
  template_id: number
}

export interface Photo
  extends ANSBase,
    Pick<ANSDates, 'created_date' | 'last_updated_date'> {
  additional_properties: PhotoAdditionalProperties
  address: AnyObject
  credits: {
    affiliation: any[]
  }
  height: number
  image_type: string
  licensable: boolean
  owner: Owner
  source: {
    additional_properties: {
      editor: string
    }
    edit_url: string
    system: string
  }
  status: string
  subtitle: string
  taxonomy: {
    associated_tasks: any[]
  }
  type: string
  url: string
  width: number
  syndication: {
    search: boolean
    external_distribution: boolean
  }
  resized_urls?: ResizedUrls
}

export interface Gallery extends ANSBase {
  type: string
  content_elements: Photo[]
}
