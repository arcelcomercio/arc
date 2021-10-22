import { ANSBase, ANSDates, Owner } from 'types/ans'
import type { ArcSite } from 'types/fusion'
import type { ResizedUrls } from 'types/resizer'
import type { AnyObject } from 'types/utils'

export type StoryType = 'story' | 'video' | 'gallery' | 'redirect'
export type ContentElementType =
  | 'image'
  | 'video'
  | 'gallery'
  | 'table'
  | 'quote'
  | 'custom_embed'
  | 'oembed_response'
  | 'story'
  | 'raw_html'
  | 'infografia'
  | 'text'
  | 'list'
  | 'header'
  | 'blockquote'
  | 'Articulo Nota Simple'
  | 'youtube_id'
  | 'path_mp3'
  | 'interstitial_link'
  | 'link_list'
  | 'correction'
export type ContentCode = 'premium' | 'metered' | 'free'
export type Subtype =
  | 'special'
  | 'special_basic'
  | 'gallery_slider'
  | 'gallery_vertical'
  | 'image_big'
  | 'story_correction'
  | 'work_type_revision'
  | 'image_link'
  | 'story_custom_block'
  | 'stamp_trust'
  | 'minuto_minuto'
  | 'video_jwplayer'
  | 'video_jwplayer_matching'
  | 'parallax'
export type PromoItemType = keyof PromoItems

interface ContentElementAdditionalProperties {
  comments: any[]
  inline_comments: any[]
  _id: number
}

export interface TypeListItems {
  content: string
  type: string
  url: string
  image: {
    url: string
    version: string
  }
}
export interface ContentElement {
  _id: string
  type: ContentElementType
  additional_properties?: ContentElementAdditionalProperties
  content: string
  embed?: Embed
  subtype?: string
  items?: TypeListItems[]
}
export interface Headlines {
  basic: string
  mobile: string
  native: string
  print: string
  tablet: string
  web: string
  meta_title: string
}

export interface ContentRestrictions {
  content_code: ContentCode
}
interface Workflow {
  status_code: number
  note?: string
}
interface Source {
  system: string
  name: string
  source_type: string
}
export interface LabelElement {
  url: string
  text: string
  display: boolean
}
export interface Label {
  contenido: LabelElement
  facebook_ia: LabelElement
  formato: LabelElement
  genero: LabelElement
  nucleo: LabelElement
  trustproject: LabelElement
}
export interface Tag {
  text: string
  description: string
  slug: string
}
interface SectionAdditionalProperties {
  original: {
    _id: string
    name: string
    parent: {
      default: string
    }
    inactive: boolean
    order: {
      default: number
    }
    _website: ArcSite
    node_type: string
    ancestors: {
      default: string[]
    }
  }
}
export interface Section extends ANSBase {
  _website: ArcSite
  type: string
  name: string
  path: string
  parent_id: string
  parent: {
    default: string
  }
  additional_properties: SectionAdditionalProperties
  _website_section_id: string
}
export interface Taxonomy {
  tags?: Tag[]
  sections?: Section[]
  seo_keywords?: string[]
}
interface Reference {
  type: 'reference'
  referent: {
    id: string
    type?: string
    website?: ArcSite
  }
}
export interface RelatedContent {
  basic: any[]
  redirect: any[]
  clonedFromParent: Reference[]
  clonedChildren: any[]
}
interface Distributor {
  name: string
  category: string
  subcategory: string
}
interface Planning {
  scheduling: {
    will_have_image: boolean
  }
  internal_note: string
  story_length: {
    word_count_actual: number
    character_count_actual: number
    character_encoding: string
    line_count_actual: number
    inch_count_actual: number
  }
  budget_line: string
}
export interface SocialLink {
  site: string
  url: string
}
export interface AuthorAdditionalProperties {
  original: {
    _id: string
    status: boolean
    byline: string
    firstName: string
    bio_page: string
    lastName: string
    affiliations: string
    email: string
    books: any[]
    podcasts: any[]
    education: any[]
    awards: any[]
    last_updated_date: string
    image: string
    longBio: string
    slug: string
    bio: string
    personal_website: string
    twitter: string
    location: string
    role: string
  }
}
export interface Author extends ANSBase {
  type: string
  name: string
  org: string
  image: {
    url: string
    version: string
  }
  description: string
  url: string
  slug: string
  social_links: SocialLink[]
  additional_properties: AuthorAdditionalProperties
}
interface Affiliation {
  name: string
}
export interface Credits {
  by: Author[]
  affiliation: Affiliation
}

export type Websites = {
  [key in ArcSite]?: {
    website_section: Section
    website_url: string
  }
}
interface AdditionalProperties {
  clipboard: AnyObject
  has_published_copy: boolean
  is_published: boolean
  publish_date: string
}

interface EmbedConfigData {
  description?: string
  name?: string
  text?: string
  title?: string
  url?: string
  image?: {
    caption?: string
    url?: string
  }
  stories: EmbedConfigDataStories[]
}

export interface EmbedConfig {
  date: number
  duration: string
  has_ads: number
  size: string
  description: string
  thumbnail_url: string
  title: string
  updated: number
  account: string
  key: string
  status: string
  resized_urls?: ResizedUrls
  block?: string
  data?: EmbedConfigData
}

export interface Embed {
  id?: string
  config?: EmbedConfig
  url?: string
}

export interface BasicJwplayer {
  subtype: 'video_jwplayer'
  embed: Embed
  type: 'custom_embed'
}

export interface BasicResumen {
  embed: Embed
}
export interface Streams {
  filesize: number
  stream_type: string
  url: string
}
export interface BasicVideo {
  _id: string
  additional_properties: AdditionalProperties
  duration: number
  embed_html: string
  streams: Streams[]
  headlines: Pick<Headlines, 'basic'>
  promo_items: Required<Pick<PromoItems, 'basic'>>
  publish_date: string
  description: string
  type: string
}
interface GalleryContentElementsAdditionalProperties
  extends Pick<
    GalleryAdditionalProperties,
    'owner' | 'published' | 'restricted' | 'version'
  > {
  fullSizeResizeUrl: string
  galleries: any[]
  galleryOrder: number
  ingestionMethod: string
  iptc_source: string
  iptc_title: string
  keywords: string[]
  mime_type: string
  originalName: string
  originalUrl: string
  proxyUrl: string
  ptgVersion: number
  resizeUrl: string
  takenOn: string
}

export interface GalleryContentElement extends ANSBase {
  caption: string
  credits?: Credits
  type: string
  url: string
  licensable: boolean
  owner: Owner
  subtitle: string
  width: number
  additional_properties: GalleryContentElementsAdditionalProperties
  height: number
  image_type?: string
  copyright?: string
  creditIPTC?: string
  status?: string
  created?: string
  created_date?: string
  last_updated_date?: string
  resized_urls: ResizedUrls
}

interface GalleryAdditionalProperties {
  has_published_copy: boolean
  owner: string
  published: boolean
  restricted: boolean
  version: number
  roles: any[]
}
export interface BasicGallery extends ANSBase, ANSDates {
  content_elements: GalleryContentElement[]
  taxonomy: {
    sections: Reference[]
  }
  canonical_url: string
  promo_items: Required<Pick<PromoItems, 'basic'>>
  type: 'gallery'
  canonical_website: ArcSite
  credits: Credits
  headlines: Pick<Headlines, 'basic'>
  description: Pick<Headlines, 'basic'>
  owner: Owner
  additional_properties: GalleryAdditionalProperties
  websites: Websites
  workflow: Workflow
}

export interface Basic {
  width: number
  resized_urls?: ResizedUrls
  url: string
  type: string
  caption: string
  height: number
  subtitle: string
}
interface BasicMp3 {
  content: string
  _id: string
  type: string
}
interface BasicHtml {
  content: string
  _id: string
  type: string
}
interface Infografia {
  content: string
  _id: string
  type: string
}

interface YoutubeId {
  content: string
  _id: string
  type: string
}

export interface PromoItems {
  _id: string
  basic?: Basic
  basic_jwplayer?: BasicJwplayer
  basic_gallery?: BasicGallery
  basic_video?: BasicVideo
  basic_html?: BasicHtml
  youtube_id?: YoutubeId
  basic_resumen?: BasicResumen
  path_mp3?: BasicMp3
  infografia?: Infografia
}

export interface Story extends ANSBase, ANSDates {
  type: StoryType
  content_elements: ContentElement[]
  canonical_url: string
  headlines: Headlines
  owner: Owner
  content_restrictions: ContentRestrictions
  address: AnyObject
  workflow: Workflow
  subheadlines: Pick<Headlines, 'basic'>
  description: Pick<Headlines, 'basic'>
  language: string
  source: Source
  label: Label
  taxonomy: Taxonomy
  related_content: RelatedContent
  promo_items?: PromoItems
  distributor: Distributor
  canonical_website: ArcSite
  geo: AnyObject
  planning: Planning
  credits: Credits
  subtype: Subtype
  websites: Websites
  additional_properties: AdditionalProperties
  website: ArcSite
  website_url: string
  siteName?: string
}

export interface Stories extends ANSBase {
  type: string
  content_elements: Story[]
  additional_properties: AdditionalProperties
  count: number
  next: number
  siteName: string
  tag_name: string
  page_number: number
}

export interface ListDataStories {
  [x: string]: string
  date?: string
  description?: string
  url?: string
  imageUrl?: string
  websiteUrl?: string
  title?: string
  storyType?: string
}
